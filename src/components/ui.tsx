import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

/** The mark is a rental plate: black, yellow letters, the name on it. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <span className="plate text-[1.15rem]">Naveen</span>
      <span className="text-[0.95rem] font-medium leading-tight tracking-[-0.01em]">Bike Rentals</span>
    </span>
  );
}

type Variant = "primary" | "secondary" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ground hover:bg-black",
  secondary: "text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-ground",
  inverse: "bg-ground text-ink hover:bg-white",
};

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[4px] px-6 text-[1rem] font-medium tracking-[-0.005em] transition-[transform,background-color,color] duration-200 ease-out-quart hover:-translate-y-px active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

export function ButtonLink({
  variant = "primary",
  className,
  children,
  external,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; external?: boolean }) {
  return (
    <Link
      className={clsx(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

/** Arrow for text links that lead somewhere (never appended to buttons). */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={clsx(
        "inline size-[0.9em] shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-[3px]",
        className,
      )}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2.5 8h10.5M9 3.8 13.2 8 9 12.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A text link with the arrow, for a section's head row. */
export function MoreLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={clsx("group inline-flex items-center gap-2 font-medium", className)}>
      <span className="link-line">{children}</span>
      <Arrow />
    </Link>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={clsx("size-5", className)} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.69 14.94L2 22l5.2-1.36A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.1l-.3-.18-3.06.8.82-2.98-.2-.31A8 8 0 1 1 12 20Zm4.43-5.99c-.24-.12-1.4-.69-1.62-.77-.21-.08-.37-.12-.53.12s-.61.77-.75.93-.28.18-.51.06a6.44 6.44 0 0 1-1.91-1.18 7.2 7.2 0 0 1-1.32-1.64c-.14-.24-.02-.37.1-.48.11-.11.24-.28.35-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.76-.19-.46-.39-.4-.53-.4h-.45c-.16 0-.41.06-.63.3-.21.24-.83.81-.83 1.98s.85 2.3.97 2.46c.12.15 1.68 2.57 4.07 3.6.57.25 1.01.39 1.36.5.57.18 1.09.15 1.5.09.45-.07 1.4-.58 1.6-1.13.19-.55.19-1.03.13-1.13-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

/**
 * A section's head row: the h2 on the left line; at its right, on the
 * baseline, one short line and an optional link. No eyebrow above it.
 */
export function SectionHead({
  title,
  side,
  link,
  id,
  className,
}: {
  title: ReactNode;
  side?: ReactNode;
  link?: { href: string; label: string };
  id?: string;
  className?: string;
}) {
  return (
    <div className={clsx("grid gap-5 lg:grid-cols-12 lg:gap-x-6", className)}>
      <h2 id={id} className="t-h2 max-w-[20ch] lg:col-span-6">
        {title}
      </h2>
      {(side || link) && (
        <div className="flex flex-col gap-3 lg:col-span-6 lg:col-start-7">
          {side && <p className="max-w-[46ch] text-gravel">{side}</p>}
          {link && <MoreLink href={link.href}>{link.label}</MoreLink>}
        </div>
      )}
    </div>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={clsx("inline-flex gap-0.5", className)} role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} viewBox="0 0 20 20" className="size-4" aria-hidden="true">
            <defs>
              <linearGradient id={`s${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#s${i}-${Math.round(fill * 100)})`}
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
            />
          </svg>
        );
      })}
    </span>
  );
}

/** Price set on a rental plate: "₹1,099 a day". */
export function PricePlate({ amount, className, unit = "day" }: { amount: string; className?: string; unit?: string }) {
  return (
    <span className={clsx("plate", className)}>
      {amount}
      <span className="text-[0.62em] tracking-[0.08em] opacity-80">/{unit}</span>
    </span>
  );
}
