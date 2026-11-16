import { BookingConsole } from "../booking-console";
import { HoursList, OpenBadge } from "../open-status";
import { ButtonLink, SectionHead, Stars, WhatsAppIcon } from "../ui";
import { business, fullAddress, telHref, whatsappHref } from "@/lib/site";
import { faqs, reviews, steps } from "@/lib/content";

/* ─────────────── Booking: the four steps beside the console ─────────────── */
export function BookSection() {
  return (
    <section id="how-it-works" aria-labelledby="book-title" className="section-y bg-kerb">
      <div className="wrap container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6 lg:pr-10">
          <h2 id="book-title" className="t-h2 max-w-[14ch]">
            Booking is one WhatsApp message
          </h2>
          <p className="mt-5 max-w-[46ch] text-gravel">
            No app, no advance payment. Work out the rent here and the message is written for you.
          </p>
          <ol className="mt-10 border-t border-ink">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line py-5">
                <span className="font-medium tabular-nums text-gravel">{i + 1}</span>
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-gravel">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <BookingConsole tone="ground" headingLevel={3} title="Work out the rent" className="lg:sticky lg:top-[96px]" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Reviews: three real ones, still ─────────────── */
export function Reviews() {
  const picks = [reviews[0], reviews[3], reviews[2]];
  return (
    <section aria-labelledby="reviews-title" className="pt-24 lg:pt-32">
      <div className="wrap container-x">
        <SectionHead
          id="reviews-title"
          title={`${business.rating.value} on Google from ${business.rating.count} reviews`}
          side="Three of them, shortened. Every review is on our Google listing."
        />
        <ul className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {picks.map((r) => (
            <li key={r.name} className="flex flex-col border-t border-ink pt-6">
              <Stars value={r.rating} className="text-ink" />
              <blockquote className="t-lead mt-4 flex-1">“{r.text}”</blockquote>
              <p className="mt-5 text-gravel">{r.name}, Google review</p>
            </li>
          ))}
        </ul>
        <a
          href={business.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mt-10 inline-flex min-h-11 items-center font-medium"
        >
          Read all {business.rating.count} reviews on Google
        </a>
      </div>
    </section>
  );
}

/* ─────────────── Visit: address, hours, the map ─────────────── */
export function VisitSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="visit" data-place="visit" aria-labelledby="visit-title" className="section-y">
      <div className="wrap container-x grid gap-6 lg:grid-cols-12">
        <div className="bg-kerb p-5 sm:p-10 lg:col-span-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <H id="visit-title" className="t-h2">
              Visit the counter
            </H>
            <OpenBadge />
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="flex flex-col gap-4">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line w-fit text-[1.25rem] leading-[1.5]"
              >
                {fullAddress}
              </a>
              <p className="text-gravel">{business.address.landmark}.</p>
              <a href={telHref} className="link-line w-fit tabular-nums">
                {business.phoneDisplay}
              </a>
              <ButtonLink href={business.directionsUrl} external variant="secondary" className="mt-2 w-fit">
                Get directions
              </ButtonLink>
            </div>
            <HoursList hours={business.hours} />
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-kerb lg:col-span-6">
          <iframe
            title="Map showing Naveen Bike Rentals in Kishanpura, Hanamkonda"
            src={business.mapEmbedUrl}
            className="absolute inset-0 size-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
/** Kept for pages that import the old name. */
export const LocationSection = VisitSection;

/* ─────────────── Close: one line, the action, the name on a plate ─────────────── */
export function FinalCta() {
  return (
    <section aria-labelledby="close-title" className="section-y pb-16 lg:pb-20">
      <div className="wrap container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 id="close-title" className="t-h2 max-w-[16ch]">
              Your bike can be ready at 6 tomorrow morning
            </h2>
            <p className="mt-5 max-w-[46ch] text-gravel">
              Message tonight with the bike and the time. We reply with availability and the deposit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink href={whatsappHref(`Hi ${business.name}! I'd like to book a bike for tomorrow.`)} external className="min-h-14 px-7">
              <WhatsAppIcon /> Book on WhatsApp
            </ButtonLink>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="plate mt-14 flex w-full justify-center whitespace-nowrap py-[0.32em] text-[clamp(1.9rem,8.4vw,8.6rem)] tracking-[0.04em]"
        >
          Naveen Bike Rentals
        </p>
      </div>
    </section>
  );
}

/* ─────────────── FAQ list (used on /faq, /pricing and bike pages) ─────────────── */
export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="border-t border-ink">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-4 text-[1.125rem] font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="relative grid size-6 shrink-0 place-items-center">
              <span className="absolute h-[1.5px] w-3.5 bg-current" />
              <span className="absolute h-3.5 w-[1.5px] bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-[64ch] pb-6 pr-10 text-gravel">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
