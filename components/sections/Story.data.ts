// Typed constants for the Story ("how it works") scroll-jack section.
//
// Source: ~/Downloads/swapstop-full-website.html, lines 1740-1770 (markup) and
// 2551-2738 (scroll-jack IIFE).
//
// Deliberate fix vs. the source: card geometry there lives in inline
// `style="left:...px; top:...px; width:...px; height:...px;"` strings that the JS
// re-parses with `parseFloat(el.style.left)` etc. to compute drift vectors. Here it's
// plain typed data from the start — no DOM round-trip, no string parsing.

export interface StoryCard {
  /** Position/size in the 1440x1024 reference canvas (unscaled design px). */
  left: number;
  top: number;
  width: number;
  height: number;
  text: string;
  /** Speech-bubble tail side, controls which corner stays square. */
  tail: "l" | "r";
  /** `.story__card--nowrap` in the source — forces single-line text. */
  nowrap: boolean;
  /** Inline `text-align:left` override present on two of the source cards. */
  align?: "left";
}

export const CANVAS_WIDTH = 1440;
export const CANVAS_HEIGHT = 1024;

// Order matches the source's `#storyCards` children exactly (top to bottom in the DOM).
export const STORY_CARDS: StoryCard[] = [
  { left: 101, top: 239, width: 229, height: 60, text: "Is this still available?", tail: "l", nowrap: true },
  { left: 1041, top: 239, width: 219, height: 88, text: "I’m losing it. This is crazy. I give up", tail: "r", nowrap: false, align: "left" },
  { left: 1075, top: 679, width: 221, height: 88, text: "Actually can you hold it until Friday?", tail: "r", nowrap: false, align: "left" },
  { left: 626, top: 786, width: 355, height: 60, text: "Can you meet somewhere closer?", tail: "r", nowrap: false },
  { left: 193, top: 694, width: 176, height: 60, text: "I'm on my way", tail: "l", nowrap: true },
  { left: 626, top: 162, width: 198, height: 60, text: "Can you do $20?", tail: "l", nowrap: true },
  { left: 169, top: 446, width: 208, height: 60, text: "Never heard back", tail: "l", nowrap: true },
];

// ---- timeline (fractions of total scroll progress, 0..1) ----
export const LINE1_START = 0.0;
export const LINE1_END = 0.09;

export const CARDS_START = 0.06;
export const CARD_STAGGER = 0.026;
export const CARD_DURATION = 0.12;
// Pop-in order, not left-to-right — indexes into STORY_CARDS.
export const APPEAR_ORDER = [4, 0, 6, 2, 5, 1, 3];
export const JITTER = [0.01, -0.006, 0.014, -0.01, 0.006, 0.009, -0.008];

// Precomputed per-card appear-start offset (source's `cardAppearStart` array),
// derived once at module load instead of being recomputed on every frame.
export const CARD_APPEAR_START: number[] = (() => {
  const starts = new Array(STORY_CARDS.length).fill(0);
  APPEAR_ORDER.forEach((cardIdx, i) => {
    starts[cardIdx] = CARDS_START + i * CARD_STAGGER + JITTER[i];
  });
  return starts;
})();

export const CARDS_EXIT_START = 0.36; // == T2_START
export const CARDS_EXIT_END = CARDS_EXIT_START + 0.14;

// Outward drift direction for each card, from the canvas center (720, 512).
export const CARD_VECTORS: { dx: number; dy: number }[] = STORY_CARDS.map((card) => {
  const midX = card.left + card.width / 2;
  const midY = card.top + card.height / 2;
  const dx = midX - CANVAS_WIDTH / 2;
  const dy = midY - CANVAS_HEIGHT / 2;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { dx: dx / len, dy: dy / len };
});

// ---- last-word crossfade cycle ----
export const WORD_CYCLE_1 = 0.16;
export const WORD_CYCLE_2 = 0.26;
export const LAST_WORD_CYCLE = ["time.", "mental peace.", "effort."];

// ---- line 1 word list (the cycling last word is rendered separately) ----
export const LINE1_LEAD_WORDS = ["A", "simple", "sale", "can", "ask", "for", "a", "lot", "of", "your"];
// +1 accounts for the cycling last word, which participates in the same
// index-among-all-words stagger math as the lead words.
export const LINE1_TOTAL_WORDS = LINE1_LEAD_WORDS.length + 1;
export const LINE1_LAST_WORD_INDEX = LINE1_LEAD_WORDS.length; // 10

const T2_START = 0.36;
const T2_END = 0.54;
export const LINE1_FADE_END = T2_START + 0.1; // 0.46
export const LINE2_START = T2_START + 0.06; // 0.42
export const LINE2_END = T2_END; // 0.54

const T3_START = 0.68;
export const LINE2_FADE_END = T3_START + 0.1; // 0.78
export const LINE3T_START = T3_START + 0.08; // 0.76
export const LINE3T_END = LINE3T_START + 0.1; // 0.86
export const LINE3S_START = LINE3T_END + 0.02; // 0.88
export const LINE3S_END = LINE3S_START + 0.1; // 0.98

export { T2_START, T3_START };

export const LINE2_WORDS = ["There’s", "a", "better", "way."];
export const LINE3_TITLE_WORDS = ["With", "Swap", "Stop", "your", "time", "stays", "yours."];
export const LINE3_SUB_WORDS = ["No", "meeting.", "No", "coordinating.", "Just", "a", "simple", "secured", "handoff."];
