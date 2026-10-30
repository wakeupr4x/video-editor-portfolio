import React, { useRef, useState, useEffect } from 'react';
import { VIDEOS, type VideoItem } from '../data/videos';

export const VerticalCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false); // Unmuted by default as requested!
  const [playheadPos, setPlayheadPos] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      setPlayheadPos(progress * 100);
    }
  };

  const handleCardMouseEnter = (id: string, cardEl: HTMLDivElement | null) => {
    if (!cardEl) return;
    const video = cardEl.querySelector('video') as HTMLVideoElement | null;
    if (video) {
      video.muted = muted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlayingId(id))
          .catch(() => {
            // If browser blocks unmuted autoplay without user gesture, fallback to muted then user can click
            video.muted = true;
            video.play().then(() => setPlayingId(id)).catch(() => {});
          });
      }
    }
  };

  const handleCardMouseLeave = (id: string, cardEl: HTMLDivElement | null) => {
    if (!cardEl) return;
    const video = cardEl.querySelector('video') as HTMLVideoElement | null;
    if (video) {
      video.pause();
      if (playingId === id) setPlayingId(null);
    }
  };

  const handleToggleClick = (id: string, videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.muted = muted;
      videoEl.play().then(() => setPlayingId(id)).catch(() => {
        videoEl.muted = true;
        videoEl.play().then(() => setPlayingId(id)).catch(() => {});
      });
    } else {
      videoEl.pause();
      setPlayingId(null);
    }
  };

  return (
    <section className="w-full py-4 select-none relative">
      
      {/* NLE TIMELINE TOP HEADER & RULER */}
      <div className="w-full bg-[#181822] border-y border-white/10 mb-4 shadow-sm">
        
        {/* Timeline Sequence Control Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/80 rounded border border-white/20 text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold tracking-widest">TIMELINE_V1.SEQ</span>
            </div>

            <span className="hidden sm:inline-block text-gray-400">24.00 FPS &bull; 9:16 VERTICAL MASTER</span>
          </div>

          {/* Sound Mode & Transport Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const nextMuted = !muted;
                setMuted(nextMuted);
                // Apply to all videos
                document.querySelectorAll('video').forEach((v) => (v.muted = nextMuted));
              }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors border ${
                !muted
                  ? 'bg-[#27C93F]/20 text-[#27C93F] border-[#27C93F]/50 shadow-[0_0_10px_rgba(39,201,63,0.3)]'
                  : 'bg-red-500/20 text-red-400 border-red-500/50'
              }`}
            >
              <span>{!muted ? "🔊 AUDIO: ACTIVE (UNMUTED)" : "🔇 AUDIO: MUTED"}</span>
            </button>

            {/* Transport Arrow Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded bg-black/60 hover:bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors active:scale-95"
                title="Scroll Timeline Left"
              >
                ◀
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded bg-black/60 hover:bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors active:scale-95"
                title="Scroll Timeline Right"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* NLE Timecode Ruler with Frame Ticks */}
        <div className="relative w-full h-7 bg-[#101016] border-t border-white/10 overflow-hidden flex items-center text-[10px] font-mono text-gray-500">
          <div className="flex items-center space-x-16 px-4 w-full">
            <span>00:00:00:00</span>
            <span>00:00:15:00</span>
            <span>00:00:30:00</span>
            <span>00:00:45:00</span>
            <span>00:01:00:00</span>
            <span>00:01:15:00</span>
            <span>00:01:30:00</span>
            <span>00:01:45:00</span>
            <span>00:02:00:00</span>
          </div>

          {/* Red Playhead Line synced to scroll */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-10 transition-all duration-75 pointer-events-none"
            style={{ left: `${Math.min(98, Math.max(2, playheadPos))}%` }}
          >
            <div className="w-3 h-3 bg-red-500 transform -translate-x-1/2 rotate-45 -mt-1 shadow-md" />
          </div>
        </div>

      </div>

      {/* TIMELINE CAROUSEL TRACK (ALL 10 VIDEOS IN VERTICAL 9:16 ONLY) */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-6 overflow-x-auto px-4 sm:px-8 pb-6 pt-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {VIDEOS.map((item, idx) => {
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-[250px] sm:w-[280px] rounded-xl bg-[#161622] border-2 border-white/15 hover:border-[#00F0FF] shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col overflow-hidden group/clip"
              style={{ scrollSnapAlign: 'start' }}
              onMouseEnter={(e) => handleCardMouseEnter(item.id, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(item.id, e.currentTarget)}
            >
              {/* NLE Clip Title Header */}
              <div className="px-3 py-2 bg-[#20202E] border-b border-white/10 flex items-center justify-between font-mono text-xs text-white">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  <span className="font-bold truncate text-[11px]">{item.title}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                  V1 // 0{idx + 1}
                </span>
              </div>

              {/* VERTICAL ONLY 9:16 VIDEO CANVAS (UNMUTED BY DEFAULT) */}
              <div
                className="relative aspect-[9/16] w-full bg-black flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const target = e.currentTarget.querySelector('video');
                  handleToggleClick(item.id, target);
                }}
              >
                <video
                  src={item.videoSrc}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/clip:scale-105"
                  playsInline
                  loop
                  muted={muted}
                  preload="metadata"
                  onPlay={() => setPlayingId(item.id)}
                  onPause={() => {
                    if (playingId === item.id) setPlayingId(null);
                  }}
                />

                {/* Playing Status Overlay with Real Audio Waves */}
                {isPlaying && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono flex items-center gap-1.5 shadow-md pointer-events-none">
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-[#00F0FF] rounded-full animate-bounce" />
                      <span className="w-1 h-4 bg-[#FF007F] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1 h-2 bg-[#27C93F] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </span>
                    <span className="text-[#00F0FF] font-bold">PLAYING {!muted ? "(AUDIO ON)" : "(MUTED)"}</span>
                  </div>
                )}

                {/* Big Center Play Trigger if paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-black text-lg pl-0.5 group-hover/clip:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                )}
              </div>

              {/* Audio Track Layer (A1) Waveform Visualizer at Bottom */}
              <div className="p-2.5 bg-[#12121A] border-t border-white/10 flex flex-col gap-1.5 font-mono">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>A1 AUDIO STEREO</span>
                  <span className={!muted ? "text-[#27C93F]" : "text-gray-500"}>
                    {!muted ? "48kHz 24-bit" : "MUTED"}
                  </span>
                </div>

                {/* Simulated Audio Waveform Bars */}
                <div className="w-full h-5 bg-[#0A0A0F] rounded flex items-center justify-between px-1.5 overflow-hidden">
                  {[40, 70, 30, 85, 60, 45, 90, 75, 50, 65, 80, 55, 95, 40, 70, 85, 60, 50, 75, 90, 65, 80, 45, 60].map((h, i) => (
                    <span
                      key={i}
                      className={`w-[2px] rounded-full transition-all ${
                        isPlaying && !muted ? 'bg-[#00F0FF] animate-pulse' : 'bg-white/30'
                      }`}
                      style={{ height: `${isPlaying ? h : h * 0.5}%` }}
                    />
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
export default VerticalCarousel;
