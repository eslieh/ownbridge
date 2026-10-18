"use client";

import { useTransition } from "react";
import { deleteListing } from "@/app/admin/actions";

export function DeleteListingButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}" and its photos? This cannot be undone.`)) {
          startTransition(() => deleteListing(id));
        }
      }}
      className="btn h-8 bg-danger/10 px-3.5 text-[13px] text-danger hover:bg-danger/15"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
