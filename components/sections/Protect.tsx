"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clamp01, easeInOutCubic } from "@/lib/easing";
import { useCanvasScale } from "@/lib/hooks/useCanvasScale";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { PROTECT_STEPS } from "./Protect.data";

// Ported verbatim from the source's Protect IIFE (source lines 2897-3004).
const STEPS = PROTECT_STEPS.length;
const SEG = 1 / STEPS; // 0.2
const DWELL = 0.55;
const ROW_STEP = 38; // 22px label height + 16px gap, matching Figma exactly

/** Same dwell + ease architecture as Finish's filmstrip, tuned for Protect (DWELL=0.55). */
function stepPosition(p: number): number {
  p = clamp01(p);
  const idxFloat = p / SEG;
  const i = Math.min(Math.floor(idxFloat), STEPS - 1);
  if (i >= STEPS - 1) return STEPS - 1;
  const localInSeg = idxFloat - i;
  if (localInSeg <= DWELL) return i;
  const t = (localInSeg - DWELL) / (1 - DWELL);
  return i + easeInOutCubic(clamp01(t));
}

/** Inverse of stepPosition's dwell center — used for click-to-jump. */
function progressForStep(i: number): number {
  return i * SEG + SEG * DWELL * 0.5;
}

// `.btn`/`.btn-primary` from the source: transition timing is the plain CSS `ease`
// keyword, not Tailwind's `ease-in-out` curve, so it's applied via inline style below.
const CTA_CLASSES =
  "inline-flex items-center justify-center rounded-btn border border-lime bg-lime px-8 py-4 text-xl font-semibold text-forest hover:bg-[#8ade1c] active:scale-[0.97]";
const CTA_STYLE = {
  transition: "transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease",
} as const;

