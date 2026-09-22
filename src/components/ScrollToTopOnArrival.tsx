"use client";

import { useLayoutEffect } from "react";

/**
 * Jumps to the top, before paint, when a page is reached by client-side
 * navigation. Needed for pages that mount inside a Suspense boundary: Next's
 * own scroll-to-top finds no DOM for the new segment and skips it, and with
 * an empty fallback the document briefly shrinks to header + footer, so the
 * browser clamps the old scroll offset to the footer. Reloads and back/
 * forward keep the browser's restored position.
 */
export function ScrollToTopOnArrival() {
  useLayoutEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload" || nav?.type === "back_forward") return;
    if (window.scrollY > 0 && !window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
