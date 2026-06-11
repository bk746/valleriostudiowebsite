"use client";

import { useEffect, useRef, useState } from "react";
import "@/lib/lenis-control";

type Item = { id: string; label: string; num: string };

/**
 * Expérience de lecture des études de cas :
 * - barre de progression fixe en haut (scroll global),
 * - rail latéral des sections (desktop) avec état actif,
 * - clic = scroll doux vers la section.
 */
export default function CaseStudyNav({ items }: { items: ReadonlyArray<Item> }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement | null>(null);

  /* Progression : transform via ref, pas de re-render à chaque pixel. */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${p})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Section active : bande médiane du viewport. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    let y = 0;
    let node: HTMLElement | null = el;
    while (node) {
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    const top = Math.max(0, y - 110);
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.1 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Barre de progression de lecture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2.5px]"
      >
        <div
          ref={barRef}
          className="h-full origin-left bg-[#0071E3]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Rail des sections — desktop large uniquement */}
      <nav
        aria-label="Sections de l'étude de cas"
        className="fixed right-7 top-1/2 z-[80] hidden -translate-y-1/2 xl:block"
      >
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(it.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex w-full items-center justify-end gap-3 rounded-full px-3 py-2 text-right outline-none transition-colors duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[#0071E3]/40"
                >
                  <span
                    className={
                      "font-sans text-[0.64rem] font-semibold uppercase tracking-[0.18em] transition-[opacity,color,transform] duration-300 ease-out" +
                      (isActive
                        ? " translate-x-0 text-[#0071E3] opacity-100"
                        : " translate-x-1 text-[#1D1D1F]/45 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")
                    }
                  >
                    {it.label}
                  </span>
                  <span
                    aria-hidden
                    className={
                      "h-[2px] shrink-0 rounded-full transition-[width,background-color] duration-300 ease-out" +
                      (isActive
                        ? " w-7 bg-[#0071E3]"
                        : " w-4 bg-[#1D1D1F]/25 group-hover:bg-[#1D1D1F]/50")
                    }
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
