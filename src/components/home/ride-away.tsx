"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The hero bike rides off to the right as the page scrolls down, and rolls back
 * when you scroll up. It is tied to the scroll position, not a timer, so it moves
 * exactly as fast as the reader does. Pulls away slowly, picks up speed, lifts
 * its front a touch on the throttle, bobs over the road, and leaves speed lines
 * behind it. Nothing moves for people who ask for reduced motion.
 */
export function RideAway({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const bike = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !bike.current || !shadow.current || !lines.current) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let start = 0;
    let distance = 1;
    let travel = 0;
    let frame = 0;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start once the bike has been seen: right away on desktop, where it sits
      // high in the hero; on phones, once it has scrolled up to mid-screen.
      start = Math.max(0, r.top + window.scrollY - vh * 0.45);
      distance = vh * 0.7;
      travel = window.innerWidth - r.left + 24;
    };

    const paint = () => {
      frame = 0;
      const b = bike.current!;
      const s = shadow.current!;
      const l = lines.current!;
      if (motion.matches) {
        b.style.transform = s.style.transform = "";
        l.style.opacity = "0";
        return;
      }
      const p = clamp((window.scrollY - start) / distance);
      const x = Math.pow(p, 1.7) * travel; // slow pull-away, then speed
      const speed = Math.sin(p * Math.PI); // 0 at rest and when gone, 1 mid-ride
      const lift = Math.sin(clamp(p / 0.45) * Math.PI) * -2.4; // front lifts on the throttle, settles
      const bob = -Math.abs(Math.sin(p * Math.PI * 7)) * 2.5 * speed; // road under the wheels

      b.style.transform = `translate3d(${x}px, ${bob}px, 0) rotate(${lift}deg)`;
      s.style.transform = `translate3d(${x}px, 0, 0) scaleX(${1 + speed * 0.45})`;
      s.style.opacity = String(1 - p * 0.8);
      l.style.opacity = String(speed * 0.7);
      l.style.setProperty("--stretch", String(speed));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    motion.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      motion.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <div ref={root} className="absolute inset-0">
      <div
        ref={shadow}
        className="absolute inset-x-[14%] bottom-[11%] h-[5%] origin-left rounded-[50%] bg-ink/25 blur-xl will-change-transform"
        aria-hidden="true"
      />
      <div ref={bike} className="absolute inset-0 origin-[24%_86%] will-change-transform">
        {/* Speed lines trail behind the rear wheel and stretch with the speed. */}
        <div ref={lines} className="pointer-events-none absolute right-[86%] top-[42%] h-[36%] w-[34%] opacity-0" aria-hidden="true">
          {[0, 38, 74].map((top, i) => (
            <span
              key={top}
              className="absolute right-0 h-[2px] origin-right rounded-full bg-gradient-to-l from-ink/60 to-transparent"
              style={{
                top: `${top}%`,
                width: `${[100, 70, 88][i]}%`,
                transform: "scaleX(var(--stretch, 0))",
              }}
            />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
