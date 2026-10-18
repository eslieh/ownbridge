import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function isCloudinaryConfigured() {
  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_PRESET,
  } = process.env;
  return Boolean(
    CLOUDINARY_CLOUD_NAME &&
      CLOUDINARY_API_KEY &&
      CLOUDINARY_API_SECRET &&
      CLOUDINARY_UPLOAD_PRESET &&
      !CLOUDINARY_CLOUD_NAME.startsWith("YOUR_"),
  );
}

/**
 * Signature for a direct browser → Cloudinary upload. The upload preset
 * (configured in the Cloudinary console) controls folder and transformations.
 */
export function signUpload() {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { timestamp, upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET! };
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!,
  );
  return {
    ...params,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  };
}

export async function destroyImages(publicIds: (string | null)[]) {
  const ids = publicIds.filter((id): id is string => Boolean(id));
  if (ids.length === 0 || !isCloudinaryConfigured()) return;
  // Best effort: a failed delete leaves an orphan asset, never blocks the owner.
  await Promise.allSettled(
    ids.map((id) => cloudinary.uploader.destroy(id, { invalidate: true })),
  );
}
