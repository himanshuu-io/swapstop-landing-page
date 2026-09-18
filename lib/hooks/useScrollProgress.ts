"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { clamp01 } from "../easing";

interface UseScrollProgressOptions {
  /** Lerp factor applied per animation frame (Story 0.14, Finish 0.11, Protect 0.14 in the source). */
  lerpFactor: number;
  /**
   * Caller-computed gate: `isDesktop && !prefersReducedMotion`. When false, the
   * section should render its static mobile fallback instead of reading this
   * hook's progress, and no rAF loop runs at all.
   */
  enabled: boolean;
}

/**
 * Shared sticky-scroll progress engine for Story/Finish/Protect.
 *
 * Ported from the source's per-section IIFEs: `raw = clamp01(-rect.top / (sectionHeight -
 * innerHeight))`, smoothed every animation frame via `smooth += (raw - smooth) * lerpFactor`
 * with a snap-to-target once the delta is negligible.
 *
 * Fix applied during the port: the source runs all 3 of these loops forever, unconditionally,
 * even when the section is off-screen. Here the rAF loop is gated by an IntersectionObserver
 * (with a 200px margin so it starts a frame early) and torn down whenever the section leaves
 * the viewport or `enabled` goes false — same math, cheaper on low-power devices.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { lerpFactor, enabled }: UseScrollProgressOptions,
): number {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const smoothRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const intersectingRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    smoothRef.current = 0;
    setSmoothProgress(0);

    const computeRaw = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return clamp01(-rect.top / total);
    };

    const loop = () => {
      const raw = computeRaw();
      const delta = raw - smoothRef.current;
      smoothRef.current = Math.abs(delta) < 0.0005 ? raw : smoothRef.current + delta * lerpFactor;
      setSmoothProgress(smoothRef.current);

      rafId.current = intersectingRef.current ? requestAnimationFrame(loop) : null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafId.current === null) {
          rafId.current = requestAnimationFrame(loop);
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [ref, enabled, lerpFactor]);

  return enabled ? smoothProgress : 0;
}
