'use client';

import Image from 'next/image';
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from '@/lib/hooks/useRevealOnScroll';

export default function Footer() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <footer
      id="site-footer"
      data-nav-bg="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-forest"
    >
      {/* CTA Block */}
      <div
        id="get-app"
        ref={ref}
        className={`flex flex-col items-center gap-10 px-6 pt-[120px] max-900:pt-24 max-560:pt-20 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <h2 className="m-0 w-full max-w-[754px] text-center font-display text-[64px] font-medium leading-tight tracking-tight text-[#f5f1e7] max-900:text-[clamp(18px,calc(6.5vw-2px),64px)]">
          Got something to sell?
          <br />
          Sell it, drop it off, and
          <br />
          move on.
        </h2>
        <a href="#" className="btn btn-primary">
          Get the App
        </a>
      </div>

      {/* Links Block */}
      <div className="mx-auto mt-[172px] flex w-full max-w-[1248px] flex-wrap justify-between gap-12 px-6 flex-shrink-0 max-900:mt-24">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/footer-brand-icon.svg"
              alt=""
              width={22}
              height={22}
              quality={95}
              className="block h-[22px] w-[22px]"
            />
            <p className="m-0 whitespace-nowrap font-display text-xl font-semibold leading-snug text-[#f3f3f3]">
              SwapStop
            </p>
          </div>
          <p className="m-0 w-[271px] max-w-full font-display text-base font-normal leading-relaxed text-[#f5f1e7]">
            Complete the sale on your own time. Payment held securely until the buyer accepts.
          </p>
        </div>

        {/* Nav Columns */}
        <div className="flex flex-wrap gap-12">
          {/* Company Nav */}
          <nav aria-label="Company" className="flex flex-col gap-3">
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Chula Vista launch
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              About SwapStop
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Careers
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Contact
            </a>
          </nav>

          {/* Support Nav */}
          <nav aria-label="Support" className="flex flex-col gap-3">
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Help centre
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Returns and disputes
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-display text-base font-normal leading-relaxed text-[#c2c2ba] transition-colors duration-300 hover:text-[#f5f1e7]"
            >
              Privacy
            </a>
          </nav>
        </div>
      </div>

      {/* Wordmark Block */}
      <div className="relative w-full flex-shrink-0 pt-12 pb-2" style={{ lineHeight: 0 }}>
        <div className="relative w-full" style={{ aspectRatio: '1423.69 / 277.92' }}>
          <Image
            src="/images/footer-wordmark.svg"
            alt=""
            fill
            quality={95}
            className="object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Legal Text */}
        <div className="absolute left-0 right-0 top-[53.5%] z-10 mx-auto flex w-full max-w-[1248px] flex-wrap justify-between gap-3 px-6 max-560:gap-8">
          <p className="m-0 font-instrument text-base font-normal leading-relaxed text-white max-560:whitespace-normal">
            © 2026 SwapStop, Inc. · Chula Vista, California
          </p>
          <p className="m-0 font-instrument text-base font-normal leading-relaxed text-white max-560:whitespace-normal">
            Payment held securely until the buyer accepts.
          </p>
        </div>
      </div>
    </footer>
  );
}
