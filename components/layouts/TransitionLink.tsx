"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { triggerSectionTransition } from "@/components/layouts/SectionTransition";
import { prepareNavigateToHomeWithSameTransition } from "@/components/layouts/HomePendingSectionTransition";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  label: string;
  targetId: string;
  href: string;
  children: ReactNode;
};

function isHomePath(path: string): boolean {
  return path === "/" || path === "";
}

/**
 * Ancres `#services`, `#realisations`, `#faq` :
 * — Sur `/` : même flow partout → transition + scroll (comme Réalisations et FAQ déjà branchés ainsi).
 * — Hors `/` → `prepare…` puis `router.push("/")`, puis même transition une fois la home montée (voir listener global).
 */
export default function TransitionLink({
  label,
  targetId,
  href,
  children,
  onClick,
  ...rest
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (typeof window === "undefined") return;

        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        if (isHomePath(pathname ?? "")) {
          e.preventDefault();
          triggerSectionTransition(label, targetId);
          return;
        }

        e.preventDefault();
        prepareNavigateToHomeWithSameTransition(label, targetId);
        router.push("/");
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
