'use client';

import { useState, useEffect } from 'react';
import { useCanvasScale } from '@/lib/hooks/useCanvasScale';
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from '@/lib/hooks/useRevealOnScroll';
import LockerCell from './LockerCell';
import { LOCKER_CELLS } from './Handoff.data';

export default function Handoff() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { scale, left, top } = useCanvasScale(true);
  const { ref: revealRef, visible } = useRevealOnScroll<HTMLDivElement>();
  const { ref: mobileRevealRef, visible: mobileVisible } = useRevealOnScroll<HTMLDivElement>();

  // Handle clicks outside locker cells to close all. Both the desktop and mobile
  // banks render in the DOM at once (CSS just hides whichever doesn't match the
  // breakpoint), so this checks against a shared `data-locker-bank` attribute on
  // both containers rather than a single ref — a ref shared across two elements
  // only ever points at the last-mounted one, which broke this check for the
  // other tree.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-locker-bank]")) {
        setOpenId(null);
      }
    };

    if (openId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openId]);

  return (
    <section id="handoff" data-nav-bg="light" className="relative bg-[#f5f1e7] min-h-screen">
      {/* Desktop canvas layout */}
      <div className="relative min-h-screen w-full overflow-hidden max-899:hidden">
        <div
          ref={revealRef}
          className={`absolute w-[1440px] h-[1024px] transition-opacity duration-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: `${left}px`,
            top: `${top}px`,
            // Composed by hand (not Tailwind's translate-y utility) since this element
            // already needs an always-on transform for the shared canvas scale — a
            // second transform source (a utility class) would just overwrite this one.
            transform: `scale(${scale}) translateY(${visible ? 0 : 24}px)`,
            // `left`/`top` are pre-computed as the box's scaled top-left corner
            // (useCanvasScale centers assuming corner-origin scaling). A center
            // transform-origin scaled the box around its own middle instead, so the
            // visual position drifted away from (left, top) by more the smaller the
            // scale got — invisible at ~full desktop width, increasingly off on
            // narrower "in-between" desktop sizes. top left origin matches the offsets.
            transformOrigin: 'top left',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          {/* Heading */}
          <h2
            className="absolute m-0 font-display font-medium text-[64px] leading-[1.2] tracking-[-1.28px] text-[#1a1b18]"
            style={{
              left: '96px',
              top: '120px',
              width: '649px',
            }}
          >
            A physical handoff that does not require both people to be there.
          </h2>

          {/* Subtext */}
          <p
            className="absolute m-0 font-display font-normal text-[20px] leading-[1.4] text-[#4b4d48]"
            style={{
              left: '838px',
              top: '259px',
              width: '400px',
            }}
          >
            The SwapStop locker gives the transaction a shared physical location without requiring a shared appointment.
          </p>

          {/* Locker bank */}
          <div
            data-locker-bank
            className="absolute rounded-[16px] overflow-visible"
            style={{
              left: '96px',
              top: '477px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 196px)',
              gridAutoRows: '132px',
              gap: '8px',
              background: '#0e3200',
              padding: '8px',
            }}
          >
            {LOCKER_CELLS.map((cell) => (
              <LockerCell
                key={cell.id}
                cell={cell}
                isOpen={cell.id === openId}
                onToggle={() => {
                  setOpenId(openId === cell.id ? null : cell.id);
                }}
              />
            ))}
          </div>

          {/* Seller / Buyer + CTA */}
          <div
            className="absolute flex flex-col gap-6 items-start"
            style={{
              left: '838px',
              top: '477px',
              width: '306px',
            }}
          >
            {/* Seller */}
            <div className="flex flex-col gap-2 w-full">
              <p className="m-0 font-display font-normal text-[20px] leading-[1.4] text-[#4b4d48] whitespace-nowrap">
                Seller
              </p>
              <p className="m-0 font-display font-medium text-[40px] leading-[1.2] tracking-[-0.8px] text-[#4b4d48]">
                Deposit the item when it suits you.
              </p>
            </div>

            {/* Divider */}
            <div
              className="w-[294px] h-[1px]"
              style={{
                background: 'rgba(75, 77, 72, 0.25)',
              }}
            />

            {/* Buyer */}
            <div className="flex flex-col gap-4 w-[294px]">
              <p className="m-0 font-display font-normal text-[20px] leading-[1.4] text-[#4b4d48] whitespace-nowrap">
                Buyer
              </p>
              <p className="m-0 font-display font-medium text-[40px] leading-[1.2] tracking-[-0.8px] text-[#4b4d48]">
                Collects it when it suits them.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#get-app"
            className="btn btn-primary absolute"
            style={{
              left: '838px',
              top: '847px',
            }}
          >
            Get the App
          </a>
        </div>
      </div>

      {/* Mobile fallback layout */}
      <div
        ref={mobileRevealRef}
        className={`hidden max-899:block bg-[#f5f1e7] px-6 py-24 ${REVEAL_TRANSITION} ${
          mobileVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <h2 className="m-0 mb-6 font-display font-medium text-[clamp(32px,8vw,44px)] leading-[1.2] tracking-[-0.8px] text-[#1a1b18] max-w-[520px]">
          A physical handoff that does not require both people to be there.
        </h2>

        <p className="m-0 mb-10 font-display font-normal text-[17px] leading-[1.5] text-[#4b4d48] max-w-[520px]">
          The SwapStop locker gives the transaction a shared physical location without requiring a shared appointment.
        </p>

        {/* Mobile locker bank */}
        <div
          data-locker-bank
          className="grid grid-cols-3 w-full gap-1.5 bg-[#0e3200] p-1.5 rounded-[14px] mb-12 overflow-visible"
        >
          {LOCKER_CELLS.map((cell) => (
            <div
              key={cell.id}
              style={{
                aspectRatio: '196 / 132',
              }}
            >
              <LockerCell
                cell={cell}
                isOpen={cell.id === openId}
                onToggle={() => {
                  setOpenId(openId === cell.id ? null : cell.id);
                }}
              />
            </div>
          ))}
        </div>

        {/* Mobile parties */}
        <div className="flex flex-col gap-6 items-start mb-10">
          <div className="flex flex-col gap-2 w-full">
            <p className="m-0 font-display font-normal text-[20px] leading-[1.4] text-[#4b4d48] whitespace-nowrap">
              Seller
            </p>
            <p className="m-0 font-display font-medium text-[clamp(26px,7vw,32px)] leading-[1.2] text-[#4b4d48]">
              Deposit the item when it suits you.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="m-0 font-display font-normal text-[20px] leading-[1.4] text-[#4b4d48] whitespace-nowrap">
              Buyer
            </p>
            <p className="m-0 font-display font-medium text-[clamp(26px,7vw,32px)] leading-[1.2] text-[#4b4d48]">
              Collects it when it suits them.
            </p>
          </div>
        </div>

        <a href="#get-app" className="btn btn-primary">
          Get the App
        </a>
      </div>
    </section>
  );
}
