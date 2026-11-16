"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import clsx from "clsx";
import { Phone } from "lucide-react";
import { Logo, WhatsAppIcon } from "./ui";
import { business, nav, telHref, whatsappHref } from "@/lib/site";

const bookHref = whatsappHref(`Hi ${business.name}! I'd like to rent a bike.`);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change and Escape; lock page scroll while it is open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href.startsWith("/#") ? false : pathname.startsWith(href));

  return (
    <>
      <header
        className={clsx(
          "nav fixed inset-x-0 top-0 z-50 bg-ground transition-shadow duration-300",
          scrolled && !open && "shadow-[0_1px_0_var(--color-line)]",
        )}
      >
        <a
          href="#main"
          className="absolute left-4 top-3 z-[70] -translate-y-24 rounded-[4px] bg-ink px-4 py-3 text-ground focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="wrap container-x flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${business.name}, home`} className="rounded-[4px]">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={clsx(
                  "link-draw whitespace-nowrap py-1 text-[0.98rem]",
                  isActive(item.href) && "[background-size:100%_1.5px]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={telHref} className="link-draw hidden whitespace-nowrap py-1 tabular-nums xl:inline">
              {business.phoneDisplay}
            </a>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-[4px] bg-ink px-5 font-medium text-ground transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-black active:translate-y-px sm:inline-flex"
            >
              <WhatsAppIcon className="size-[18px]" />
              Book on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-[4px] shadow-[inset_0_0_0_1.5px_var(--color-ink)] lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-ink transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-ink transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-ground pt-[72px] lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap container-x flex flex-1 flex-col pt-4">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ "--i": i } as CSSProperties}
                className="enter flex min-h-14 items-center border-b border-line text-[1.75rem] tracking-[-0.02em]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-auto grid grid-cols-[1fr_1.6fr] gap-3 pb-8 pt-6">
              <a
                href={telHref}
                className="flex min-h-14 items-center justify-center gap-2 rounded-[4px] font-medium shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
              >
                <Phone className="size-4" aria-hidden="true" /> Call
              </a>
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-[4px] bg-ink font-medium text-ground"
              >
                <WhatsAppIcon /> Book on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
