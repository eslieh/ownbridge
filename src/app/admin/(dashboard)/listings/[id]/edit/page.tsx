import { notFound } from "next/navigation";
import { ListingForm } from "@/components/admin/listing-form";
import { db } from "@/lib/db";

export default async function EditListingPage({ params }: PageProps<"/admin/listings/[id]/edit">) {
  const { id } = await params;
  const listing = await db.listing.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="h-display mb-6 text-2xl">Edit listing</h1>
      <ListingForm listing={listing} />
    </div>
  );
}
