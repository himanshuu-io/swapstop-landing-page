'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LockerCell as LockerCellType } from './Handoff.data';

interface LockerCellProps {
  cell: LockerCellType;
  isOpen: boolean;
  onToggle: () => void;
}

export default function LockerCell({ cell, isOpen, onToggle }: LockerCellProps) {
  const isTexture = cell.image?.isTexture;
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 899.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: hover reveals the interior, no click needed. Mobile/touch: hover doesn't
  // apply (checkMobile gates it out), so tap-to-toggle (isOpen, from Handoff's click
  // state) is the only way in. Both can be true at once with no conflict.
  const effectiveOpen = isOpen || (!isMobile && isHovering);

  return (
    <div
      className={`relative h-full w-full rounded-[8px] ${effectiveOpen ? 'z-[5]' : ''}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interior background */}
      <div
        className="absolute inset-0 rounded-[8px] flex flex-col items-center justify-center gap-2 text-center p-2.5 overflow-hidden"
        style={{
          background: '#0a2400',
        }}
      >
        {/* Interior photo */}
        {cell.image && isTexture ? (
          // Texture image with custom positioning
          <img
            src={cell.image.src}
            alt={cell.image.alt}
            className="absolute"
            style={{
              left: '-6.4%',
              top: '-3.25%',
              width: '113.02%',
              height: '116.06%',
              objectFit: 'fill',
              opacity: effectiveOpen ? 1 : 0,
              transition: 'opacity 0.4s ease 0.14s',
            }}
          />
        ) : cell.image ? (
          // Regular item photo
          <Image
            src={cell.image.src}
            alt={cell.image.alt}
            fill
            quality={95}
            className="absolute w-full h-full"
            style={{
              objectFit: 'cover',
              opacity: effectiveOpen ? 1 : 0,
              transition: 'opacity 0.4s ease 0.14s',
            }}
          />
        ) : null}
      </div>

      {/* Door button */}
      <button
        type="button"
        onClick={onToggle}
        className={`absolute inset-0 w-full h-full rounded-[8px] overflow-hidden cursor-pointer border-none`}
        style={{
          background: '#aef052',
          transformOrigin: 'left center',
          transform: effectiveOpen ? 'rotateY(-105deg)' : 'rotateY(0deg)',
          transition: `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease`,
          boxShadow: effectiveOpen ? '20px 10px 28px rgba(0, 0, 0, 0.38)' : 'none',
          zIndex: 2,
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #f5f1e7';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        aria-label={`Locker ${cell.id}. ${isMobile ? 'Tap' : 'Hover or focus'} to peek inside.`}
      >
        {/* Locker ID label */}
        <span
          className="absolute font-mono font-medium whitespace-nowrap pointer-events-none"
          style={{
            fontSize: isMobile ? '7px' : '10px',
            letterSpacing: isMobile ? '1px' : '1.6px',
            left: '6.12%',
            top: '80.3%',
            color: '#4a4d47',
          }}
        >
          {cell.id}
        </span>

        {/* Door handle */}
        <span
          className="absolute pointer-events-none"
          style={{
            left: '88.8%',
            top: '37.1%',
            width: isMobile ? '3px' : '5px',
            height: isMobile ? '16px' : '34px',
            borderRadius: '3px',
            background: '#898b83',
          }}
        />
      </button>
    </div>
  );
}
