import Image from "next/image";
import Link from "next/link";

// public/logo.png is cropped from the client's logo.png with the grey background removed.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="OwnBridge International"
        width={800}
        height={290}
        unoptimized
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
