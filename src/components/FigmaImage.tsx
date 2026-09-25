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
  /** Fill the (positioned) parent with object-cover instead of using a fixed placement; wins over place/crop. */
  cover?: boolean;
  /** object-position for `cover`, e.g. from focalPoint(). */
  position?: string;
};

const px = (r: Rect): CSSProperties => ({ left: r.x, top: r.y, width: r.w, height: r.h });

/**
 * object-position that shows roughly the same part of the image as a fixed Figma placement did in a
 * frameW×frameH window, so the image can be rendered with object-cover at any width.
 */
export function focalPoint(p: Placement, frameW: number, frameH: number) {
  const r = p.img ? { x: p.box.x + p.img.x, y: p.box.y + p.img.y, w: p.img.w, h: p.img.h } : p.box;
  const pct = (off: number, size: number, win: number) =>
    size <= win + 1 ? 50 : Math.round(Math.min(100, Math.max(0, (-off / (size - win)) * 100)));
  return `${pct(r.x, r.w, frameW)}% ${pct(r.y, r.h, frameH)}%`;
}

export function FigmaImage({ src, alt = "", className = "", priority, sizes, crop, place, cover, position }: Props) {
  const img = figmaImages[src];
  if (cover) {
    return (
      <Image
        src={img.src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`pointer-events-none object-cover select-none ${className}`}
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }
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
