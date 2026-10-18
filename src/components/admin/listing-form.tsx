"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveListing } from "@/app/admin/actions";
import { LocationPicker } from "@/components/map";
import type { Listing, ListingImage } from "@/generated/prisma/client";
import { houseTypeOptions, purposeOptions, statusOptions } from "@/lib/listing-options";
import { ImageUploader } from "./image-uploader";

type Props = { listing?: Listing & { images: ListingImage[] } };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="mb-5 font-display text-[17px] font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function ListingForm({ listing }: Props) {
  const [state, action, pending] = useActionState(saveListing.bind(null, listing?.id ?? null), undefined);
  const [bedrooms, setBedrooms] = useState(listing?.bedrooms ?? 1);

  function onTypeChange(value: string) {
    const preset = houseTypeOptions.find((o) => o.value === value)?.bedrooms;
    if (preset !== undefined) setBedrooms(preset);
  }

  return (
    <form action={action} className="space-y-5">
      <Section title="Photos">
        <ImageUploader
          initial={(listing?.images ?? []).map((i) => ({ url: i.url, publicId: i.publicId, width: i.width, height: i.height }))}
        />
      </Section>

      <Section title="Details">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="label">Title</span>
            <input name="title" required defaultValue={listing?.title} placeholder="Modern 2 Bedroom Apartment" className="input" />
          </label>
          <label>
            <span className="label">Listing for</span>
            <select name="purpose" defaultValue={listing?.purpose ?? "RENT"} className="input">
              {purposeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label>
            <span className="label">House type</span>
            <select name="houseType" defaultValue={listing?.houseType ?? "ONE_BEDROOM"} onChange={(e) => onTypeChange(e.target.value)} className="input">
              {houseTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label>
            <span className="label">Bedrooms</span>
            <input name="bedrooms" type="number" min={0} required value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="input" />
          </label>
          <label>
            <span className="label">Bathrooms</span>
            <input name="bathrooms" type="number" min={0} required defaultValue={listing?.bathrooms ?? 1} className="input" />
          </label>
          <label>
            <span className="label">Price (KES) — monthly rent or sale price</span>
            <input name="price" type="number" min={0} step={500} required defaultValue={listing?.price} className="input" />
          </label>
          <label>
            <span className="label">Size (m²) — optional</span>
            <input name="sizeSqm" type="number" min={0} defaultValue={listing?.sizeSqm ?? ""} className="input" />
          </label>
          <label className="sm:col-span-2">
            <span className="label">Description</span>
            <textarea name="description" required rows={5} defaultValue={listing?.description} className="input h-auto py-3" />
          </label>
          <label className="sm:col-span-2">
            <span className="label">Amenities (comma separated)</span>
            <input name="amenities" defaultValue={listing?.amenities.join(", ")} placeholder="Parking, Borehole, Gym, Lift" className="input" />
          </label>
        </div>
      </Section>

      <Section title="Location">
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <label>
            <span className="label">Area / neighbourhood</span>
            <input name="area" required defaultValue={listing?.area} placeholder="Kilimani" className="input" />
          </label>
          <label>
            <span className="label">Street / building — optional</span>
            <input name="address" defaultValue={listing?.address ?? ""} placeholder="Argwings Kodhek Rd" className="input" />
          </label>
          <label>
            <span className="label">City / town</span>
            <input name="city" required defaultValue={listing?.city ?? "Nairobi"} className="input" />
          </label>
        </div>
        <LocationPicker defaultLat={listing?.latitude} defaultLng={listing?.longitude} />
      </Section>

      <Section title="Visibility">
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="label">Status</span>
            <select name="status" defaultValue={listing?.status ?? "AVAILABLE"} className="input">
              {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2.5 self-end pb-3 text-sm">
            <input type="checkbox" name="published" defaultChecked={listing?.published ?? true} className="size-4 accent-ink" />
            Published on website
          </label>
          <label className="flex items-center gap-2.5 self-end pb-3 text-sm">
            <input type="checkbox" name="featured" defaultChecked={listing?.featured ?? false} className="size-4 accent-ink" />
            Featured on home page
          </label>
        </div>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-3 border-t border-line bg-canvas/95 px-4 py-4 backdrop-blur">
        {state?.error && <p className="mr-auto text-sm text-danger">{state.error}</p>}
        <Link href="/admin" className="btn-muted">Cancel</Link>
        <button disabled={pending} className="btn-primary">
          {pending ? "Saving…" : listing ? "Save changes" : "Create listing"}
        </button>
      </div>
    </form>
  );
}
