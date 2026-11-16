import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { Bike } from "@/lib/fleet";
import { bikeLabel } from "@/lib/fleet";

/**
 * A flat kerb-grey stage for a bike. Manufacturer shots on white blend into it
 * through multiply, so every bike sits on the same ground with the same light.
 */
export function BikeStage({
  bike,
  className,
  sizes = "(max-width: 768px) 90vw, 33vw",
  preload = false,
  tone = "kerb",
  children,
}: {
  bike: Bike;
  className?: string;
  sizes?: string;
  preload?: boolean;
  tone?: "kerb" | "ground";
  children?: ReactNode;
}) {
  return (
    <div className={clsx("relative isolate overflow-hidden", tone === "kerb" ? "bg-kerb" : "bg-ground", className)}>
      <div
        className="absolute inset-x-[16%] bottom-[12%] h-[6%] rounded-[50%] bg-ink/20 blur-lg"
        aria-hidden="true"
      />
      {bike.image ? (
        <Image
          src={bike.image}
          alt={`${bikeLabel(bike)}, side view`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-contain p-[7%] mix-blend-multiply transition-transform duration-[600ms] ease-out-quart group-hover:scale-[1.03]"
        />
      ) : (
        <BikeSilhouette category={bike.category} />
      )}
      {children}
    </div>
  );
}

/** Fallback line drawing when a photo isn't available yet. */
export function BikeSilhouette({ category }: { category: Bike["category"] }) {
  const scooter = category === "scooter";
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 m-auto h-[70%] w-[80%] text-ink/70" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="72" cy="140" r="38" />
        <circle cx="250" cy="140" r="38" />
        <circle cx="72" cy="140" r="6" fill="currentColor" />
        <circle cx="250" cy="140" r="6" fill="currentColor" />
        {scooter ? (
          <path d="M72 140h70l28-40h40l28 40M210 100l-10-50h-22M140 140c0-22 10-40 32-40M110 100h70" />
        ) : (
          <path d="M72 140l50-50h70l28 50M122 90l-12-22h-22M192 90l18-34h22M150 90l-12 50h40M100 90h110" />
        )}
      </g>
    </svg>
  );
}
