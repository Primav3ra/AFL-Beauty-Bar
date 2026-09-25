import Image from "next/image";
import type { CSSProperties } from "react";
import { figmaImages } from "@/data/images.generated";

export type ImageRef = keyof typeof figmaImages;
export type Rect = { x: number; y: number; w: number; h: number };
/** Output of scripts/lib.mjs imageBox(): node box (relative to the clipping parent) + image rect inside it. */
export type Placement = { box: Rect; img?: Rect; fit?: "cover" | "fill"; opacity?: number; flipY?: boolean };

type Props = {
  /** First 8 chars of the Figma imageRef (see src/data/images.generated.ts). */
  src: ImageRef;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Shorthand for a plain "cover" placement at this box. */
  crop?: Rect;
  /** Exact Figma placement (handles Figma "Crop" transforms). Parent must be `relative overflow-hidden`. */
  place?: Placement;
};

const px = (r: Rect): CSSProperties => ({ left: r.x, top: r.y, width: r.w, height: r.h });

export function FigmaImage({ src, alt = "", className = "", priority, sizes, crop, place }: Props) {
  const img = figmaImages[src];
  const p: Placement | undefined = place ?? (crop ? { box: crop } : undefined);
  if (p) {
    const inner = p.img ?? { x: 0, y: 0, w: p.box.w, h: p.box.h };
    return (
      <span
        className="pointer-events-none absolute overflow-hidden select-none"
        style={{ ...px(p.box), opacity: p.opacity, transform: p.flipY ? "scaleY(-1)" : undefined }}
        aria-hidden={alt ? undefined : true}
      >
        <Image
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          priority={priority}
          sizes={sizes ?? `${Math.round(inner.w)}px`}
          className={`absolute max-w-none ${p.fit === "fill" ? "object-fill" : "object-cover"} ${className}`}
          style={px(inner)}
        />
      </span>
    );
  }
  return (
    <Image src={img.src} alt={alt} width={img.width} height={img.height} priority={priority} sizes={sizes} className={`object-cover ${className}`} />
  );
}
