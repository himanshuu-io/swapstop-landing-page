"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { clamp01, easeInCubic, easeOutBack, easeOutCubic } from "@/lib/easing";
import { useCanvasScale } from "@/lib/hooks/useCanvasScale";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CARDS_EXIT_END,
  CARDS_EXIT_START,
  CARD_APPEAR_START,
  CARD_DURATION,
  CARD_VECTORS,
  LAST_WORD_CYCLE,
  LINE1_END,
  LINE1_FADE_END,
  LINE1_LAST_WORD_INDEX,
  LINE1_LEAD_WORDS,
  LINE1_START,
  LINE1_TOTAL_WORDS,
  LINE2_END,
  LINE2_FADE_END,
  LINE2_START,
  LINE2_WORDS,
  LINE3S_END,
  LINE3S_START,
  LINE3T_END,
  LINE3T_START,
  LINE3_SUB_WORDS,
  LINE3_TITLE_WORDS,
  STORY_CARDS,
  T2_START,
  T3_START,
  WORD_CYCLE_1,
  WORD_CYCLE_2,
} from "./Story.data";

const TITLE_CLASS = "font-display font-medium";

/** Per-word entrance style: opacity/translateY(16px->0)/blur(6px->0), staggered by the
 * word's own index among `total` words across the [start, end] window. Ported from the
 * source's `revealWords()` — written as an inline style computed fresh every frame from
 * `smoothProgress`, rather than a CSS transition, so it scrubs with scroll. */
function wordRevealStyle(p: number, start: number, end: number, index: number, total: number): CSSProperties {
  if (!total) return {};
  const span = end - start;
  const perWord = span / (total * 0.62 || 1);
  const wStart = start + (span - perWord) * (index / (total - 1 || 1));
  const local = clamp01((p - wStart) / perWord);
  const eased = easeOutCubic(local);
  return {
    display: "inline-block",
    opacity: eased,
    transform: `translateY(${(1 - eased) * 16}px)`,
    filter: `blur(${(1 - eased) * 6}px)`,
  };
}

