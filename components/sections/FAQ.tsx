'use client';

import { useState } from 'react';
import { REVEAL_HIDDEN, REVEAL_TRANSITION, REVEAL_VISIBLE, useRevealOnScroll } from '@/lib/hooks/useRevealOnScroll';
import { FAQ_ITEMS } from './FAQ.data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const handleCardClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumn = FAQ_ITEMS.slice(0, 8);
  const rightColumn = FAQ_ITEMS.slice(8, 15);

  return (
    <section
      id="faq"
      data-nav-bg="light"
      className="flex flex-col items-center gap-16 bg-[#f5f1e7] px-6 py-[120px] max-640:px-5 max-640:py-20"
    >
      <h2
        ref={ref}
        className={`m-0 text-center font-display text-5xl font-medium leading-tight tracking-tight text-ink max-640:whitespace-normal max-640:text-[clamp(28px,8vw,36px)] ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        Questions you might have...
      </h2>

      <div
        className={`flex w-full max-w-[1036px] flex-wrap justify-center gap-6 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
        style={{ transitionDelay: visible ? "0.1s" : "0s" }}
      >
        {/* Left column */}
        <div className="flex w-full max-w-[506px] flex-col gap-6">
          {leftColumn.map((item, index) => (
            <FAQCard
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleCardClick(index)}
              questionId={`${item.id}-question`}
            />
          ))}
        </div>

        {/* Right column */}
        <div className="flex w-full max-w-[506px] flex-col gap-6">
          {rightColumn.map((item, index) => {
            const globalIndex = 8 + index;
            return (
              <FAQCard
                key={item.id}
                item={item}
                isOpen={openIndex === globalIndex}
                onClick={() => handleCardClick(globalIndex)}
                questionId={`${item.id}-question`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface FAQCardProps {
  item: (typeof FAQ_ITEMS)[0];
  isOpen: boolean;
  onClick: () => void;
  questionId: string;
}

function FAQCard({ item, isOpen, onClick, questionId }: FAQCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[16px] bg-white ${isOpen ? 'is-open' : ''}`}
      id={item.id}
    >
      <button
        type="button"
        id={questionId}
        className="flex w-full items-center gap-10 border-none bg-none p-6 text-left font-display text-base font-medium leading-relaxed text-[#4b4d48] hover:outline-none focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
      >
        <span className="flex-1">{item.question}</span>
        <div
          className={`relative h-9 w-9 flex-shrink-0 rounded-[12px] bg-[#f4f4f5] transition-colors duration-200 hover:bg-[#ececea] ${
            isOpen ? '' : ''
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-500 ${
              isOpen ? 'rotate-45' : ''
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Horizontal bar */}
            <span
              className="absolute left-1/2 top-1/2 block h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-[1px] bg-[#4b4d48]"
              aria-hidden="true"
            />
            {/* Vertical bar */}
            <span
              className="absolute left-1/2 top-1/2 block h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 transform rounded-[1px] bg-[#4b4d48]"
              aria-hidden="true"
            />
          </div>
        </div>
      </button>

      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={questionId}
        className={`accordion-panel ${isOpen ? 'is-open' : ''}`}
      >
        <div className="accordion-panel-inner">
          <p className="m-0 p-6 pt-0 font-display text-sm font-normal leading-relaxed text-[#4b4d48]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
