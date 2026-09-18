"use client";

import { useEffect, useState } from "react";

export interface CanvasScale {
  scale: number;
  /** Centering offset in px for canvases whose sibling images live outside the scaled box. */
  left: number;
  top: number;
}

const REF_WIDTH = 1440;
const REF_HEIGHT = 1024;

/**
 * Shared "1440x1024 design canvas" scale calculation used by Story, Finish, Clarity,
 * Handoff and Protect, replacing 5 near-duplicate resize handlers in the source.
 *
 * `matchHeight: false` (Story): `scale = clamp(innerWidth / 1440, 0.3, 1)` — the canvas is
 * self-centered via `translate(-50%, -50%)`, so no left/top offset is needed.
 *
 * `matchHeight: true` (Finish/Clarity/Handoff/Protect): `scale = clamp(min(innerWidth / 1440,
 * innerHeight / 1024), 0.3, 1)`, plus centering offsets — these sections position images
 * *outside* the scaled canvas (to avoid raster upscaling blur), reading left/top directly.
 */
export function useCanvasScale(matchHeight: boolean): CanvasScale {
  const [state, setState] = useState<CanvasScale>({ scale: 1, left: 0, top: 0 });

  useEffect(() => {
    const update = () => {
      const byWidth = window.innerWidth / REF_WIDTH;
      const byHeight = window.innerHeight / REF_HEIGHT;
      const raw = matchHeight ? Math.min(byWidth, byHeight, 1) : Math.min(byWidth, 1);
      const scale = Math.max(raw, 0.3);
      setState({
        scale,
        left: (window.innerWidth - REF_WIDTH * scale) / 2,
        top: (window.innerHeight - REF_HEIGHT * scale) / 2,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [matchHeight]);

  return state;
}