function Words({
  words,
  progress,
  start,
  end,
  total,
}: {
  words: string[];
  progress: number;
  start: number;
  end: number;
  total?: number;
}) {
  const count = total ?? words.length;
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span style={wordRevealStyle(progress, start, end, i, count)}>{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isDesktop900 = useMediaQuery("(min-width: 900px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const scrollJackEnabled = isDesktop900 && !prefersReducedMotion;

  const progress = useScrollProgress(sectionRef, { lerpFactor: 0.14, enabled: scrollJackEnabled });
  const { scale } = useCanvasScale(false);

  // ---- discrete, transitioned last-word crossfade (real-time setTimeout, not
  // scroll-scrubbed — ported from the source's swapLastWord()). ----
  const [wordIdx, setWordIdx] = useState(0);
  const [swapPhase, setSwapPhase] = useState<"idle" | "out" | "in">("idle");
  const swapTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      swapTimers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!scrollJackEnabled) return;
    let target = 0;
    if (progress >= WORD_CYCLE_2) target = 2;
    else if (progress >= WORD_CYCLE_1) target = 1;
    if (target === wordIdx || swapPhase !== "idle") return;

    setSwapPhase("out");
    const outTimer = setTimeout(() => {
      setWordIdx(target);
      setSwapPhase("in");
      const inTimer = setTimeout(() => setSwapPhase("idle"), 240);
      swapTimers.current.push(inTimer);
    }, 220);
    swapTimers.current.push(outTimer);
  }, [progress, wordIdx, swapPhase, scrollJackEnabled]);

  if (!scrollJackEnabled) {
    // Reduced-motion or narrower-than-900px viewport: skip the scroll-jack entirely
    // and render only line 3's final resting state, in normal document flow. Typography
    // uses the source's own <=700px "decoupled from canvas scale" numbers rather than
    // the desktop canvas-scale calc, since there's no canvas/cards layer here at all.
    // A lightweight fire-once reveal (shared with every other static section) replaces
    // the desktop scroll-jack so mobile still gets *some* motion on scroll, not a static block.
    return <StoryMobile />;
  }

  // ---- sentence 1 — word-by-word entrance, whole-block exit ----
  const l1Exit = easeInCubic(clamp01((progress - T2_START) / (LINE1_FADE_END - T2_START)));
  const line1Style: CSSProperties = {
    opacity: 1 - l1Exit,
    transform: `translateY(${-l1Exit * 22}px)`,
    filter: `blur(${l1Exit * 6}px)`,
  };

  // Last word: its own scroll-driven entrance style when idle, overridden by the
  // real-time crossfade style while a swap is in flight (mirrors the source's
  // `skipEl` guard so the two animation systems never fight over the same frame).
  const swapping = swapPhase !== "idle";
  const lastWordStyle: CSSProperties = swapping
    ? {
        display: "inline-block",
        transition: "opacity .22s ease, transform .22s ease, filter .22s ease",
        opacity: swapPhase === "out" ? 0 : 1,
        transform: swapPhase === "out" ? "translateY(-14px)" : "translateY(0)",
        filter: swapPhase === "out" ? "blur(8px)" : "blur(0px)",
      }
    : wordRevealStyle(progress, LINE1_START, LINE1_END, LINE1_LAST_WORD_INDEX, LINE1_TOTAL_WORDS);

  // ---- sentence 2 — word-by-word entrance, whole-block exit ----
  const l2Exit = easeInCubic(clamp01((progress - T3_START) / (LINE2_FADE_END - T3_START)));
  const line2Style: CSSProperties = {
    opacity: 1 - l2Exit,
    transform: `translateY(${-l2Exit * 22}px)`,
    filter: `blur(${l2Exit * 6}px)`,
  };

  // Headline type reads the same --canvas-scale-equivalent `scale` value that positions
  // the cards, so the two layers can never drift out of sync.
  const titleBaseStyle: CSSProperties = {
    margin: 0,
    fontSize: `${64 * scale}px`,
    lineHeight: 1.2,
    letterSpacing: `${-1.28 * scale}px`,
    color: "#F5F1E7",
    textAlign: "center",
  };

  return (
    <section id="how-it-works" data-nav-bg="dark" ref={sectionRef} className="relative h-[480vh] bg-[#151914]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#151914]">
        {/* Decorative chat-bubble cards, laid out on an exact 1440x1024 canvas and scaled
            as a whole, so every card keeps its exact relative position at any screen size. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1]"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {STORY_CARDS.map((card, i) => {
            const aLocal = clamp01((progress - CARD_APPEAR_START[i]) / CARD_DURATION);
            const aOpacity = easeOutCubic(aLocal);
            const aScale = 0.7 + 0.3 * easeOutBack(aLocal);
            const eLocal = easeInCubic(clamp01((progress - CARDS_EXIT_START) / (CARDS_EXIT_END - CARDS_EXIT_START)));
            const drift = eLocal * 160;
            const vec = CARD_VECTORS[i];

            return (
              <div
                key={i}
                className="absolute flex items-center justify-center bg-forest font-display font-normal text-white"
                style={{
                  left: card.left,
                  top: card.top,
                  width: card.width,
                  height: card.height,
                  fontSize: 20,
                  lineHeight: 1.4,
                  padding: "16px 24px",
                  textAlign: card.align ?? "center",
                  whiteSpace: card.nowrap ? "nowrap" : undefined,
                  borderRadius: card.tail === "l" ? "20px 20px 20px 0" : "20px 20px 0 20px",
                  willChange: "transform, opacity",
                  opacity: aOpacity * (1 - eLocal),
                  transform: `translate3d(${vec.dx * drift}px, ${vec.dy * drift}px, 0) scale(${aScale * (1 - 0.18 * eLocal)})`,
                }}
              >
                {card.text}
              </div>
            );
          })}
        </div>

        {/* Each "line" (sentence) sits stacked exactly on top of the others — visibility
            is purely opacity/transform driven, occupying the same centered spot. */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center px-8">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7" style={line1Style}>
            <h2 className={TITLE_CLASS} style={{ ...titleBaseStyle, maxWidth: `${620 * scale}px` }}>
              <Words words={LINE1_LEAD_WORDS} progress={progress} start={LINE1_START} end={LINE1_END} total={LINE1_TOTAL_WORDS} />
              <br />
              <span style={lastWordStyle}>{LAST_WORD_CYCLE[wordIdx]}</span>
            </h2>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7" style={line2Style}>
            <h2 className={TITLE_CLASS} style={{ ...titleBaseStyle, whiteSpace: "nowrap" }}>
              <Words words={LINE2_WORDS} progress={progress} start={LINE2_START} end={LINE2_END} />
            </h2>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: `${28 * scale}px` }}>
            <p className={TITLE_CLASS} style={{ ...titleBaseStyle, maxWidth: `${700 * scale}px` }}>
              <Words words={LINE3_TITLE_WORDS} progress={progress} start={LINE3T_START} end={LINE3T_END} />
            </p>
            <p className={TITLE_CLASS} style={{ ...titleBaseStyle, maxWidth: `${700 * scale}px`, color: "rgba(245, 241, 231, 0.6)" }}>
              <Words words={LINE3_SUB_WORDS} progress={progress} start={LINE3S_START} end={LINE3S_END} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryMobile() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <section id="how-it-works" data-nav-bg="dark" className="relative bg-[#151914] px-6 py-[140px]">
      <div
        ref={ref}
        className={`mx-auto flex max-w-[90vw] flex-col items-center gap-4 text-center ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p
          className={TITLE_CLASS}
          style={{ margin: 0, fontSize: "clamp(26px, 8.5vw, 40px)", letterSpacing: "-0.6px", lineHeight: 1.2, color: "#F5F1E7" }}
        >
          With Swap Stop your time stays yours.
        </p>
        <p
          className={TITLE_CLASS}
          style={{
            margin: 0,
            fontSize: "clamp(26px, 8.5vw, 40px)",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            color: "rgba(245, 241, 231, 0.6)",
          }}
        >
          No meeting. No coordinating. Just a simple secured handoff.
        </p>
      </div>
    </section>
  );
}
