"use client";

import { useEffect } from "react";

/**
 * Turns on smooth scrolling only after the page has loaded. With
 * `scroll-behavior: smooth` set from the start, Chrome abandons the
 * load-time scroll to a URL fragment (e.g. /#kontakt from a product page)
 * while the document is still streaming in.
 */
export function SmoothScroll() {
  useEffect(() => {
    const enable = () => {
      document.documentElement.style.scrollBehavior = "smooth";
    };
    if (document.readyState === "complete") {
      enable();
      return;
    }
    window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, []);

  return null;
}
