// Per-step content for the Protect section, ported verbatim from the source
// (~/Downloads/swapstop-full-website.html, lines 2128-2216). Order matches the
// source's `.protect__card-slide[data-step]` order (0-4), which also matches
// the `STEPPER_ICONS` array order in the source's scroll-jack IIFE.

export interface ProtectStep {
  /** Label shown on the stepper button (left column). */
  stepLabel: string;
  /** Title shown on the crossfading card (right column) — distinct copy from stepLabel. */
  cardTitle: string;
  cardDesc: string;
  /** Large icon used on the card slide / mobile fallback card. */
  cardIcon: string;
  /** Small icon used only by the sliding stepper indicator. */
  stepperIcon: string;
}

export const PROTECT_STEPS: ProtectStep[] = [
  {
    stepLabel: "Payment Protected",
    cardTitle: "Payment stays protected",
    cardDesc:
      "The buyer pays before pickup, while the payment is held securely until the item is accepted.",
    cardIcon: "/images/protect-icon-payment.svg",
    stepperIcon: "/images/protect-stepper-icon-1.svg",
  },
  {
    stepLabel: "Documented Handoffs",
    cardTitle: "The handoff is documented",
    cardDesc:
      "The seller records the item going into the locker, and pickup is recorded as part of the process.",
    cardIcon: "/images/protect-icon-handoff.svg",
    stepperIcon: "/images/protect-stepper-icon-2.svg",
  },
  {
    stepLabel: "Monitored Location",
    cardTitle: "The location is monitored",
    cardDesc:
      "The kiosk has on-site camera coverage and is located next to a 24-hour store with 24-hour camera coverage.",
    cardIcon: "/images/protect-icon-monitored.svg",
    stepperIcon: "/images/protect-stepper-icon-3.svg",
  },
  {
    stepLabel: "Secured Access",
    cardTitle: "Every item is verified",
    cardDesc:
      "Sellers can provide a unique identifier, such as a serial number, so the item can be checked if it is returned.",
    cardIcon: "/images/protect-icon-verified.svg",
    stepperIcon: "/images/protect-stepper-icon-4.svg",
  },
  {
    stepLabel: "Returns Managed",
    cardTitle: "Returns have a process",
    cardDesc:
      "If the buyer rejects the item, they return it through the locker. The seller re-verifies the item before the refund is completed.",
    cardIcon: "/images/protect-icon-returns.svg",
    stepperIcon: "/images/protect-stepper-icon-5.svg",
  },
];
