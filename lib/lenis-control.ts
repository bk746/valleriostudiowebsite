/** Arrête / relance Lenis en sync avec les verrous de scroll (intro, menu, transitions). */
export function stopLenis(): void {
  if (typeof window === "undefined") return;
  window.__lenis?.stop();
}

export function startLenis(): void {
  if (typeof window === "undefined") return;
  window.__lenis?.start();
}

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}
