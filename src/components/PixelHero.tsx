import React, { useRef, useState } from 'react';
import { CONTACT } from '../data/videos';

export const PixelHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="pt-10 pb-12 px-4 max-w-5xl mx-auto">
      
      {/* Editorial Title Block */}
      <div className="mb-8">
        <div className="inline-block px-2 py-1 bg-[#1C1C24] border border-[#3A3A4A] text-px-mint font-pixelui text-[10px] mb-3">
          // PORTFOLIO_2026.ROM
        </div>

        <h1 className="font-pixel text-2xl sm:text-4xl text-[#EDECE6] tracking-tight leading-relaxed">
          PUSHKAR VERMA
        </h1>

        <p className="font-pixelui text-xs sm:text-sm text-px-muted mt-2">
          VIDEO EDITOR &bull; COMMERCIALS &bull; REELS &bull; MUSIC VIDEOS
        </p>

        <p className="font-mono text-xs sm:text-sm text-[#EDECE6] mt-3 max-w-xl leading-relaxed">
          Editing commercials, high-retention vertical reels, and music videos with tight pacing, audio sync, and clean color.
        </p>

        {/* Quick Contact Bar */}
        <div className="mt-5 flex flex-wrap items-center gap-3 font-pixelui text-xs">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-px-mint text-[#14141A] font-bold pixel-btn"
          >
            [▶ WHATSAPP: {CONTACT.phone}]
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="px-4 py-2 bg-px-peach text-[#14141A] font-bold pixel-btn"
          >
            [✉ {CONTACT.email}]
          </a>

          <a
            href={CONTACT.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1C1C24] text-[#EDECE6] border-2 border-[#3A3A4A] hover:border-px-mint pixel-btn"
          >
            [📁 GOOGLE DRIVE 4K]
          </a>
        </div>
      </div>

      {/* Featured Video Frame (Pixel Border, 16:9 Natural Ratio) */}
      <div className="pixel-box overflow-hidden">
        
        {/* Top Pixel Window Bar */}
        <div className="px-3 py-2 bg-[#14141A] border-b-2 border-[#3A3A4A] flex items-center justify-between font-pixelui text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-px-peach inline-block" />
            <span className="w-2.5 h-2.5 bg-px-mint inline-block" />
            <span className="text-gray-300 ml-1">FEATURED_REEL.MP4</span>
          </div>

          <div className="flex items-center gap-3 text-px-muted">
            <span className="text-px-mint">16:9 WIDESCREEN</span>
            <span>01:14</span>
          </div>
        </div>

        {/* Video Canvas */}
        <div
          className="relative aspect-video w-full bg-black cursor-pointer flex items-center justify-center overflow-hidden"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src="/videos/sls-2.mp4"
            className="w-full h-full object-contain"
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Centered Play icon if paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="px-5 py-3 bg-px-mint text-[#14141A] font-pixel text-xs pixel-btn">
                [ PLAY ]
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pixel Control Strip */}
        <div className="px-3 py-2 bg-[#14141A] border-t-2 border-[#3A3A4A] flex items-center justify-between font-pixelui text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-2.5 py-1 bg-[#1C1C24] border border-[#3A3A4A] hover:border-px-mint text-[#EDECE6]"
            >
              {isPlaying ? "[❚❚ PAUSE]" : "[▶ PLAY]"}
            </button>

            <button
              onClick={toggleMute}
              className={`px-2.5 py-1 border ${
                isMuted
                  ? 'bg-[#1C1C24] text-px-peach border-[#3A3A4A]'
                  : 'bg-px-mint text-[#14141A] border-px-mint font-bold'
              }`}
            >
              {isMuted ? "[SOUND: OFF]" : "[SOUND: ON]"}
            </button>
          </div>

          <div className="text-[11px] text-px-muted font-mono">
            MERCEDES SLS AMG // COMMERCIAL PROMO
          </div>
        </div>

      </div>

    </section>
  );
};
