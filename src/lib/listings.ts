import "server-only";
import { db } from "./db";
import type { Prisma } from "@/generated/prisma/client";
import { HouseType, ListingPurpose } from "@/generated/prisma/enums";

export type ListingFilters = {
  q?: string;
  type?: string;
  beds?: string;
  maxPrice?: string;
  purpose?: string;
};

const cardInclude = {
  images: { orderBy: { position: "asc" }, take: 1 },
} satisfies Prisma.ListingInclude;

export type ListingCardData = Prisma.ListingGetPayload<{ include: typeof cardInclude }>;

export async function getPublicListings(filters: ListingFilters = {}) {
  const where: Prisma.ListingWhereInput = { published: true };

  const q = filters.q?.trim();
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { area: { contains: q, mode: "insensitive" } },
      { address: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }
  if (filters.type && filters.type in HouseType) {
    where.houseType = filters.type as HouseType;
  }
  if (filters.purpose && filters.purpose in ListingPurpose) {
    where.purpose = filters.purpose as ListingPurpose;
  }
  const beds = Number(filters.beds);
  if (Number.isFinite(beds) && beds > 0) where.bedrooms = { gte: beds };
  const maxPrice = Number(filters.maxPrice);
  if (Number.isFinite(maxPrice) && maxPrice > 0) where.price = { lte: maxPrice };

  return db.listing.findMany({
    where,
    include: cardInclude,
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 60,
  });
}

export async function getFeaturedListings() {
  const featured = await db.listing.findMany({
    where: { published: true, featured: true },
    include: cardInclude,
    orderBy: { updatedAt: "desc" },
    take: 6,
  });
  if (featured.length > 0) return featured;
  return db.listing.findMany({
    where: { published: true },
    include: cardInclude,
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getPublicListingBySlug(slug: string) {
  return db.listing.findFirst({
    where: { slug, published: true },
    include: { images: { orderBy: { position: "asc" } } },
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 60);
}

export async function uniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title) || "listing";
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await db.listing.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    });
    if (!clash) return slug;
    slug = `${base}-${i}`;
  }
}
