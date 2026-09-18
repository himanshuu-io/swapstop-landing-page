'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useCanvasScale } from '@/lib/hooks/useCanvasScale';

export default function Clarity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width: 899.98px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scale, left, top } = useCanvasScale(true);

  // Fire-once IntersectionObserver for entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // For prefers-reduced-motion, set immediately without animation
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // If prefers-reduced-motion, show immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
    }
  }, [prefersReducedMotion]);

  const headingWords = [
    'Everything',
    'stays',
    'clear',
    'from',
    'start',
    'to',
    'finish.',
  ];

  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  // Desktop layout with canvas scaling and per-element animations
  if (!isMobile) {
    return (
      <section
        ref={sectionRef}
        id="clarity"
        data-nav-bg="dark"
        className={`relative min-h-screen bg-forest overflow-hidden transition-none ${
          isVisible ? 'is-visible' : ''
        }`}
        style={{
          '--cl-scale': scale,
          '--cl-canvas-left': `${left}px`,
          '--cl-canvas-top': `${top}px`,
        } as React.CSSProperties}
      >
        <div className="clarity__stage relative min-h-screen w-full overflow-hidden">
          {/* Images layer */}
          <div className="clarity__images absolute inset-0 z-1 overflow-hidden">
            {/* Locker image slot */}
            <div
              className="clarity__image-slot absolute overflow-hidden"
              style={{
                borderRadius: '200px 0 0 200px',
                top: `calc(var(--cl-canvas-top, 0px) + 475px * var(--cl-scale, 1))`,
                left: `calc(var(--cl-canvas-left, 0px) + 732px * var(--cl-scale, 1))`,
                right: 0,
                bottom: 0,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.97)',
                transition: prefersReducedMotion
                  ? 'none'
                  : `opacity 0.9s ${easing}, transform 0.9s ${easing}`,
                transitionDelay: '0.1s',
              }}
            >
              <Image
                src="/images/clarity-locker.webp"
                alt="A green SwapStop locker on a city sidewalk"
                fill
                quality={95}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Phone screenshot overlay */}
            <div
              className="clarity__phone-slot absolute overflow-hidden z-2"
              style={{
                top: `calc(var(--cl-canvas-top, 0px) + 587px * var(--cl-scale, 1))`,
                left: `calc(var(--cl-canvas-left, 0px) + 626px * var(--cl-scale, 1))`,
                width: `calc(255px * var(--cl-scale, 1))`,
                height: `calc(553px * var(--cl-scale, 1))`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.97)',
                transition: prefersReducedMotion
                  ? 'none'
                  : `opacity 0.9s ${easing}, transform 0.9s ${easing}`,
                transitionDelay: '0.18s',
              }}
            >
              <Image
                src="/images/clarity-phone.webp"
                alt="The Earnings Dashboard screen in the SwapStop app"
                fill
                quality={95}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Canvas: 1440x1024 centered and scaled */}
          <div
            className="clarity__canvas absolute z-2"
            style={{
              left: '50%',
              top: '50%',
              width: '1440px',
              height: '1024px',
              transform: `translate3d(-50%, -50%, 0) scale(var(--cl-scale, 1))`,
              transformOrigin: 'center center',
            }}
          >
            {/* Heading with per-word fade+blur+translateY delays */}
            <h2
              className="clarity__heading absolute"
              style={{
                left: '402px',
                top: '120px',
                width: '636px',
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '64px',
                lineHeight: 1.2,
                letterSpacing: '-1.28px',
                color: '#f5f1e7',
                textAlign: 'center',
              }}
            >
              {headingWords.map((word, idx) => (
                <span
                  key={idx}
                  className="clarity__heading-word inline-block"
                  style={{
                    display: 'inline-block',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(20px)',
                    filter: isVisible ? 'blur(0)' : 'blur(8px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 0.7s ${easing}, transform 0.7s ${easing}, filter 0.7s ${easing}`,
                    transitionDelay: `${idx * 0.05}s`,
                    marginRight: word === 'finish.' ? 0 : '0.25em',
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* Content: paragraphs + CTA */}
            <div
              className="clarity__content absolute flex flex-col gap-10"
              style={{
                left: '96px',
                top: '534px',
                width: '397px',
              }}
            >
              <div className="clarity__paras flex flex-col gap-6 w-full m-0">
                {/* Paragraph 1 */}
                <p
                  className="clarity__para"
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.4,
                    color: '#d4d5d2',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(24px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 0.8s ${easing}, transform 0.8s ${easing}`,
                    transitionDelay: '0.15s',
                  }}
                >
                  The SwapStop app keeps your transactions in one place, so you can see what has happened and what needs to happen next.
                </p>

                {/* Paragraph 2 */}
                <p
                  className="clarity__para"
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.4,
                    color: '#d4d5d2',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(24px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 0.8s ${easing}, transform 0.8s ${easing}`,
                    transitionDelay: '0.26s',
                  }}
                >
                  Create transactions, share them with buyers, follow payment status, receive drop-off instructions, track the handoff and keep up with completed sales.
                </p>
              </div>

              {/* CTA Button */}
              <a
                href="#get-app"
                className="btn btn-primary clarity__cta"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(20px) scale(0.96)',
                  transition: prefersReducedMotion
                    ? 'none'
                    : `opacity 0.6s ${easing}, transform 0.6s ${easing}`,
                  transitionDelay: '0.4s',
                }}
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mobile layout: stacked single-column with simpler fade+translateY
  return (
    <section
      ref={sectionRef}
      id="clarity"
      data-nav-bg="dark"
      className="bg-forest"
    >
      <div
        className="clarity__mobile"
        style={{
          padding: '96px 24px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: prefersReducedMotion
            ? 'none'
            : `opacity 0.8s ${easing}, transform 0.8s ${easing}`,
        }}
      >
        {/* Mobile Heading */}
        <h2
          className="clarity-m__heading"
          style={{
            margin: '0 0 40px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 8vw, 48px)',
            lineHeight: 1.2,
            letterSpacing: '-0.8px',
            color: '#f5f1e7',
            maxWidth: '520px',
          }}
        >
          Everything stays clear from start to finish.
        </h2>

        {/* Mobile Image — carries the phone-mockup overlay too (the desktop layout
            has one; it was missing here, per the client's report). */}
        <div
          className="clarity-m__image relative"
          style={{
            width: '100%',
            aspectRatio: '995 / 662',
            overflow: 'hidden',
            borderRadius: '12vw 12vw 0 0',
            marginBottom: '40px',
          }}
        >
          <Image
            src="/images/clarity-locker.webp"
            alt="A green SwapStop locker on a city sidewalk"
            fill
            quality={95}
            className="w-full h-full object-cover"
            priority
          />
          {/* Sized to ~20% width (not 30%) and anchored bottom-right: at 30% width
              the phone's tall aspect ratio made it nearly as tall as this short, wide
              (995x662) container, so it collided with the top rounded corners. A thin
              ring keeps it legible against the busier photo behind it. */}
          <div
            className="absolute overflow-hidden rounded-[4vw] shadow-[2px_4px_16px_0px_rgba(0,0,0,0.3)] ring-2 ring-white"
            style={{
              right: '6%',
              bottom: '6%',
              width: '20%',
              aspectRatio: '255 / 553',
            }}
          >
            <Image
              src="/images/clarity-phone.webp"
              alt="The Earnings Dashboard screen in the SwapStop app"
              fill
              quality={95}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Paragraphs */}
        <div className="clarity-m__paras flex flex-col gap-5 m-0 mb-8">
          <p
            className="clarity-m__para"
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '17px',
              lineHeight: 1.5,
              color: '#d4d5d2',
              maxWidth: '520px',
            }}
          >
            The SwapStop app keeps your transactions in one place, so you can see what has happened and what needs to happen next.
          </p>
          <p
            className="clarity-m__para"
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '17px',
              lineHeight: 1.5,
              color: '#d4d5d2',
              maxWidth: '520px',
            }}
          >
            Create transactions, share them with buyers, follow payment status, receive drop-off instructions, track the handoff and keep up with completed sales.
          </p>
        </div>

        {/* Mobile CTA Button */}
        <a href="#get-app" className="btn btn-primary">
          Get the App
        </a>
      </div>
    </section>
  );
}
