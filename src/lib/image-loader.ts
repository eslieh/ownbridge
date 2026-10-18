// next/image custom loader: resizes Cloudinary and Unsplash URLs at the source.
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    const q = quality ? `q_${quality}` : "q_auto";
    return src.replace("/upload/", `/upload/f_auto,${q},c_limit,w_${width}/`);
  }
  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
