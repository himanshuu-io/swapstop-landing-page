"use client";

import Image from "next/image";
import { useRef } from "react";
import { clamp01, easeInOutCubic } from "@/lib/easing";
import { useCanvasScale } from "@/lib/hooks/useCanvasScale";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { FINISH_HEADING, FINISH_HEADING_TEXT, FINISH_STEPS } from "./Finish.data";

// Ported from source lines 2746-2813 (scroll-jack IIFE). Each step gets its own "turn": a
// DWELL fraction where the panel just sits still, then the remaining fraction eases into a
// continuous fractional index.
const STEPS = FINISH_STEPS.length;
const SEG = 1 / STEPS;
const DWELL = 0.4;

function filmstripPosition(p: number): number {
  p = clamp01(p);
  const idxFloat = p / SEG;
  const i = Math.min(Math.floor(idxFloat), STEPS - 1);
  if (i >= STEPS - 1) return STEPS - 1;
  const localInSeg = idxFloat - i;
  if (localInSeg <= DWELL) return i;
  const t = (localInSeg - DWELL) / (1 - DWELL);
  return i + easeInOutCubic(clamp01(t));
}

export default function Finish() {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = isDesktop && !prefersReducedMotion;

  const progress = useScrollProgress(sectionRef, { lerpFactor: 0.11, enabled });
  const { scale, left: canvasLeft, top: canvasTop } = useCanvasScale(true);

  const pos = filmstripPosition(progress);

  if (!enabled) {
    return <FinishMobile sectionRef={sectionRef} />;
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      data-nav-bg="light"
      className="relative h-[600vh] bg-[#f5f1e7]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#f5f1e7]">
        <h2
          className="pointer-events-none absolute z-[3] m-0 font-display font-medium text-[#1a1b18]"
          style={{
            left: canvasLeft + FINISH_HEADING.left * scale,
            top: canvasTop + FINISH_HEADING.top * scale,
            width: FINISH_HEADING.width * scale,
            fontSize: FINISH_HEADING.fontSize * scale,
            lineHeight: 1.2,
            letterSpacing: "-1.28px",
          }}
        >
          {FINISH_HEADING_TEXT}
        </h2>

        {/* No overflow-hidden here: this box is only `inset-0` wide (one viewport), but
            its 5 flex children (flex: 0 0 100%, no shrink) need 5x that width — clipping
            against the box's OWN un-transformed local width would hide every panel past
            the first. The sticky ancestor above already clips visually (fixed 0-viewport
            box, never transformed), so it's the only overflow boundary needed. */}
        <div
          className="absolute inset-0 flex will-change-transform"
          style={{ transform: `translate3d(${-pos * 100}%, 0, 0)` }}
        >
          {FINISH_STEPS.map((step) => (
            <div key={step.id} className="relative h-full overflow-hidden" style={{ flex: "0 0 100%" }}>
              {/* Text lives inside the scaled 1440x1024 canvas — scales with everything else. */}
              <div
                className="absolute z-[2]"
                style={{
                  left: canvasLeft,
                  top: canvasTop,
                  width: 1440 * scale,
                  height: 1024 * scale,
                }}
              >
                <div
                  className="absolute flex flex-col items-start gap-6"
                  style={{
                    left: 96 * scale,
                    top: step.text.top * scale,
                    width: step.text.width * scale,
                  }}
                >
                  <p
                    className="m-0 font-display font-medium text-[#282825]"
                    style={{ fontSize: 96 * scale, lineHeight: 1.1, letterSpacing: `${-1.92 * scale}px` }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="m-0 font-display font-normal text-[#4b4d48]"
                    style={{ fontSize: 20 * scale, lineHeight: 1.5 }}
                  >
                    {step.desc}
                  </p>
                </div>

                {step.badge && (
                  <div
                    className="absolute flex items-center gap-2 rounded-full border border-black/10 bg-white shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.1)]"
                    style={{
                      left: step.badge.left * scale,
                      top: step.badge.top * scale,
                      width: step.badge.width * scale,
                      paddingBlock: 12 * scale,
                      paddingLeft: 15 * scale,
                      paddingRight: 16 * scale,
                      gap: 8 * scale,
                    }}
                  >
                    <Image
                      src="/images/finish-badge-checkmark.svg"
                      alt=""
                      width={48}
                      height={48}
                      quality={95}
                      style={{ width: 48 * scale, height: 48 * scale }}
                      className="flex-shrink-0"
                    />
                    <div className="flex flex-col" style={{ gap: 4 * scale }}>
                      <p
                        className="m-0 whitespace-nowrap font-display font-medium text-[#282825]"
                        style={{ fontSize: 18 * scale, lineHeight: 1.3 }}
                      >
                        {step.badge.title}
                      </p>
                      <p
                        className="m-0 font-display font-medium text-[#4b4d48]"
                        style={{ fontSize: 16 * scale, lineHeight: 1.3 }}
                      >
                        {step.badge.amount}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Images sit outside the scaled canvas, positioned via the shared canvas
                  offsets + this step's own px rect, to avoid raster blur at odd DPRs. */}
              <div
                className="absolute z-[1] overflow-hidden"
                style={{
                  top: canvasTop + step.image.top * scale,
                  left: canvasLeft + step.image.left * scale,
                  width: step.image.width * scale,
                  height: step.image.height * scale,
                  borderRadius: step.image.borderRadius
                    ? step.image.borderRadius.replace(/(\d+)px/g, (_, n) => `${Number(n) * scale}px`)
                    : undefined,
                }}
              >
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="60vw"
                />
              </div>

              {step.phoneOverlay && (
                <div
                  className="absolute z-[2] overflow-hidden shadow-[2px_4px_16px_0px_rgba(0,0,0,0.25)]"
                  style={{
                    top: canvasTop + step.phoneOverlay.top * scale,
                    left: canvasLeft + step.phoneOverlay.left * scale,
                    width: step.phoneOverlay.width * scale,
                    height: step.phoneOverlay.height * scale,
                  }}
                >
                  <Image
                    src={step.phoneOverlay.src}
                    alt={step.phoneOverlay.alt}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="30vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinishMobile({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={sectionRef}
      id="process"
      data-nav-bg="light"
      className="relative bg-[#f5f1e7] px-6 py-24 max-420:px-5 max-420:py-16"
    >
      <h2 className="m-0 mb-16 max-w-[420px] font-display text-[clamp(32px,8vw,48px)] font-medium leading-[1.2] tracking-[-0.8px] text-[#1a1b18]">
        {FINISH_HEADING_TEXT}
      </h2>

      <div className="flex flex-col gap-20">
        {FINISH_STEPS.map((step) => (
          <FinishMobileStep key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
}

function FinishMobileStep({ step }: { step: (typeof FINISH_STEPS)[number] }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 ${REVEAL_TRANSITION} ${visible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: step.mobileAspect,
          borderRadius: step.image.borderRadius ?? undefined,
        }}
      >
        <Image src={step.image.src} alt={step.image.alt} fill quality={95} className="object-cover" sizes="100vw" />
        {step.phoneOverlay && (
          <div className="absolute bottom-[4%] left-[4%] w-[38%] overflow-hidden rounded-[8px] shadow-[2px_4px_16px_0px_rgba(0,0,0,0.25)]" style={{ aspectRatio: step.phoneOverlay.width / step.phoneOverlay.height }}>
            <Image src={step.phoneOverlay.src} alt={step.phoneOverlay.alt} fill quality={95} className="object-cover" sizes="40vw" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="m-0 font-display text-[clamp(30px,8vw,48px)] font-medium leading-[1.1] tracking-[-1px] text-[#282825]">
          {step.title}
        </p>
        <p className="m-0 font-display text-[17px] font-normal leading-[1.5] text-[#4b4d48]">{step.desc}</p>
      </div>
      {step.badge && (
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white py-3 pl-[15px] pr-4 shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.1)]">
          <Image src="/images/finish-badge-checkmark.svg" alt="" width={40} height={40} quality={95} className="h-10 w-10 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="m-0 whitespace-nowrap font-display text-base font-medium leading-[1.3] text-[#282825]">
              {step.badge.title}
            </p>
            <p className="m-0 font-display text-sm font-medium leading-[1.3] text-[#4b4d48]">{step.badge.amount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
