import React, { useState } from 'react';
import { CONTACT } from './data/videos';
import { VerticalCarousel } from './components/VerticalCarousel';
import { SplashCursor } from './components/SplashCursor';
import { TechButton } from './components/TechButton';

export function App() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07070C] text-white flex flex-col items-center justify-center p-2 sm:p-6 md:p-10 relative overflow-hidden select-none">
      
      {/* Exact Fluid Splash Cursor requested by user */}
      <SplashCursor
        rainbow
        size={1}
        force={1}
        swirl={3}
        trail={1}
        clickSplash
      />

      {/* 3D Headphone Graphic with Low Opacity on Background (floating 3D effect) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="relative w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] md:w-[950px] md:h-[950px] opacity-15 mix-blend-screen transition-transform duration-1000 ease-out"
          style={{
            transform: 'perspective(1000px) rotateX(12deg) rotateY(-8deg) rotateZ(-3deg) scale(1.05)',
            filter: 'drop-shadow(0 20px 40px rgba(0, 240, 255, 0.25))'
          }}
        >
          <img
            src="/assets/headphone_3d.jpg"
            alt="3D Studio Headphones"
            className="w-full h-full object-contain filter contrast-125 brightness-110"
          />
        </div>
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#25358b]/15 via-[#00F0FF]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* MAC WINDOW CONTAINER WITH THREE TOP-LEFT BUTTONS */}
      {/* ============================================================ */}
      <div className="w-full max-w-[1400px] rounded-2xl bg-[#0f0f17]/95 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(37,53,139,0.2)] backdrop-blur-xl flex flex-col z-10 overflow-hidden relative">
        
        {/* MAC OS WINDOW TITLEBAR */}
        <div className="h-11 bg-gradient-to-b from-[#1c1c28] to-[#14141e] border-b border-white/10 px-4 flex items-center justify-between select-none">
          
          {/* Top-Left Mac Traffic Lights */}
          <div className="flex items-center gap-2">
            {/* Close Button */}
            <button 
              type="button"
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer"
              title="Close"
              aria-label="Close Window"
            >
              <span className="text-[8px] font-bold text-black/60 opacity-0 group-hover:opacity-100 leading-none">✕</span>
            </button>
            {/* Minimize Button */}
            <button 
              type="button"
              className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer"
              title="Minimize"
              aria-label="Minimize Window"
            >
              <span className="text-[8px] font-bold text-black/60 opacity-0 group-hover:opacity-100 leading-none">−</span>
            </button>
            {/* Expand / Fullscreen Button */}
            <button 
              type="button"
              className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer"
              title="Fullscreen"
              aria-label="Maximize Window"
            >
              <span className="text-[7px] font-bold text-black/60 opacity-0 group-hover:opacity-100 leading-none">▲</span>
            </button>
          </div>

          {/* Centered Mac Window Title */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-300 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-semibold text-white">Pushkar Verma</span>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400 hidden sm:inline">Timeline Sequence Master &bull; 9:16 Vertical Cut</span>
          </div>

          {/* Top-Right Mac Window Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#00F0FF]">
              4K ProRes
            </span>
          </div>

        </div>

        {/* WINDOW HEADER: IDENTITY & TECH BUTTON CONTACTS */}
        <header className="px-6 py-6 border-b border-white/5 bg-[#12121b]/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                Pushkar Verma
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-[#25358b]/40 border border-[#25358b] text-[#00F0FF] text-xs font-mono font-bold tracking-wider">
                VIDEO EDITOR
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
              Hover over any timeline clip to preview unmuted audio &bull; Reels, Commercials &amp; Visuals
            </p>
          </div>

          {/* USER'S EXACT BUTTON STYLE INTEGRATION */}
          <div className="flex flex-wrap items-center gap-4">
            {/* WhatsApp */}
            <TechButton
              text={`WhatsApp: ${CONTACT.phone}`}
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            />

            {/* Email */}
            <TechButton
              text={copied ? "Copied! ✨" : `Email: ${CONTACT.email}`}
              onClick={handleCopyEmail}
            />

            {/* 4K Drive Archive */}
            <TechButton
              text="4K Google Drive"
              href={CONTACT.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </header>

        {/* NLE TIMELINE CAROUSEL (VERTICAL 9:16 ONLY, UNMUTED BY DEFAULT) */}
        <main className="flex-1 flex flex-col justify-center bg-[#0d0d14]/70">
          <VerticalCarousel />
        </main>

        {/* WINDOW FOOTER: MINIMAL STUDIO STATUS BAR */}
        <footer className="px-6 py-3.5 bg-[#111119] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#27C93F] inline-block animate-pulse" />
            <span className="text-gray-300">Pushkar Verma</span>
            <span className="text-gray-600">&bull;</span>
            <span className="text-gray-400">Open for Freelance &amp; Contract Edits</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={`mailto:${CONTACT.email}`} 
              className="text-gray-300 hover:text-[#00F0FF] transition-colors"
            >
              {CONTACT.email}
            </a>
            <span className="text-gray-600">&bull;</span>
            <a 
              href={CONTACT.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#00F0FF] transition-colors"
            >
              +91 {CONTACT.phone}
            </a>
          </div>
        </footer>

      </div>

    </div>
  );
}

export default App;
