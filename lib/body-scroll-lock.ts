/**
 * Compteur de verrous pour `body.style.overflow` — plusieurs sources
 * (intro, menu mobile) peuvent demander de bloquer le scroll sans s’écraser
 * au restore, ce qui causait parfois un scroll « mort » jusqu’au rechargement.
 */
let locks = 0;

function apply(): void {
  if (typeof document === "undefined") return;
  if (locks > 0) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.removeProperty("overflow");
  }
}

/** Incrémente le verrou et retourne une fonction `release` idempotente. */
export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") {
    return () => {};
  }
  locks += 1;
  apply();

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    apply();
  };
}

/** Cas bfcache / restauration d’onglet : repartir d’un état cohérent. */
export function resetBodyScrollLocks(): void {
  if (typeof document === "undefined") return;
  locks = 0;
  document.body.style.removeProperty("overflow");
}
