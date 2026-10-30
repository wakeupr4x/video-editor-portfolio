import React from 'react';
import { CONTACT } from '../data/videos';

export const PixelNav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 bg-[#14141A] border-b-2 border-[#3A3A4A] px-4 py-3 select-none">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 font-pixelui text-xs">
        
        {/* Name and Role */}
        <div className="flex items-center gap-3">
          <span className="font-pixel text-sm text-[#EDECE6] tracking-tight hover:text-px-mint transition-colors">
            PUSHKAR.VERMA
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#1C1C24] border border-[#3A3A4A] text-[10px] text-px-mint">
            EDITOR
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="w-2 h-2 bg-px-mint inline-block animate-pulse" />
            <span className="hidden md:inline">{CONTACT.status}</span>
          </div>
        </div>

        {/* Essential Links */}
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-px-mint text-[#14141A] font-bold text-[11px] pixel-btn hover:bg-white"
          >
            WA: {CONTACT.phone}
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="px-2.5 py-1.5 bg-[#1C1C24] text-[#EDECE6] border-2 border-[#EDECE6] text-[11px] pixel-btn hover:text-px-peach hover:border-px-peach"
          >
            {CONTACT.email}
          </a>
        </div>

      </div>
    </nav>
  );
};
