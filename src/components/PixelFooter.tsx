import React, { useState, useEffect } from 'react';
import { CONTACT } from '../data/videos';

export const PixelFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(str);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-12 px-4 max-w-5xl mx-auto font-pixelui text-xs">
      
      {/* Contact Box */}
      <div className="pixel-box p-6 sm:p-8 mb-8">
        <div className="font-pixel text-xs text-px-mint mb-2">
          // INITIATE_CONTACT
        </div>

        <h3 className="font-pixel text-xl sm:text-2xl text-[#EDECE6] tracking-tight">
          LET'S WORK TOGETHER.
        </h3>

        <p className="font-mono text-xs text-px-muted mt-2 max-w-lg">
          Available for commercial projects, brand videos, vertical campaigns, and creative music video edits.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-px-mint text-[#14141A] font-bold pixel-btn"
          >
            [▶ CHAT ON WHATSAPP: {CONTACT.phone}]
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="px-4 py-2.5 bg-px-peach text-[#14141A] font-bold pixel-btn"
          >
            [✉ SEND EMAIL: {CONTACT.email}]
          </a>

          <button
            onClick={handleCopy}
            className="px-3 py-2.5 bg-[#14141A] text-gray-300 border border-[#3A3A4A] hover:border-px-mint"
          >
            {copied ? "[COPIED!]" : "[COPY EMAIL]"}
          </button>
        </div>
      </div>

      {/* Info Strip */}
      <div className="pt-4 border-t border-[#3A3A4A] flex flex-col sm:flex-row items-center justify-between gap-4 text-px-muted text-[11px]">
        <div>
          <span>(C) {new Date().getFullYear()} PUSHKAR VERMA // ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-4">
          <a href={CONTACT.driveUrl} target="_blank" rel="noopener noreferrer" className="text-px-mint hover:underline">
            [GOOGLE DRIVE 4K]
          </a>
          <span>IST CLOCK: {localTime || "00:00:00"}</span>
        </div>
      </div>

    </footer>
  );
};
