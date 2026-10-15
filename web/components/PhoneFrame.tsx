import Image from "next/image";
import { isStoreImage, isSvg } from "@/lib/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

/**
 * A minimal iPhone-style frame around an app screenshot.
 * App Store images already show a device, so they get a plain rounded card instead.
 */
export function PhoneFrame({ src, alt, className = "", sizes = "240px", preload }: Props) {
  const store = isStoreImage(src);
  return (
    <div className={className}>
      <div
        className={`relative aspect-[390/844] overflow-hidden shadow-lift ${
          store ? "rounded-[1.6rem] bg-surface" : "rounded-[2.2rem] border-[6px] border-ink bg-ink"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          unoptimized={isSvg(src)}
          className={`object-cover ${store ? "" : "rounded-[1.8rem]"}`}
        />
      </div>
    </div>
  );
}