export default function Protect() {
  const sectionRef = useRef<HTMLElement>(null);

  // Bug fix (source gap): the source only gates the pinned scroll-jack below
  // 899.98px, with no prefers-reduced-motion guard — a desktop user with reduced
  // motion set still gets the full pinned animation. Here `enabled` also requires
  // !prefersReducedMotion, and the static fallback below covers both cases.
  const isDesktop900 = useMediaQuery("(min-width: 900px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = isDesktop900 && !prefersReducedMotion;

  const rawProgress = useScrollProgress(sectionRef, { lerpFactor: 0.14, enabled });
  const { scale } = useCanvasScale(true);

  const pos = stepPosition(rawProgress);
  const nearest = Math.round(pos);

  // Stepper icon `src` only changes when the rounded-nearest step actually changes,
  // cached in a ref so we don't restart the swap on every animation frame.
  const currentIconIdxRef = useRef(-1);
  const [stepperIconIdx, setStepperIconIdx] = useState(0);
  useEffect(() => {
    if (nearest !== currentIconIdxRef.current) {
      currentIconIdxRef.current = nearest;
      setStepperIconIdx(nearest);
    }
  }, [nearest]);

  // Source adds `.is-visible` once, on the first applyProgress(0) call, and never
  // removes it — a one-time 0->1 opacity fade-in on mount, not a scroll-driven value.
  const [iconVisible, setIconVisible] = useState(false);
  useEffect(() => {
    if (enabled) setIconVisible(true);
  }, [enabled]);

  function handleStepClick(i: number) {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const targetY = sectionTop + progressForStep(i) * total;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="protect"
      data-nav-bg="light"
      className="relative bg-[#F5F1E7]"
      style={{ height: enabled ? "600vh" : "auto" }}
    >
      {enabled ? (
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#F5F1E7]">
          <div
            className="absolute left-1/2 top-1/2 h-[1024px] w-[1440px]"
            style={{
              transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <h2 className="absolute left-[96px] top-[120px] m-0 w-[428px] font-display text-[40px] font-medium leading-[1.2] tracking-[-0.8px] text-ink">
              The process is designed to protect both sides.
            </h2>

            <div className="absolute left-[96px] top-[429px] flex items-start gap-6">
              {/* Stepper */}
              <div className="flex h-[400px] w-[400px] flex-col items-start justify-between">
                <div className="relative flex w-[168px] flex-col gap-4">
                  <div
                    className="absolute left-0 h-5 w-5 pointer-events-none"
                    style={{
                      top: pos * ROW_STEP + 1,
                      opacity: iconVisible ? 1 : 0,
                      // `top` is already smoothed by useScrollProgress's per-frame lerp — a
                      // CSS transition on top of that was a second smoothing layer fighting
                      // the first every frame, which read as stutter rather than smoothness.
                      // Only opacity (a one-time 0->1 flip on mount) gets a CSS transition.
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Image
                      src={PROTECT_STEPS[stepperIconIdx].stepperIcon}
                      alt=""
                      width={20}
                      height={20}
                      quality={95}
                      className="block h-full w-full"
                    />
                  </div>
                  {PROTECT_STEPS.map((step, i) => (
                    <button
                      key={step.stepLabel}
                      type="button"
                      data-step={i}
                      onClick={() => handleStepClick(i)}
                      className={`m-0 block h-[22px] whitespace-nowrap border-none bg-transparent p-0 pl-7 text-left font-display text-base font-normal leading-[1.4] hover:translate-x-[3px] hover:text-[#476137] focus-visible:rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-forest ${
                        i === nearest ? "text-forest" : "text-[#a5a79e]"
                      }`}
                      style={{ transition: "color 0.3s ease, transform 0.25s ease" }}
                    >
                      {step.stepLabel}
                    </button>
                  ))}
                </div>
                <a href="#get-app" className={CTA_CLASSES} style={CTA_STYLE}>
                  Get the App
                </a>
              </div>

              {/* Card */}
              <div className="relative h-[400px] w-[718px] overflow-hidden rounded-[40px] bg-[#B9DDD8] p-16">
                {PROTECT_STEPS.map((step, i) => {
                  const dist = pos - i;
                  const opacity = clamp01(1 - Math.abs(dist));
                  return (
                    <div
                      key={step.cardTitle}
                      className="absolute left-16 top-16 flex h-[calc(100%-128px)] w-[calc(100%-128px)] flex-col justify-between"
                      style={{
                        opacity,
                        transform: `translateY(${dist * 22}px)`,
                        pointerEvents: opacity > 0.5 ? "auto" : "none",
                      }}
                    >
                      <div className="h-[94px] w-[86px] animate-[protect-icon-float_4.5s_ease-in-out_infinite]">
                        <Image
                          src={step.cardIcon}
                          alt=""
                          width={86}
                          height={94}
                          quality={95}
                          className="block h-full w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-6">
                        <p className="m-0 whitespace-nowrap font-display text-[40px] font-medium leading-[1.2] tracking-[-0.8px] text-ink">
                          {step.cardTitle}
                        </p>
                        <p className="m-0 max-w-[500px] font-display text-xl font-normal leading-[1.4] text-[#4b4d48]">
                          {step.cardDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#F5F1E7] px-6 py-24">
          <h2 className="m-0 mb-12 max-w-[480px] font-display text-[clamp(28px,7vw,36px)] font-medium leading-[1.2] tracking-[-0.6px] text-ink">
            The process is designed to protect both sides.
          </h2>
          {PROTECT_STEPS.map((step) => (
            <div
              key={step.cardTitle}
              className="mb-5 flex flex-col gap-4 rounded-[28px] bg-[#B9DDD8] p-8"
            >
              <div className="h-[61px] w-14">
                <Image
                  src={step.cardIcon}
                  alt=""
                  width={56}
                  height={61}
                  quality={95}
                  className="block h-full w-full"
                />
              </div>
              <p className="m-0 font-display text-[clamp(22px,6vw,28px)] font-medium leading-[1.2] tracking-[-0.5px] text-ink">
                {step.cardTitle}
              </p>
              <p className="m-0 font-display text-base font-normal leading-[1.5] text-[#4b4d48]">
                {step.cardDesc}
              </p>
            </div>
          ))}
          <a href="#get-app" className={`mt-7 ${CTA_CLASSES}`} style={CTA_STYLE}>
            Get the App
          </a>
        </div>
      )}
    </section>
  );
}
