import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center pb-16 pt-28">
      <div className="wrap container-x">
        <p className="plate text-[clamp(3rem,10vw,6rem)]">404</p>
        <h1 className="t-h1 mt-8 max-w-[14ch]">This page is not on the map</h1>
        <p className="t-lead mt-5 max-w-[44ch] text-gravel">
          The link may be old or mistyped. The bikes and prices are all on the bikes page.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <ButtonLink href="/bikes">See the bikes</ButtonLink>
          <Link href="/" className="link-line font-medium">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
