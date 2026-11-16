import Link from "next/link";
import type { ReactNode } from "react";
import { business, telHref, whatsappHref } from "@/lib/site";

/** One numbered section of a policy page: a ruled top, an h2, then its content. */
export function PolicySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-ink pt-6">
      <h2 id={id} className="t-h3">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-3 text-gravel [&_strong]:font-medium [&_strong]:text-ink">{children}</div>
    </section>
  );
}

/** A ruled table for rules: the first column is the row's heading. */
export function RuleTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full min-w-[520px] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-ink">
          <tr className="t-label text-gravel">
            {head.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line">
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="py-3 pr-4 font-medium text-ink">
                    {c}
                  </th>
                ) : (
                  <td key={j} className="py-3 pr-4 tabular-nums">
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

/** The contact line and related-policy links at the foot of each policy page. */
export function PolicyFooter({ current }: { current: "cancellation" | "refund" | "guide" | "terms" }) {
  const links = [
    { key: "guide", href: "/rental-guide", label: "Rental guide and late returns" },
    { key: "cancellation", href: "/cancellation-policy", label: "Cancellation policy" },
    { key: "refund", href: "/refund-policy", label: "Deposit and refund policy" },
    { key: "terms", href: "/terms", label: "Rental terms" },
  ].filter((l) => l.key !== current);
  return (
    <div className="border-t border-line pt-8">
      <p className="text-gravel">
        Questions? Call{" "}
        <a href={telHref} className="link-line font-medium text-ink">
          {business.phoneDisplay}
        </a>{" "}
        or{" "}
        <a href={whatsappHref(`Hi ${business.name}, I have a question about the rental rules.`)} target="_blank" rel="noopener noreferrer" className="link-line font-medium text-ink">
          message us on WhatsApp
        </a>
        , every day from 6 AM to 11:30 PM.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
        {links.map((l) => (
          <li key={l.key}>
            <Link href={l.href} className="link-draw inline-flex min-h-11 items-center">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
