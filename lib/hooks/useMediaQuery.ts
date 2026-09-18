"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe matchMedia subscription. Defaults to `false` on first render
 * (server + initial client paint), then syncs on mount and on change.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
