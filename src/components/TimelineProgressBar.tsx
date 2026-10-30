import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const TimelineProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [timecode, setTimecode] = useState("00:00:00:00");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const p = Math.min(Math.max(latest, 0), 1);
      setPercent(Math.round(p * 100));

      // Calculate simulated SMPTE timecode (24fps) over a 10-minute master timeline
      const totalFrames = Math.floor(p * 10 * 60 * 24);
      const hours = Math.floor(totalFrames / (3600 * 24)).toString().padStart(2, '0');
      const minutes = Math.floor((totalFrames % (3600 * 24)) / (60 * 24)).toString().padStart(2, '0');
      const seconds = Math.floor((totalFrames % (60 * 24)) / 24).toString().padStart(2, '0');
      const frames = (totalFrames % 24).toString().padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Glow Backing */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-gold origin-left shadow-[0_0_12px_#00F0FF]"
        style={{ scaleX }}
      />

      {/* Floating Scrubber HUD Pill */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex justify-end">
        <div className="mt-1 flex items-center gap-2 bg-[#0B0813]/90 border border-neon-cyan/20 px-2 py-0.5 rounded text-[10px] font-mono text-gray-400 backdrop-blur-md shadow-lg pointer-events-auto transition-colors hover:border-neon-cyan/60">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-neon-cyan font-semibold">{timecode}</span>
          <span className="text-gray-600">|</span>
          <span className="text-neon-pink font-semibold">{percent}%</span>
          <span className="hidden sm:inline text-gray-500 uppercase tracking-wider text-[9px]">TIMELINE TC</span>
        </div>
      </div>
    </div>
  );
};
