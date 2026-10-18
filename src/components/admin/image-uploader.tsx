"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Star, X } from "lucide-react";
import { discardUpload } from "@/app/admin/actions";

export type UploadedImage = {
  url: string;
  publicId: string | null;
  width?: number | null;
  height?: number | null;
};

type Signature = {
  timestamp: number;
  upload_preset: string;
  signature: string;
  apiKey: string;
  cloudName: string;
};

async function uploadToCloudinary(file: File): Promise<UploadedImage> {
  const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
  const sig = (await signRes.json()) as Signature & { error?: string };
  if (!signRes.ok) throw new Error(sig.error ?? "Could not sign upload");

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", sig.apiKey);
  body.append("timestamp", String(sig.timestamp));
  body.append("upload_preset", sig.upload_preset);
  body.append("signature", sig.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? "Upload failed");
  return { url: json.secure_url, publicId: json.public_id, width: json.width, height: json.height };
}

/** Uploads straight from the browser to Cloudinary; submits the list as hidden `images` JSON. */
export function ImageUploader({ initial }: { initial: UploadedImage[] }) {
  const [images, setImages] = useState<UploadedImage[]>(initial);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialIds = useRef(new Set(initial.map((i) => i.publicId)));

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setUploading((n) => n + list.length);
    await Promise.all(
      list.map(async (file) => {
        try {
          if (file.size > 10 * 1024 * 1024) throw new Error(`${file.name} is over 10 MB`);
          const img = await uploadToCloudinary(file);
          setImages((prev) => [...prev, img]);
        } catch (e) {
          setError(e instanceof Error ? e.message : "Upload failed");
        } finally {
          setUploading((n) => n - 1);
        }
      }),
    );
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(index: number) {
    const img = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    // Fresh uploads not yet saved can be deleted right away; saved ones are removed on save.
    if (img.publicId && !initialIds.current.has(img.publicId)) {
      void discardUpload(img.publicId);
    }
  }

  function makeCover(index: number) {
    setImages((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((img, i) => (
          <div key={img.publicId ?? img.url} className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] bg-muted">
            <Image src={img.url} alt="" fill sizes="200px" className="object-cover" />
            {i === 0 && (
              <span className="absolute top-2 left-2 rounded-full bg-ink px-2 py-0.5 text-[11px] font-medium text-white">Cover</span>
            )}
            <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
              {i !== 0 && (
                <button type="button" onClick={() => makeCover(i)} title="Make cover" className="grid size-7 place-items-center rounded-full bg-surface/90 hover:bg-surface">
                  <Star className="size-3.5" />
                </button>
              )}
              <button type="button" onClick={() => remove(i)} title="Remove" className="grid size-7 place-items-center rounded-full bg-surface/90 text-danger hover:bg-surface">
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-[var(--radius-media)] border-2 border-dashed border-line text-[13px] text-ink-2 hover:border-ink-3"
        >
          {uploading > 0 ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
          {uploading > 0 ? `Uploading ${uploading}…` : "Add photos"}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      {uploading > 0 && <input type="hidden" name="__uploading" value="1" />}
    </div>
  );
}
