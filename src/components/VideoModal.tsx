import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Activity, Palette, Volume1, Layers, MessageSquare, Mail } from 'lucide-react';
import { CONTACT_INFO, DRIVE_FOLDER_URL } from '../data/videos';
import type { VideoProject } from '../data/videos';

interface VideoModalProps {
  project: VideoProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === 'm' && videoRef.current) {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [project]);

  if (!project) return null;

  const isVertical = project.aspect === '9:16';

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatSMPTE = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    const f = Math.floor((secs % 1) * 24).toString().padStart(2, '0');
    return `00:${m}:${s}:${f}`;
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      {/* Backdrop Click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#121218] border-3 border-white shadow-[10px_10px_0px_#E4FC00] overflow-hidden z-10 my-auto flex flex-col">
        
        {/* Top Titlebar */}
        <div className="px-4 py-3 bg-black border-b-2 border-white flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brutal-yellow border border-black" />
            <span className="text-white font-bold tracking-wider">
              INSPECTOR // <span className="text-brutal-yellow">{project.title}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 bg-white text-black font-bold hover:bg-brutal-yellow border border-black"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container (Adjusts for 16:9 or 9:16 with zero cropping!) */}
        <div className="relative bg-black flex items-center justify-center cursor-pointer min-h-[300px] max-h-[65vh] overflow-hidden" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={project.videoSrc}
            className={`w-full max-h-[65vh] ${isVertical ? 'object-contain aspect-[9/16]' : 'object-contain aspect-video'}`}
            playsInline
            loop
            muted={isMuted}
            onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
            onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-brutal-yellow text-black flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#FFF]">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Transport Scrubber */}
        <div className="px-4 py-3 bg-[#181822] border-t-2 border-b-2 border-white flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-brutal-yellow font-bold tracking-wider">{formatSMPTE(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.0416}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-black border border-white/40 appearance-none cursor-pointer accent-brutal-yellow"
            />
            <span className="text-gray-400">{formatSMPTE(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-2.5 py-1 bg-brutal-yellow text-black font-bold border border-black hover:bg-white"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className={`p-1 border ${
                  isMuted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-black border-white/30 text-white'
                }`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <span className="hidden sm:inline text-[11px] text-gray-400">
                SHORTCUTS: <kbd className="px-1 bg-black border border-white/20">SPACE</kbd> PLAY/PAUSE &bull; <kbd className="px-1 bg-black border border-white/20">M</kbd> MUTE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-black text-brutal-yellow font-bold border border-brutal-yellow hover:bg-brutal-yellow hover:text-black flex items-center gap-1.5"
              >
                <span>4K Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={handleFullscreen}
                className="p-1 bg-black border border-white/30 text-white hover:bg-white hover:text-black"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Technical Inspector Breakdown */}
        <div className="p-5 bg-[#0E0E14] max-h-[30vh] overflow-y-auto space-y-4 font-mono text-xs">
          
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-brutal-yellow font-bold uppercase">{project.category}</span>
              <h3 className="font-display font-black text-xl text-white uppercase">{project.title}</h3>
              <p className="text-gray-400">CLIENT: {project.client}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-brutal-green text-black font-bold border border-black flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss Edit</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-black border border-white/20">
              <div className="flex items-center gap-1.5 text-brutal-yellow font-bold mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>PACING ARCHITECTURE</span>
              </div>
              <p className="text-gray-300 font-body text-xs">{project.storyPacing}</p>
            </div>

            <div className="p-3 bg-black border border-white/20">
              <div className="flex items-center gap-1.5 text-brutal-cyan font-bold mb-1">
                <Palette className="w-3.5 h-3.5" />
                <span>COLOR &amp; ACES PRINT</span>
              </div>
              <p className="text-gray-300 font-body text-xs">{project.colorGrade}</p>
            </div>

            <div className="p-3 bg-black border border-white/20">
              <div className="flex items-center gap-1.5 text-brutal-pink font-bold mb-1">
                <Volume1 className="w-3.5 h-3.5" />
                <span>SOUND DESIGN FOLEY</span>
              </div>
              <p className="text-gray-300 font-body text-xs">{project.soundDesign}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
            <span className="text-gray-400 mr-2">TOOLSET:</span>
            {project.tools.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-black border border-white/30 text-white font-bold">
                {t}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
