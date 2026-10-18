import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="h-display mb-6 text-2xl">New listing</h1>
      <ListingForm />
    </div>
  );
}
