"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { rides } from "@/lib/content";

/*
  photo-chapters (taste-skill moment), written for React: a short story in five
  photographs, one large frame at a time. The section holds on screen while the
  page scrolls; each next photograph is uncovered over the last from its foot
  upward, settling from a slight zoom, and the panel on its lower left changes
  to that chapter half way through the wipe. It follows the scrollbar both ways.

  At rest (reduced motion, no script, a screen under 600px tall) the chapters
  stand side by side, each photograph over its words: nothing is hidden. Every
  chapter's words stay in the page for screen readers; only one is shown live.
*/

const ZOOM = 1.06;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function subscribe(cb: () => void) {
  const rq = matchMedia("(prefers-reduced-motion: reduce)");
  rq.addEventListener("change", cb);
  window.addEventListener("resize", cb);
  return () => {
    rq.removeEventListener("change", cb);
    window.removeEventListener("resize", cb);
  };
}
const canRun = () => !matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerHeight >= 600;

function Milestone({ km }: { km: number }) {
  return (
    <span className="inline-flex w-[58px] shrink-0 flex-col items-stretch text-center" aria-hidden="true">
      <span className="h-[22px] rounded-t-[29px] bg-plate" />
      <span className="flex flex-col items-center bg-white pb-1.5 pt-1 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <span className="font-plate text-[1.6rem] leading-none tabular-nums">{km}</span>
        <span className="font-plate text-[0.8rem] uppercase leading-none tracking-[0.08em]">km</span>
      </span>
    </span>
  );
}

function Words({ r, i, live = false }: { r: (typeof rides)[number]; i: number; live?: boolean }) {
  return (
    <div className="mo-ph__words grid gap-3">
      <div className="flex items-end gap-4">
        <Milestone km={r.km} />
        <h3 className="t-h3 pb-1">{r.name}</h3>
      </div>
      <p className={clsx("max-w-[44ch]", live && "hidden sm:block")}>{r.text}</p>
      <p className="text-gravel">
        <span className="sr-only">Ride {i + 1} of {rides.length}: </span>
        About {r.km} km and {r.time} from the counter. Best on {r.bike}.
      </p>
    </div>
  );
}

export function RideChapters() {
  const live = useSyncExternalStore(subscribe, canRun, () => false);
  const n = rides.length;
  const hold = n <= 3 ? 2 : 3;
  const root = useRef<HTMLElement>(null);
  const pics = useRef<(HTMLDivElement | null)[]>([]);
  const [on, setOn] = useState(0);

  const draw = useCallback(() => {
    const el = root.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    const p = span > 0 ? clamp(-rect.top / span) : 0;
    const seg = 1 / n;
    let k = 0;
    pics.current.forEach((pic, i) => {
      if (!pic) return;
      const u = i === 0 ? 1 : clamp((p - (i - 0.25) * seg) / (0.45 * seg));
      const e = easeOut(u);
      pic.style.setProperty("--mo-c", `${((1 - e) * 100).toFixed(2)}%`);
      pic.style.setProperty("--mo-z", (ZOOM - (ZOOM - 1) * e).toFixed(4));
      if (u >= 0.5) k = i;
    });
    setOn(k);
  }, [n]);

  useEffect(() => {
    if (!live) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [live, draw]);

  const head = (
    <div className="mo-ph__head grid gap-4 lg:grid-cols-12 lg:gap-x-6">
      <h2 id="rides-title" className="t-h2 max-w-[18ch] lg:col-span-6">
        Five rides from Hanamkonda
      </h2>
      <p className="max-w-[46ch] text-gravel lg:col-span-6 lg:col-start-7">
        Road distances from Kishanpura. Tell us where you are going when you book and we will suggest the bike.
      </p>
    </div>
  );

  if (!live) {
    return (
      <section ref={root} id="rides" aria-labelledby="rides-title" data-moment="photo-chapters" className="section-y">
        <div className="mo-ph wrap container-x grid gap-12">
          {head}
          <ol className="mo-ph__list grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {rides.map((r, i) => (
              <li key={r.name} className="mo-ph__ch grid content-start gap-4">
                <div className="mo-ph__pic relative aspect-[16/10] overflow-hidden bg-kerb sm:aspect-[4/5]">
                  <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 240px" className="object-cover" />
                </div>
                <Words r={r} i={i} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      id="rides"
      aria-labelledby="rides-title"
      data-moment="photo-chapters"
      className="is-live relative"
      style={{ height: `${(hold + 1) * 100}svh` }}
    >
      <div className="mo-ph wrap container-x sticky top-0 grid h-svh grid-rows-[auto_minmax(0,1fr)] gap-8 pb-6 pt-[104px] lg:gap-10 lg:pb-10">
        {head}
        <div className="mo-ph__stage relative min-h-0 overflow-clip bg-kerb">
          {rides.map((r, i) => (
            <div
              key={r.name}
              ref={(el) => {
                pics.current[i] = el;
              }}
              className="mo-ph__pic absolute inset-0 overflow-hidden will-change-[clip-path]"
              style={{ clipPath: "inset(var(--mo-c, 0%) 0 0 0)" }}
            >
              <Image
                src={r.photo.src}
                alt={r.photo.alt}
                fill
                sizes="(max-width: 640px) 300vw, (max-width: 1280px) 100vw, 1240px"
                className="origin-bottom object-cover will-change-transform"
                style={{ transform: "scale(var(--mo-z, 1))" }}
              />
            </div>
          ))}
          <div className="mo-ph__panel absolute inset-x-3 bottom-3 z-10 bg-ground p-5 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[440px] sm:p-7">
            <p className="mb-4 text-[0.875rem] tabular-nums text-gravel" aria-hidden="true">
              {String(on + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <ol className="mo-ph__list grid">
              {rides.map((r, i) => (
                <li
                  key={r.name}
                  className={clsx(
                    "mo-ph__ch [grid-area:1/1] transition-[opacity,transform]",
                    i === on
                      ? "is-on translate-y-0 opacity-100 delay-[60ms] duration-500 ease-out-quart"
                      : "pointer-events-none translate-y-2 opacity-0 duration-200",
                  )}
                >
                  <Words r={r} i={i} live />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
