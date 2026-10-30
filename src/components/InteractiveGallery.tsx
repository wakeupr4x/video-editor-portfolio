import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Filter, FolderGit2, ArrowUpRight, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import { VIDEO_PROJECTS, DRIVE_FOLDER_URL, type VideoProject } from '../data/videos';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

export const InteractiveGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);

  const filterCategories = [
    'All',
    'Commercials',
    'Music Videos',
    'Short Form / Reels',
    'Narrative',
  ];

  const filteredProjects = activeFilter === 'All'
    ? VIDEO_PROJECTS
    : VIDEO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00F0FF]" />
            <span className="font-mono text-xs text-neon-cyan uppercase tracking-widest font-semibold">
              FEATURED TIMELINES // SELECTED WORKS
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">Gallery</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-400 font-body max-w-xl">
            Hover any card for live low-latency preview. Click to enter distraction-free full playback with technical timeline notes.
          </p>
        </div>

        {/* Google Drive Link Quick Button */}
        <a
          href={DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17112B] border border-neon-cyan/40 text-xs font-mono text-white hover:bg-neon-cyan hover:text-black transition-all duration-200 group self-start md:self-auto shadow-md"
        >
          <FolderGit2 className="w-4 h-4 text-neon-cyan group-hover:text-black transition-colors" />
          <span>Full 4K Drive Archive</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black" />
        </a>
      </div>

      {/* Filter Tabs / Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <span className="text-xs font-mono text-gray-500 mr-2 flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          GENRE:
        </span>

        {filterCategories.map((category) => {
          const isActive = activeFilter === category;
          const count = category === 'All' 
            ? VIDEO_PROJECTS.length 
            : VIDEO_PROJECTS.filter(p => p.category === category).length;

          return (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-200 shrink-0 border ${
                isActive
                  ? 'bg-neon-cyan text-black font-bold border-white pop-shadow-pink-sm'
                  : 'bg-[#151025] text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{category}</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-black text-neon-cyan' : 'bg-white/10 text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bento / Masonry Card Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <VideoCard
              key={project.id}
              project={project}
              index={idx}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Google Drive Master Repository Callout Banner */}
      <div className="mt-14 relative rounded-2xl bg-gradient-to-r from-[#17102C] via-[#1A1235] to-[#140F26] border-2 border-neon-cyan/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan shrink-0 mt-1">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/30 text-[10px] font-mono font-bold tracking-wider mb-2">
                CLIENT DRIVE ARCHIVE
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                Looking for Uncompressed 4K Masters &amp; Long-Form Deliverables?
              </h3>
              <p className="text-sm text-gray-300 mt-1 font-body max-w-2xl">
                Browse Pushkar’s cloud video drive containing full ProRes cuts, uncompressed color test renders, and extended timeline assemblies.
              </p>
            </div>
          </div>

          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neon-cyan text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-white pop-shadow-pink hover:-translate-y-0.5 transition-all shrink-0"
          >
            <span>Open Google Drive Folder</span>
            <ArrowUpRight className="w-4 h-4" />
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
