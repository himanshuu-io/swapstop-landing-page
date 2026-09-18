"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useNavTheme } from "@/lib/hooks/useNavTheme";

// Figma node 698:164 ("Nav bar") — labels/order match that design exactly.
// Hrefs map each label to the closest matching section already on the page.
const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#protect", label: "Security" },
  { href: "#locations", label: "Locations" },
  { href: "#faq", label: "FAQs" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const onLight = useNavTheme(navRef);
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const textColor = onLight ? "text-ink" : "text-white";
  // Figma ships a dedicated on-light variant (forest mark + lime accent, forest wordmark
  // — node 706:939) rather than one asset color-hacked via CSS. The mobile menu is always
  // on the dark forest overlay regardless of `onLight`, so it always uses the dark-bg pair.
  const useOnLightLogo = onLight && !isOpen;
  const logoMarkSrc = useOnLightLogo ? "/images/logo-mark-onlight.svg" : "/images/logo-mark.svg";
  const logoWordmarkSrc = useOnLightLogo
    ? "/images/logo-wordmark-onlight.svg"
    : "/images/logo-wordmark.svg";

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[1000] mx-auto flex max-w-page items-center gap-[34px] px-6 py-4 min-900:px-24"
    >
      <Link
        href="#top"
        aria-label="SwapStop home"
        onClick={() => setIsOpen(false)}
        className="z-10 flex shrink-0 items-center gap-1.5"
      >
        <Image
          src={logoMarkSrc}
          alt=""
          width={40}
          height={40}
          quality={95}
          className="h-8 w-8 min-900:h-10 min-900:w-10"
        />
        <Image
          src={logoWordmarkSrc}
          alt="SwapStop"
          width={126}
          height={25}
          quality={95}
          className="h-[19px] w-auto min-900:h-[22px]"
        />
      </Link>

      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Toggle menu"}
        aria-expanded={isOpen}
        aria-controls="navLinks"
        onClick={() => setIsOpen((v) => !v)}
        className="z-10 ml-auto flex h-8 w-8 flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0 min-900:hidden"
      >
        <span
          className={`block h-0.5 w-full rounded-full transition-transform duration-200 ${
            isOpen ? "translate-y-[7px] rotate-45 bg-white" : onLight ? "bg-ink" : "bg-white"
          }`}
        />
        <span
          className={`block h-0.5 w-full rounded-full transition-opacity duration-200 ${
            isOpen ? "bg-white opacity-0" : onLight ? "bg-ink" : "bg-white"
          }`}
        />
        <span
          className={`block h-0.5 w-full rounded-full transition-transform duration-200 ${
            isOpen ? "-translate-y-[7px] -rotate-45 bg-white" : onLight ? "bg-ink" : "bg-white"
          }`}
        />
      </button>

      {/* Desktop links — unchanged flow, inline in the bar */}
      <nav className="hidden min-900:flex min-900:flex-1 min-900:items-center min-900:justify-end min-900:gap-[34px]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap text-base transition-opacity duration-150 hover:opacity-70 ${textColor}`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#get-app"
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-btn border px-8 py-4 text-base font-semibold transition-colors ${
            onLight
              ? "border-ink text-ink hover:bg-ink/[0.08]"
              : "border-white text-white hover:bg-white/10"
          }`}
        >
          Get the App
        </a>
      </nav>

      {/* Mobile menu — full-viewport-height overlay, not a small dropdown */}
      <nav
        id="navLinks"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-0 flex h-[100dvh] w-full flex-col justify-center gap-2 bg-forest px-8 transition-opacity duration-300 min-900:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${80 + i * 45}ms` : "0ms" }}
            className={`border-b border-white/10 py-4 font-display text-[clamp(32px,9vw,44px)] font-medium text-white transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#get-app"
          onClick={() => setIsOpen(false)}
          style={{ transitionDelay: isOpen ? `${80 + NAV_LINKS.length * 45}ms` : "0ms" }}
          className={`btn btn-primary mt-8 w-full transition-all duration-300 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Get the App
        </a>
      </nav>
    </header>
  );
}
