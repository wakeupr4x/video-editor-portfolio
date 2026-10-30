import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Maximize2, ExternalLink, Sparkles, SlidersHorizontal, Film, Volume2, Clock } from 'lucide-react';
import { VIDEO_PROJECTS, DRIVE_FOLDER_URL, type VideoProject } from '../data/videos';
import { VideoModal } from './VideoModal';

export const VideoCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const filterTabs = [
    { label: 'ALL CLIPS', category: 'All' },
    { label: 'COMMERCIALS', category: 'Commercials' },
    { label: 'VERTICAL REELS (9:16)', category: 'Short Form / Reels' },
    { label: 'MUSIC VIDEOS', category: 'Music Videos' },
    { label: 'NARRATIVE', category: 'Narrative' },
  ];

  const filteredProjects = activeFilter === 'All'
    ? VIDEO_PROJECTS
    : VIDEO_PROJECTS.filter((p) => p.category === activeFilter);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = carouselRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll, { passive: true });
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, [filteredProjects]);

  const scrollByDirection = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -650 : 650;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="carousel" className="relative py-20 bg-[#0E0E14] border-t-2 border-b-2 border-white">
      
      {/* Top Header & Carousel Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-white/20">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-brutal-yellow uppercase tracking-widest font-bold">
              <span className="w-2.5 h-2.5 bg-brutal-yellow border border-black" />
              <span>TIMELINE BIN // ORIGINAL RATIO CAROUSEL</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              Selected Works Carousel
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-300 font-body max-w-2xl">
              All clips are framed in their <span className="text-brutal-yellow font-bold underline">true original ratio</span> (widescreen 16:9 &amp; vertical 9:16 reels) with zero cropping. Hover to preview; click to expand full editorial breakdown.
            </p>
          </div>

          {/* Carousel Transport Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => scrollByDirection('left')}
              disabled={!canScrollLeft}
              className={`p-3 border-2 border-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 transition-all ${
                canScrollLeft
                  ? 'bg-black text-white hover:bg-brutal-yellow hover:text-black shadow-[3px_3px_0px_#FFF] brutal-btn'
                  : 'bg-black/40 text-gray-600 border-white/20 cursor-not-allowed'
              }`}
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">PREV CLIP</span>
            </button>

            <button
              onClick={() => scrollByDirection('right')}
              disabled={!canScrollRight}
              className={`p-3 border-2 border-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 transition-all ${
                canScrollRight
                  ? 'bg-brutal-yellow text-black border-black hover:bg-white shadow-[3px_3px_0px_#FFF] brutal-btn'
                  : 'bg-black/40 text-gray-600 border-white/20 cursor-not-allowed'
              }`}
              title="Scroll Right"
            >
              <span className="hidden sm:inline">NEXT CLIP</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-gray-400 mr-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            FILTER:
          </span>

          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.category;
            const count = tab.category === 'All'
              ? VIDEO_PROJECTS.length
              : VIDEO_PROJECTS.filter((p) => p.category === tab.category).length;

            return (
              <button
                key={tab.category}
                onClick={() => setActiveFilter(tab.category)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all ${
                  isActive
                    ? 'bg-brutal-yellow text-black border-black shadow-[2px_2px_0px_#FFF]'
                    : 'bg-black text-gray-300 border-white/20 hover:border-white hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 px-1 py-0.2 text-[10px] ${isActive ? 'bg-black text-brutal-yellow' : 'bg-white/10 text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Horizontal Carousel Track: Videos sit beside each other in original ratio */}
      <div
        ref={carouselRef}
        className="flex items-stretch gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2 scrollbar-thin scrollbar-track-black scrollbar-thumb-brutal-yellow"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {filteredProjects.map((project, idx) => {
          const isVertical = project.aspect === '9:16';
          const isHovered = hoveredVideoId === project.id;

          return (
            <div
              key={project.id}
              className={`flex-shrink-0 flex flex-col border-3 border-white bg-black shadow-[6px_6px_0px_#FFF] hover:shadow-[6px_6px_0px_#E4FC00] hover:border-brutal-yellow transition-all duration-200 cursor-pointer ${
                isVertical
                  ? 'w-[290px] sm:w-[320px]'
                  : 'w-[480px] sm:w-[620px] md:w-[700px]'
              }`}
              style={{ scrollSnapAlign: 'start' }}
              onMouseEnter={() => setHoveredVideoId(project.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              onClick={() => setSelectedProject(project)}
            >
              {/* Card NLE Track Header */}
              <div className="px-3.5 py-2 bg-[#171720] border-b-2 border-white flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 text-[10px] font-black uppercase border border-black ${
                    isVertical ? 'bg-brutal-pink text-white' : 'bg-brutal-cyan text-black'
                  }`}>
                    {project.aspect}
                  </span>
                  <span className="text-gray-300 font-bold truncate max-w-[180px] sm:max-w-[240px]">
                    {project.trackLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                  <Clock className="w-3 h-3 text-brutal-yellow" />
                  <span>{project.duration}</span>
                </div>
              </div>

              {/* Exact Original Ratio Video Container (NO CROPPING) */}
              <div className={`relative bg-black flex items-center justify-center overflow-hidden ${
                isVertical ? 'aspect-[9/16] h-[480px] sm:h-[540px]' : 'aspect-video w-full'
              }`}>
                <video
                  src={project.videoSrc}
                  className="w-full h-full object-contain pointer-events-none"
                  playsInline
                  loop
                  muted
                  autoPlay={isHovered}
                  preload="metadata"
                  ref={(el) => {
                    if (el) {
                      if (isHovered) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                />

                {/* Film Sprocket Accent on Edge */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-black/80 border-r border-white/20 flex flex-col justify-around py-2 pointer-events-none opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="w-1.5 h-2 bg-white/40 mx-auto" />
                  ))}
                </div>

                {/* Hover Play Indicator */}
                <div className={`absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="px-4 py-2 bg-brutal-yellow text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#FFF] flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    <span>EXPAND EDIT</span>
                  </div>
                </div>

                {/* Bottom Soundwave Status on Hover */}
                {isHovered && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 border border-white/30 text-[10px] font-mono text-brutal-yellow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brutal-yellow animate-pulse" />
                    <span>MUTED AUTOPLAY</span>
                  </div>
                )}
              </div>

              {/* Clip Metadata Footer */}
              <div className="p-4 bg-[#121218] border-t-2 border-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-brutal-yellow font-bold shrink-0">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-gray-400 mt-1">
                    CLIENT: <span className="text-white font-bold">{project.client}</span>
                  </p>

                  <p className="font-body text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-white/10 font-mono text-[10px]">
                  <span className="px-1.5 py-0.5 bg-black border border-white/20 text-gray-300">
                    {project.resolution}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black border border-white/20 text-gray-300">
                    {project.framerate}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black border border-white/20 text-brutal-yellow">
                    {project.codec}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Cloud Archive Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-6 bg-black border-2 border-white shadow-[6px_6px_0px_#E4FC00] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono font-bold text-xs text-brutal-yellow uppercase">
              NEED FULL 4K PRORES ASSEMBLED DELIVERABLES?
            </div>
            <div className="font-display font-black text-xl text-white mt-0.5">
              Access Pushkar’s Cloud Video Archive
            </div>
          </div>

          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-brutal-yellow text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#FFF] brutal-btn flex items-center gap-2 shrink-0"
          >
            <span>Open Google Drive Folder</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Full-bleed Video Modal */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
};
