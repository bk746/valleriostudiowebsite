/** Raisons de pause Lenis — plusieurs sources peuvent coexister sans s’écraser. */
const pauseReasons = new Set<string>();

function applyLenisState(): void {
  if (typeof window === "undefined") return;
  const lenis = window.__lenis;
  if (!lenis) return;
  if (pauseReasons.size > 0) {
    if (!lenis.isStopped) lenis.stop();
  } else if (lenis.isStopped) {
    lenis.start();
  }
}

/** À appeler juste après `new Lenis()` pour respecter les pauses déjà actives. */
export function syncLenisAfterInit(): void {
  applyLenisState();
}

export function pauseLenis(reason: string): void {
  pauseReasons.add(reason);
  applyLenisState();
}

export function resumeLenis(reason: string): void {
  pauseReasons.delete(reason);
  applyLenisState();
}

/** Compat rétro — préférer pauseLenis / resumeLenis avec une raison explicite. */
export function stopLenis(): void {
  pauseLenis("legacy");
}

export function startLenis(): void {
  resumeLenis("legacy");
}

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}
