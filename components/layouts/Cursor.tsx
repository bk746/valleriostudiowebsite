"use client";

import { useEffect, useRef } from "react";

/*
  Curseur custom : un point central qui suit le pointeur instantanément, et
  un anneau qui le suit avec inertie (lerp). Au-dessus des éléments
  cliquables, l'anneau grossit pour signaler l'affordance.

  Désactivé sur écrans tactiles et `prefers-reduced-motion`. Le curseur
  système est masqué uniquement quand le composant est actif (classe sur
  `<body>`), pour ne pas casser l'UX en cas de bug de chargement.
*/
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const update = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.2;
      ring.style.transform =
        `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    const HOVER_SELECTOR =
      "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, label[for], summary";
    const isHoverable = (el: Element | null): boolean => {
      let node: Element | null = el;
      while (node && node !== document.body) {
        if ((node as HTMLElement).matches?.(HOVER_SELECTOR)) return true;
        node = node.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      targetScale = isHoverable(e.target as Element) ? 1.65 : 1;
    };

    const onLeaveDoc = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterDoc = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMouseDown = () => {
      ring.classList.add("is-pressed");
    };
    const onMouseUp = () => {
      ring.classList.remove("is-pressed");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="custom-cursor-ring" />
      <div ref={dotRef} aria-hidden className="custom-cursor-dot" />
    </>
  );
}
