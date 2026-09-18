// Typed step data for the Finish ("A predictable way to finish the sale") filmstrip.
//
// Source: Figma node 699:283 ("Section 5"), fileKey bhRusfgJpBP98dRYSZF4AE — fetched directly
// via get_design_context, not guessed. Every left/top/width/height below is the exact design-
// canvas (1440x1024) value from that node. This replaces an earlier hand-approximated data set
// that had steps 2-5 positioned/sized wrong (they rendered off-canvas or zero-height).

export interface FinishStep {
  id: string;
  title: string;
  desc: string;
  /** Text block position on the 1440x1024 canvas — same left (96) every step, top varies. */
  text: { top: number; width: number };
  /** Primary image slot, positioned on the canvas (not inside the scaled text canvas — see Finish.tsx). */
  image: {
    src: string;
    alt: string;
    left: number;
    top: number;
    width: number;
    height: number;
    borderRadius?: string; // full CSS value, pre-scale (e.g. "200px 200px 0 0")
  };
  /** Only step 3 (Drop off) has a second, overlaid phone-screenshot image. */
  phoneOverlay?: {
    src: string;
    alt: string;
    left: number;
    top: number;
    width: number;
    height: number;
  };
  /** Only step 5 (Payment release) has the floating confirmation badge. */
  badge?: { left: number; top: number; width: number; title: string; amount: string };
  /** Mobile-fallback image aspect ratio (width/height), so the stacked layout doesn't need JS measurement. */
  mobileAspect: number;
}

export const FINISH_HEADING_TEXT = "A predictable way to finish the sale.";
export const FINISH_HEADING = { left: 96, top: 120, width: 545, fontSize: 64 };

export const FINISH_STEPS: FinishStep[] = [
  {
    id: "create",
    title: "Create offer",
    desc: "Add the item, photos, description and price in the SwapStop app, then share the transaction with your buyer.",
    text: { top: 519, width: 363 },
    image: {
      src: "/images/finish-step1-create.webp",
      alt: "SwapStop app screen for creating an offer, held in hand",
      left: 329,
      top: 259,
      width: 1082,
      height: 810,
    },
    mobileAspect: 1082 / 810,
  },
  {
    id: "pay",
    title: "Buyer pays the amount",
    desc: "The buyer reviews the transaction and pays online. The payment is held securely until the buyer accepts the item.",
    text: { top: 520, width: 400 },
    image: {
      src: "/images/finish-step2-pay.webp",
      alt: "SwapStop app screen for paying for an item, held in hand",
      left: 558,
      top: 259,
      width: 804,
      height: 863,
    },
    mobileAspect: 804 / 863,
  },
  {
    id: "dropoff",
    title: "Drop off the item",
    desc: "Leave the item in the Swap Stop locker nearest you. Before the locker opens, the app requires you to video the item as it is placed inside.",
    text: { top: 523, width: 359 },
    image: {
      src: "/images/finish-step3-dropoff.webp",
      alt: "Person dropping an item off at a SwapStop locker",
      left: 521,
      top: 475,
      width: 823,
      height: 549,
      borderRadius: "200px 200px 0 0",
    },
    phoneOverlay: {
      src: "/images/finish-step3b-phone.webp",
      alt: "SwapStop app screen guiding a locker drop-off",
      left: 521,
      top: 593,
      width: 349,
      height: 524,
    },
    mobileAspect: 823 / 549,
  },
  {
    id: "pickup",
    title: "Buyer picks it up",
    desc: "The buyer is notified and receives the locker location and secure access credentials. They can collect the item without arranging a meeting.",
    text: { top: 512, width: 442 },
    image: {
      src: "/images/finish-step4-pickup.webp",
      alt: "Buyer collecting an item from a SwapStop locker",
      left: 626,
      top: 435,
      width: 719,
      height: 480,
      borderRadius: "200px",
    },
    mobileAspect: 719 / 480,
  },
  {
    id: "release",
    title: "Payment release",
    desc: "An eight-hour acceptance window begins after pickup. Once the buyer accepts the item, the payment is released to you.",
    text: { top: 498, width: 405 },
    image: {
      src: "/images/finish-step5-release.webp",
      alt: "Seller reviewing a completed SwapStop transaction on their phone",
      left: 450,
      top: 306,
      width: 990,
      height: 740,
    },
    badge: {
      left: 1050,
      top: 415,
      width: 251,
      title: "Payment received",
      amount: "$35.00",
    },
    mobileAspect: 990 / 740,
  },
];
