import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Scissors, MousePointer, Volume2, Monitor, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/videos';

export const NLETimelineBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [timecode, setTimecode] = useState("01:00:00:00");
  const [percent, setPercent] = useState(0);
  const [activeTool, setActiveTool] = useState<'select' | 'blade'>('select');
  const [meterLevels, setMeterLevels] = useState({ l: 65, r: 60 });

  // Simulate audio VU meter pulsation
  useEffect(() => {
    const interval = setInterval(() => {
      setMeterLevels({
        l: Math.floor(45 + Math.random() * 45),
        r: Math.floor(40 + Math.random() * 50),
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Update SMPTE timecode based on scroll position
  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      const clamped = Math.min(Math.max(p, 0), 1);
      setPercent(Math.round(clamped * 100));

      const totalFrames = Math.floor(clamped * 5 * 60 * 24); // 5-minute reel
      const hours = "01";
      const minutes = Math.floor(totalFrames / (60 * 24)).toString().padStart(2, '0');
      const seconds = Math.floor((totalFrames % (60 * 24)) / 24).toString().padStart(2, '0');
      const frames = (totalFrames % 24).toString().padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0E] border-b-2 border-white select-none">
      
      {/* Scroll Progress Playhead Line */}
      <div className="relative w-full h-[3px] bg-black">
        <div
          className="h-full bg-brutal-yellow transition-all duration-75"
          style={{ width: `${percent}%` }}
        />
        {/* Playhead marker pin */}
        <div
          className="absolute top-[-2px] w-2.5 h-2.5 bg-brutal-yellow border border-black transform -translate-x-1/2 rotate-45 pointer-events-none"
          style={{ left: `${percent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs font-mono">
        
        {/* Left: SMPTE Timecode & Project Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black border border-white/20 text-brutal-yellow font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="tracking-widest">{timecode}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-gray-400 text-[11px]">
            <span className="px-1.5 py-0.5 bg-white/10 text-white font-semibold">24.00 FPS</span>
            <span>//</span>
            <span className="text-gray-300">PRORES 422 HQ</span>
            <span>//</span>
            <span className="text-brutal-yellow font-bold">{percent}% TIMELINE</span>
          </div>
        </div>

        {/* Center: Tool Selection & Audio VU Meter */}
        <div className="hidden sm:flex items-center gap-4">
          
          {/* NLE Cut Tool Toggles */}
          <div className="flex items-center border border-white/20 bg-black p-0.5">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-1 px-2 flex items-center gap-1 transition-colors ${
                activeTool === 'select'
                  ? 'bg-brutal-yellow text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Selection Tool [V]"
            >
              <MousePointer className="w-3 h-3" />
              <span className="text-[10px]">V</span>
            </button>
            <button
              onClick={() => setActiveTool('blade')}
              className={`p-1 px-2 flex items-center gap-1 transition-colors ${
                activeTool === 'blade'
                  ? 'bg-brutal-yellow text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Razor Blade Cut Tool [C]"
            >
              <Scissors className="w-3 h-3" />
              <span className="text-[10px]">C</span>
            </button>
          </div>

          {/* Stereo Decibel Audio VU Meter */}
          <div className="flex items-center gap-2 px-2 py-1 bg-black border border-white/20">
            <Volume2 className="w-3 h-3 text-gray-400" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-gray-500 w-2">L</span>
                <div className="w-16 h-1.5 bg-gray-900 border border-white/10 overflow-hidden">
                  <div
                    className={`h-full ${
                      meterLevels.l > 80 ? 'bg-red-500' : meterLevels.l > 60 ? 'bg-brutal-yellow' : 'bg-brutal-green'
                    }`}
                    style={{ width: `${meterLevels.l}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-gray-500 w-2">R</span>
                <div className="w-16 h-1.5 bg-gray-900 border border-white/10 overflow-hidden">
                  <div
                    className={`h-full ${
                      meterLevels.r > 80 ? 'bg-red-500' : meterLevels.r > 60 ? 'bg-brutal-yellow' : 'bg-brutal-green'
                    }`}
                    style={{ width: `${meterLevels.r}%` }}
                  />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">-14 LUFS</span>
          </div>

        </div>

        {/* Right: Quick Direct Contact Links */}
        <div className="flex items-center gap-2">
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-brutal-green text-black font-bold text-[11px] border border-black brutal-btn hover:bg-white"
          >
            <Phone className="w-3 h-3" />
            <span>WA: 8269959465</span>
          </a>

          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1 bg-white text-black font-bold text-[11px] border border-black brutal-btn hover:bg-brutal-yellow"
          >
            <Mail className="w-3 h-3" />
            <span>{CONTACT_INFO.email}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
