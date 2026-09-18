"use client";

import Image from "next/image";
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";

export default function Locations() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      id="locations"
      data-nav-bg="dark"
      className="relative min-h-screen w-full overflow-hidden bg-[#f5f1e7]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/locations-bg.webp"
          alt="A person retrieving headphones from a SwapStop locker outside a neighborhood shop"
          fill
          quality={95}
          className="object-cover"
        />
      </div>

      {/* Card */}
      <div
        ref={ref}
        className={`absolute left-24 bottom-24 z-2 w-[612px] max-w-[calc(100vw-48px)] rounded-[40px] bg-[#f5f1e7] p-12 max-700:left-5 max-700:right-5 max-700:bottom-5 max-700:w-auto max-700:rounded-[28px] max-700:p-8 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <div className="flex flex-col gap-10">
          {/* Intro section */}
          <div className="flex flex-col gap-4">
            {/* Live badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-5 w-5 rounded-full bg-lime"
                aria-hidden="true"
              />
              <p className="m-0 font-display text-[14px] font-semibold leading-[1.4] text-[#4b4d48]">
                Live
              </p>
            </div>

            {/* Title and description */}
            <div>
              <h2 className="m-0 font-display text-[40px] font-medium leading-[1.2] tracking-[-0.8px] text-ink whitespace-nowrap max-700:whitespace-normal max-700:text-[clamp(28px,8vw,40px)]">
                Starting in Chula Vista.
              </h2>
              <p className="m-0 mt-4 font-display text-[16px] font-normal leading-[1.4] text-[#4b4d48] max-w-[365px] max-700:max-w-full">
                SwapStop is starting locally, with its first live locker in Chula Vista,
                California.
              </p>
            </div>
          </div>

          {/* Locations list */}
          <ul className="m-0 list-none p-0 w-full">
            {/* Row 1: Third Ave & E St - Live */}
            <li className="flex items-center gap-3.5 py-4 px-0">
              <span
                className="inline-block h-4 w-4 flex-shrink-0 rounded-full bg-lime"
                aria-hidden="true"
              />
              <p className="m-0 flex-1 min-w-0 font-display text-[14px] font-medium leading-[1.2] text-ink">
                Third Ave &amp; E St
              </p>
              <p className="m-0 flex-shrink-0 font-display text-[12px] font-medium leading-[1.2] uppercase tracking-[0.48px] text-[#476137]">
                Live
              </p>
            </li>

            {/* Row 2: Broadway & H St - Live */}
            <li className="flex items-center gap-3.5 border-t border-[#e6e7e4] py-4 px-0">
              <span
                className="inline-block h-4 w-4 flex-shrink-0 rounded-full bg-lime"
                aria-hidden="true"
              />
              <p className="m-0 flex-1 min-w-0 font-display text-[14px] font-medium leading-[1.2] text-ink">
                Broadway &amp; H St
              </p>
              <p className="m-0 flex-shrink-0 font-display text-[12px] font-medium leading-[1.2] uppercase tracking-[0.48px] text-[#476137]">
                Live
              </p>
            </li>

            {/* Row 3: Otay Ranch - Coming soon (muted) */}
            <li className="flex items-center gap-3.5 border-t border-[#e6e7e4] py-4 px-0">
              <span
                className="inline-block h-4 w-4 flex-shrink-0 rounded-full bg-[#c7c9c0]"
                aria-hidden="true"
              />
              <p className="m-0 flex-1 min-w-0 font-display text-[14px] font-medium leading-[1.2] text-[#a5a79e] tracking-[0.14px]">
                Otay Ranch
              </p>
              <p className="m-0 flex-shrink-0 font-display text-[12px] font-medium leading-[1.2] uppercase text-[#a5a79e]">
                Coming soon
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
