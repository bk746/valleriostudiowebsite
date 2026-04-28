"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import logo from "@/src/images/vallerio-logo-noir.svg";
import TransitionLink from "@/components/layouts/TransitionLink";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const NAV_HEIGHT = 80;

const linkBase =
  "relative z-10 inline-flex min-h-11 shrink-0 cursor-pointer items-center " +
  "justify-center rounded-sm px-5 py-3.5 text-base origin-center " +
  "transition-[color,transform] duration-300 ease-out touch-manipulation " +
  "hover:-translate-y-0.5 hover:scale-105";

const navItemClass = "shrink-0";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < 60) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);

      lastY = y;

      const all = document.querySelectorAll<HTMLElement>(
        "main section, body > section, body > footer"
      );
      let topMost: HTMLElement | null = null;
      for (let i = all.length - 1; i >= 0; i--) {
        const rect = all[i].getBoundingClientRect();
        if (rect.top <= NAV_HEIGHT && rect.bottom > NAV_HEIGHT) {
          topMost = all[i];
          break;
        }
      }
      setOnDark(topMost?.dataset.navTheme === "dark");
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Verrouille le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Ferme le menu sur Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Quand le menu est ouvert sur mobile, on force le thème sombre des liens
  // (overlay vert) et l'icône burger en cream.
  const effectiveDark = onDark || menuOpen;
  const linkColor = effectiveDark ? "text-[#FDF6EC]" : "text-black";

  const buttonClass = effectiveDark
    ? "relative z-10 shrink-0 rounded-full border-2 border-[#FDF6EC] bg-[#FDF6EC] px-5 py-1.5 text-sm text-[#343d33] transition-colors duration-300 ease-out hover:bg-transparent hover:text-[#FDF6EC] sm:px-8 sm:text-base"
    : "relative z-10 shrink-0 rounded-full border-2 border-black bg-black px-5 py-1.5 text-sm text-white transition-colors duration-300 ease-out hover:bg-white hover:text-black sm:px-8 sm:text-base";

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={
          bebas.className +
          " fixed inset-x-0 top-0 z-[100] flex h-20 w-full items-center justify-between overflow-visible bg-transparent px-5 sm:px-10 md:px-14 lg:px-20" +
          " transition-transform duration-500 ease-out will-change-transform" +
          (hidden && !menuOpen ? " -translate-y-full" : " translate-y-0")
        }
      >
        <Link
          href="/"
          aria-label="Vallerio Studio — accueil"
          className="pointer-events-auto relative z-10 -top-2 block h-full w-20 sm:w-24"
          onClick={closeMenu}
        >
          <Image
            src={logo}
            alt=""
            fill
            className={
              "object-contain transition-[filter] duration-300 ease-out " +
              (effectiveDark ? "invert" : "")
            }
            priority
          />
        </Link>

        {/* Liens desktop */}
        <div className="relative z-10 hidden items-center gap-6 md:flex md:gap-8 lg:gap-10">
          <ul className="relative z-10 flex items-center justify-end gap-2 md:gap-4 lg:gap-6">
            <li className={navItemClass}>
              <TransitionLink
                href="/#services"
                targetId="services"
                label="Services"
                className={linkBase + " " + linkColor}
              >
                Services
              </TransitionLink>
            </li>
            <li className={navItemClass}>
              <TransitionLink
                href="/#realisations"
                targetId="realisations"
                label="Réalisations"
                className={linkBase + " " + linkColor}
              >
                Réalisations
              </TransitionLink>
            </li>
            <li className={navItemClass}>
              <TransitionLink
                href="/#faq"
                targetId="faq"
                label="FAQ"
                className={linkBase + " " + linkColor}
              >
                FAQ
              </TransitionLink>
            </li>
          </ul>

          <Link href="/contact" className={buttonClass}>
            Discuter
          </Link>
        </div>

        {/* Burger mobile (≤ md) */}
        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[110] flex size-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-7">
            <span
              className={
                "absolute left-0 right-0 h-[2px] origin-center transition-all duration-300 ease-out " +
                (effectiveDark ? "bg-[#FDF6EC]" : "bg-black") +
                (menuOpen
                  ? " top-1/2 -translate-y-1/2 rotate-45"
                  : " top-0")
              }
            />
            <span
              className={
                "absolute left-0 right-0 h-[2px] origin-center transition-all duration-300 ease-out " +
                (effectiveDark ? "bg-[#FDF6EC]" : "bg-black") +
                (menuOpen
                  ? " bottom-1/2 translate-y-1/2 -rotate-45"
                  : " bottom-0")
              }
            />
          </span>
        </button>
      </nav>

      {/* Overlay mobile plein écran — placé SOUS la nav (z-[95] < z-[100])
          pour que le bouton hamburger reste cliquable et visible (animé en
          croix) au-dessus de l'overlay. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={
          bebas.className +
          " fixed inset-0 z-[95] flex flex-col bg-[#343d33] text-[#FDF6EC] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden" +
          (menuOpen
            ? " pointer-events-auto translate-y-0 opacity-100"
            : " pointer-events-none -translate-y-2 opacity-0")
        }
      >
        <div className="flex flex-1 flex-col justify-between px-6 pb-10 pt-28 sm:px-10">
          <ul className="m-0 flex flex-col gap-3 p-0">
            {[
              { href: "/#services", id: "services", label: "Services" },
              {
                href: "/#realisations",
                id: "realisations",
                label: "Réalisations",
              },
              { href: "/#faq", id: "faq", label: "FAQ" },
            ].map((l) => (
              <li key={l.id}>
                <TransitionLink
                  href={l.href}
                  targetId={l.id}
                  label={l.label}
                  className="block py-2 text-[clamp(2.6rem,12vw,4rem)] uppercase leading-none tracking-[-0.005em] text-[#FDF6EC] transition-opacity duration-300 ease-out hover:opacity-70"
                  onClick={closeMenu}
                >
                  {l.label}
                </TransitionLink>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="block py-2 text-[clamp(2.6rem,12vw,4rem)] uppercase leading-none tracking-[-0.005em] text-[#FDF6EC] transition-opacity duration-300 ease-out hover:opacity-70"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 border-t border-[#FDF6EC]/20 pt-6 text-[0.78rem] uppercase tracking-[0.24em] text-[#FDF6EC]/70">
            <a
              href="mailto:hello@valleriostudio.fr"
              className="text-[#FDF6EC]"
            >
              hello@valleriostudio.fr
            </a>
            <span>Annecy · Lun–Ven 9h–18h</span>
          </div>
        </div>
      </div>
    </>
  );
}
