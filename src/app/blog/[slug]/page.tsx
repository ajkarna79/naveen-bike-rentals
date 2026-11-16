import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { BikeCard } from "@/components/bike-card";
import { FinalCta } from "@/components/home/sections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getPost, postBikes, posts, type Block } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      url: `/blog/${p.slug}`,
      publishedTime: p.published,
      modifiedTime: p.updated,
      images: [{ url: p.image.src, alt: p.image.alt }],
    },
  };
}

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));

function BlockView({ b }: { b: Block }) {
  if (b.type === "h2") return <h2 className="t-h3 mt-12">{b.text}</h2>;
  if (b.type === "p") return <p className="mt-5 text-[1.125rem] leading-[1.65] text-ink/90">{b.text}</p>;
  if (b.type === "list")
    return (
      <ul className="mt-5 border-t border-ink">
        {b.items.map((t) => (
          <li key={t} className="border-b border-line py-3 text-[1.0625rem]">
            {t}
          </li>
        ))}
      </ul>
    );
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[560px] text-left">
        <thead className="border-b border-ink">
          <tr className="t-label text-gravel">
            {b.head.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r) => (
            <tr key={r[0]} className="border-b border-line">
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-3 pr-4 font-medium">
                    {c}
                  </th>
                ) : (
                  <td key={i} className="py-3 pr-4 tabular-nums text-gravel">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = posts.filter((o) => o.slug !== p.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          image: `${SITE_URL}${p.image.src}`,
          datePublished: p.published,
          dateModified: p.updated,
          inLanguage: "en-IN",
          author: { "@id": `${SITE_URL}/#business` },
          publisher: { "@id": `${SITE_URL}/#business` },
          mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
          { name: p.title, path: `/blog/${p.slug}` },
        ])}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: p.title }]} title={p.title} compact>
        <p className="mt-6 text-gravel">
          <time dateTime={p.published}>{fmt(p.published)}</time>, Naveen Bike Rentals
        </p>
      </PageHero>

      <article className="pb-20 lg:pb-28">
        <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="max-w-[68ch] lg:col-span-8">
            <div className="relative aspect-[16/9] bg-kerb">
              <Image src={p.image.src} alt={p.image.alt} fill preload sizes="(max-width: 1024px) 92vw, 800px" className="object-contain p-[6%] mix-blend-multiply" />
            </div>
            <p className="t-lead mt-8">{p.description}</p>
            {p.body.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
          </div>
          <aside className="lg:col-span-4" aria-label="More guides">
            <div className="lg:sticky lg:top-[96px]">
              <p className="t-label text-gravel">More guides</p>
              <ul className="mt-3 border-t border-ink">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/blog/${o.slug}`} className="block border-b border-line py-4">
                      <span className="link-draw font-medium">{o.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/rides" className="link-line mt-6 inline-flex min-h-11 items-center font-medium">
                Ride guides from Hanamkonda
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="post-bikes" className="section-y bg-kerb">
        <div className="wrap container-x">
          <h2 id="post-bikes" className="t-h2">
            The bikes in this guide
          </h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {postBikes(p).map((b) => (
              <BikeCard key={b.slug} bike={b} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
