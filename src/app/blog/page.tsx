import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/sections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Bike Rental Guides for Warangal and Hanamkonda",
  description:
    "Which Royal Enfield to rent, scooty or geared bike, renting vs buying as a student: straight answers with real prices from our rate list.",
  alternates: { canonical: "/blog" },
};

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }]}
        title="Guides for renting a bike in Warangal"
        intro="Short, practical answers to what riders ask us before they book, with the real prices from our rate list."
      />
      <section className="pb-24 lg:pb-32">
        <div className="wrap container-x">
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-kerb">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 400px"
                      className="object-contain p-[8%] mix-blend-multiply transition-transform duration-[600ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-[0.9rem] text-gravel">{fmt(p.published)}</p>
                  <h2 className="t-h3 mt-1">
                    <span className="link-draw">{p.title}</span>
                  </h2>
                  <p className="mt-2 text-gravel">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
