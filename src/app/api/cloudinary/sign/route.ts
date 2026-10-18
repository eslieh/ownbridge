import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { isCloudinaryConfigured, signUpload } from "@/lib/cloudinary";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Add CLOUDINARY_* keys to .env." },
      { status: 503 },
    );
  }
  return NextResponse.json(signUpload());
}
