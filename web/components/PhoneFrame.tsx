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
 * The bezel (padding) and corner radii are percentages of the phone's own width, so the
 * frame looks the same at 100px on a phone as at 240px on desktop, and the screen keeps
 * the screenshots' exact aspect ratio (1206×2622) so nothing gets cropped.
 * App Store images already show a device, so they get a plain rounded card instead.
 */
export function PhoneFrame({ src, alt, className = "", sizes = "240px", preload }: Props) {
  const store = isStoreImage(src);
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      unoptimized={isSvg(src)}
      className="object-cover"
    />
  );

  if (store) {
    return (
      <div className={className}>
        <div className="relative aspect-[780/1688] overflow-hidden rounded-[11%/5%] bg-surface shadow-lift">{image}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="rounded-[16%/7.4%] bg-ink p-[3.5%] shadow-lift">
        <div className="relative aspect-[1206/2622] overflow-hidden rounded-[12.5%/5.75%] bg-ink">{image}</div>
      </div>
    </div>
  );
}
