"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Adaptive navbar theme: reads every `[data-nav-bg="light"|"dark"]` section and flips the
 * navbar to `.on-light` styling when the section currently spanning the navbar's bottom edge
 * is a light one. Ported from the source's rAF-throttled scroll/resize listener (ticking-flag
 * pattern) — this is event-driven, not a permanent loop, so it's left as-is (no perf fix needed).
 */
export function useNavTheme(navRef: RefObject<HTMLElement | null>): boolean {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      const nav = navRef.current;
      ticking = false;
      if (!nav) return;

      const probeY = nav.offsetHeight + 1;
      const zones = document.querySelectorAll<HTMLElement>("[data-nav-bg]");
      let theme: string | null = null;
      zones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          theme = zone.dataset.navBg ?? null;
        }
      });
      setOnLight(theme === "light");
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [navRef]);

  return onLight;
}
