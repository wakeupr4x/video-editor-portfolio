import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2, Sparkles, Clock, Film } from 'lucide-react';
import type { VideoProject } from '../data/videos';

interface VideoCardProps {
  project: VideoProject;
  onClick: (project: VideoProject) => void;
  index: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({ project, onClick, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Determine bento grid sizing based on index and aspect
  const isLarge = project.featured && (index === 0 || index === 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#140F24] border-2 transition-all duration-300 ${
        isHovered
          ? 'border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.35)] -translate-y-1.5 scale-[1.02]'
          : 'border-white/[0.08] hover:border-white/20'
      } ${isLarge ? 'md:col-span-2' : 'col-span-1'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Video Canvas Container */}
      <div className={`relative w-full overflow-hidden bg-black ${project.aspect === '9:16' && !isLarge ? 'aspect-[9/14]' : 'aspect-video'}`}>
        <video
          ref={videoRef}
          src={project.videoSrc}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loop
          muted
          playsInline
          preload="metadata"
        />

        {/* Halftone Dot Overlay on Hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'halftone-overlay opacity-40' : 'opacity-0'
          }`}
        />

        {/* Top Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-[#0B0813]/80 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-wider text-neon-cyan uppercase font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
            {project.category}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-[#0B0813]/80 border border-white/15 backdrop-blur-md text-[10px] font-mono text-gray-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-neon-pink" />
            {project.duration}
          </span>
        </div>

        {/* Hover Center Indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            isHovered ? 'opacity-100 bg-black/25' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0813]/90 border border-neon-cyan text-neon-cyan font-mono text-xs font-bold shadow-[0_0_20px_#00F0FF] backdrop-blur-md transform transition-transform group-hover:scale-105">
            <Maximize2 className="w-3.5 h-3.5 text-neon-pink" />
            <span>PLAY FULL EDIT</span>
          </div>
        </div>

        {/* Bottom Audio/Playback Wave Equalizer on Hover */}
        {isPlaying && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded bg-black/70 border border-white/10 backdrop-blur-sm pointer-events-none">
            <span className="w-1 h-3 bg-neon-cyan animate-pulse" />
            <span className="w-1 h-4 bg-neon-pink animate-pulse" style={{ animationDelay: '0.15s' }} />
            <span className="w-1 h-2 bg-neon-gold animate-pulse" style={{ animationDelay: '0.3s' }} />
            <span className="text-[10px] font-mono text-gray-300 ml-1">MUTED PREVIEW</span>
          </div>
        )}
      </div>

      {/* Card Info Drawer */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-[#140F24] to-[#100C1D]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-neon-cyan transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-gray-400 mt-1 flex items-center gap-1.5">
              <span>Client:</span>
              <span className="text-gray-200 font-medium">{project.client}</span>
            </p>
          </div>

          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-neon-pink group-hover:text-white group-hover:border-neon-pink transition-all shrink-0">
            <Play className="w-3 h-3 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Software Toolset Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
          {project.tools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-gray-300"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="text-[10px] font-mono text-gray-500">
              +{project.tools.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
