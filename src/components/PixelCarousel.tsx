import React, { useRef, useState } from 'react';
import { VIDEOS, CONTACT, type VideoProject } from '../data/videos';
import { PixelModal } from './PixelModal';

export const PixelCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Commercial', 'Reel', 'Music Video', 'Film'];

  const filteredVideos = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === activeCategory);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 border-t-2 border-b-2 border-[#3A3A4A] bg-[#111116] select-none">
      <div className="max-w-6xl mx-auto px-4 mb-6">
        
        {/* Header & Pixel Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#3A3A4A]">
          <div>
            <div className="font-pixel text-xs text-px-mint uppercase tracking-wider">
              // WORKS_CAROUSEL
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-[#EDECE6] mt-2">
              ALL EDITS // ORIGINAL RATIO
            </h2>
            <p className="font-mono text-xs text-px-muted mt-1">
              Widescreen (16:9) &amp; Vertical Reels (9:16) placed side-by-side with zero cropping.
            </p>
          </div>

          {/* Carousel Transport Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-500)}
              className="px-3 py-1.5 bg-[#1C1C24] border-2 border-[#3A3A4A] hover:border-px-mint text-px-mint font-pixel text-[10px] pixel-btn"
            >
              &lt; PREV
            </button>
            <button
              onClick={() => scroll(500)}
              className="px-3 py-1.5 bg-[#1C1C24] border-2 border-[#3A3A4A] hover:border-px-mint text-px-mint font-pixel text-[10px] pixel-btn"
            >
              NEXT &gt;
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-pixelui text-[11px]">
          <span className="text-px-muted mr-1">FILTER:</span>
          {categories.map((cat) => {
            const count = cat === 'All' ? VIDEOS.length : VIDEOS.filter(v => v.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 border transition-all ${
                  isActive
                    ? 'bg-px-mint text-[#14141A] font-bold border-px-mint'
                    : 'bg-[#1C1C24] text-gray-400 border-[#3A3A4A] hover:text-white'
                }`}
              >
                [{cat.toUpperCase()} ({count})]
              </button>
            );
          })}
        </div>

      </div>

      {/* Horizontal Carousel Track: All videos sit side by side in true original ratio */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto px-4 max-w-6xl mx-auto pb-4 scrollbar-thin"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {filteredVideos.map((video, idx) => {
          const isVertical = video.aspect === '9:16';
          const isHovered = hoveredId === video.id;

          return (
            <div
              key={video.id}
              className={`flex-shrink-0 flex flex-col pixel-box hover:border-px-mint transition-colors cursor-pointer ${
                isVertical
                  ? 'w-[260px] sm:w-[280px]'
                  : 'w-[440px] sm:w-[540px]'
              }`}
              style={{ scrollSnapAlign: 'start' }}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(video)}
            >
              {/* Card Titlebar */}
              <div className="px-3 py-1.5 bg-[#14141A] border-b-2 border-[#3A3A4A] flex items-center justify-between font-pixelui text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`px-1 py-0.2 text-[9px] font-bold ${
                    isVertical ? 'bg-px-peach text-[#14141A]' : 'bg-px-mint text-[#14141A]'
                  }`}>
                    {video.aspect}
                  </span>
                  <span className="text-[#EDECE6] font-bold truncate">
                    {video.title}
                  </span>
                </div>

                <span className="text-px-muted shrink-0 text-[10px]">
                  {video.duration}
                </span>
              </div>

              {/* Exact Original Ratio Video Container (Zero Cropping) */}
              <div className={`relative bg-black flex items-center justify-center overflow-hidden ${
                isVertical ? 'aspect-[9/16] h-[460px]' : 'aspect-video w-full'
              }`}>
                <video
                  src={video.videoSrc}
                  className="w-full h-full object-contain pointer-events-none"
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  ref={(el) => {
                    if (el) {
                      if (isHovered) el.play().catch(() => {});
                      else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                />

                {/* Hover Indicator */}
                {isHovered && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-px-mint text-px-mint font-pixel text-[8px]">
                    [PREVIEW]
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3 bg-[#181820] border-t-2 border-[#3A3A4A] flex items-center justify-between font-pixelui text-[11px]">
                <span className="text-px-muted font-mono">{video.tag}</span>
                <span className="text-px-mint hover:underline font-bold">[EXPAND &gt;]</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Cloud Archive Link */}
      <div className="max-w-6xl mx-auto px-4 mt-6 text-center font-pixelui text-xs">
        <a
          href={CONTACT.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-[#1C1C24] border-2 border-[#3A3A4A] text-px-mint hover:border-px-mint pixel-btn"
        >
          [📁 OPEN FULL 4K PRORES GOOGLE DRIVE ARCHIVE]
        </a>
      </div>

      {/* Minimal Pixel Modal */}
      <PixelModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

    </section>
  );
};
