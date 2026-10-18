import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteListingButton } from "@/components/admin/delete-listing-button";
import { db } from "@/lib/db";
import { formatPrice, houseTypeLabel, statusLabel } from "@/lib/listing-options";
import { togglePublished } from "../actions";

export default async function AdminListingsPage() {
  const listings = await db.listing.findMany({
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="h-display text-2xl">Listings</h1>
          <p className="text-sm text-ink-2">{listings.length} total</p>
        </div>
        <Link href="/admin/listings/new" className="btn-primary">
          <Plus className="size-4" /> New listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="card p-12 text-center text-ink-2">
          No listings yet. <Link href="/admin/listings/new" className="font-medium text-ink underline">Create the first one</Link>.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-[12px] text-ink-3">
              <tr>
                <th className="px-4 py-3 font-medium">Listing</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Website</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {listings.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {l.images[0] && <Image src={l.images[0].url} alt="" fill sizes="48px" className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium">{l.title}</p>
                        <p className="text-[12px] text-ink-3">{l.area}, {l.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-2">{houseTypeLabel(l.houseType)}</td>
                  <td className="px-4 py-3 text-ink-2">{formatPrice(l.price, l.purpose)}</td>
                  <td className="px-4 py-3 text-ink-2">{statusLabel(l.status)}</td>
                  <td className="px-4 py-3">
                    <form action={togglePublished.bind(null, l.id)}>
                      <button className={`chip h-7 px-3 text-[12px] ${l.published ? "chip-active" : ""}`}>
                        {l.published ? "Published" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/listings/${l.id}/edit`} className="btn-muted h-8 px-3.5 text-[13px]">Edit</Link>
                      <DeleteListingButton id={l.id} title={l.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
