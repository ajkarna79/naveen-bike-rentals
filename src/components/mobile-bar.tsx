"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./ui";
import { business, telHref, whatsappHref } from "@/lib/site";

/**
 * The phone bar: Book on WhatsApp across, Call beside it. It stays away
 * until the first screen (and its own Book button) has scrolled past.
 */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      className={clsx(
        "actionbar fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-line bg-ground px-4 pt-3 transition-transform duration-300 ease-out-quart lg:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a
        href={telHref}
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 items-center justify-center gap-2 rounded-[4px] px-5 font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
      >
        <Phone className="size-4" aria-hidden="true" /> Call
      </a>
      <a
        href={whatsappHref(`Hi ${business.name}! I'd like to rent a bike.`)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-ink font-medium text-ground"
      >
        <WhatsAppIcon className="size-[18px]" /> Book on WhatsApp
      </a>
    </nav>
  );
}
