import Link from "next/link";
import type { ReactNode } from "react";

/** Inner-page hero: the breadcrumb, the h1 and one line. No eyebrow, no ground effects. */
export function PageHero({
  title,
  intro,
  crumbs,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  crumbs: { name: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="pb-12 pt-[120px] sm:pb-16 sm:pt-[148px]">
      <div className="wrap container-x">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[0.95rem] text-gravel">
            {crumbs.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="link-line">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="t-h1 max-w-[16ch]">{title}</h1>
        {intro && <p className="t-lead mt-6 max-w-[52ch] text-gravel">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
