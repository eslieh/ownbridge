"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession, requireUser } from "@/lib/auth";
import { destroyImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { uniqueSlug } from "@/lib/listings";
import { HouseType, ListingPurpose, ListingStatus } from "@/generated/prisma/enums";

export type FormState = { error?: string } | undefined;

// ---------- Auth ----------

const loginSchema = z.object({
  email: z.email().transform((e) => e.toLowerCase().trim()),
  password: z.string().min(1),
});

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter your email and password." };

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  const ok = user && (await bcrypt.compare(parsed.data.password, user.passwordHash));
  if (!ok) return { error: "Incorrect email or password." };

  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

// ---------- Listings ----------

const imageSchema = z.object({
  url: z.url(),
  publicId: z.string().nullable(),
  width: z.number().int().nullable().optional(),
  height: z.number().int().nullable().optional(),
});

const listingSchema = z.object({
  title: z.string().trim().min(3, "Title is required"),
  description: z.string().trim().min(10, "Add a short description"),
  purpose: z.enum(ListingPurpose),
  houseType: z.enum(HouseType),
  bedrooms: z.coerce.number().int().min(0).max(50),
  bathrooms: z.coerce.number().int().min(0).max(50),
  price: z.coerce.number().int().min(0, "Price must be a positive number"),
  sizeSqm: z.preprocess((v) => (v === "" ? undefined : v), z.coerce.number().int().positive().optional()),
  area: z.string().trim().min(2, "Area / neighbourhood is required"),
  address: z.string().trim().optional(),
  city: z.string().trim().min(2).default("Nairobi"),
  latitude: z.coerce.number({ error: "Pick the location on the map" }).min(-90).max(90),
  longitude: z.coerce.number({ error: "Pick the location on the map" }).min(-180).max(180),
  amenities: z.string().optional(),
  status: z.enum(ListingStatus),
  published: z.preprocess((v) => v === "on", z.boolean()),
  featured: z.preprocess((v) => v === "on", z.boolean()),
  images: z.preprocess((v) => JSON.parse(String(v || "[]")), z.array(imageSchema)),
});

export async function saveListing(
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();

  const raw = Object.fromEntries(formData);
  if (raw.__uploading) return { error: "Wait for photos to finish uploading." };
  if (raw.latitude === "" || raw.longitude === "") {
    return { error: "Pick the property location on the map (or use your current location)." };
  }
  const parsed = listingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join(" · ") };
  }
  const { images, amenities, ...data } = parsed.data;
  if (images.length === 0) return { error: "Upload at least one photo." };

  const fields = {
    ...data,
    address: data.address || null,
    sizeSqm: data.sizeSqm ?? null,
    amenities: (amenities ?? "")
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean),
  };
  const imageRows = images.map((img, position) => ({
    url: img.url,
    publicId: img.publicId,
    width: img.width ?? null,
    height: img.height ?? null,
    position,
  }));

  let slug: string;
  if (id) {
    const existing = await db.listing.findUnique({ where: { id }, include: { images: true } });
    if (!existing) return { error: "Listing not found." };
    slug = existing.title === data.title ? existing.slug : await uniqueSlug(data.title, id);

    const keep = new Set(images.map((i) => i.publicId ?? i.url));
    const removed = existing.images.filter((i) => !keep.has(i.publicId ?? i.url));

    await db.$transaction([
      db.listingImage.deleteMany({ where: { listingId: id } }),
      db.listing.update({
        where: { id },
        data: { ...fields, slug, images: { create: imageRows } },
      }),
    ]);
    await destroyImages(removed.map((i) => i.publicId));
  } else {
    slug = await uniqueSlug(data.title);
    await db.listing.create({ data: { ...fields, slug, images: { create: imageRows } } });
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deleteListing(id: string) {
  await requireUser();
  const listing = await db.listing.findUnique({ where: { id }, include: { images: true } });
  if (!listing) return;
  await db.listing.delete({ where: { id } });
  await destroyImages(listing.images.map((i) => i.publicId));
  revalidatePath("/", "layout");
}

export async function togglePublished(id: string) {
  await requireUser();
  const listing = await db.listing.findUnique({ where: { id }, select: { published: true } });
  if (!listing) return;
  await db.listing.update({ where: { id }, data: { published: !listing.published } });
  revalidatePath("/", "layout");
}

/** Removes an image the owner uploaded but then discarded before saving. */
export async function discardUpload(publicId: string) {
  await requireUser();
  const inUse = await db.listingImage.findFirst({ where: { publicId }, select: { id: true } });
  if (!inUse) await destroyImages([publicId]);
}
