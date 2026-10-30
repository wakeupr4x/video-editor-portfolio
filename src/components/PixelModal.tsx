import React, { useRef, useState, useEffect } from 'react';
import { CONTACT } from '../data/videos';
import type { VideoProject } from '../data/videos';

interface PixelModalProps {
  video: VideoProject | null;
  onClose: () => void;
}

export const PixelModal: React.FC<PixelModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [video]);

  if (!video) return null;

  const isVertical = video.aspect === '9:16';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#1C1C24] border-2 border-px-mint shadow-px-black z-10 my-auto flex flex-col overflow-hidden">
        
        {/* Titlebar */}
        <div className="px-3 py-2 bg-[#14141A] border-b-2 border-px-mint flex items-center justify-between font-pixel text-xs text-[#EDECE6]">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 bg-px-mint inline-block" />
            <span className="truncate">{video.title}</span>
          </div>

          <button
            onClick={onClose}
            className="px-2 py-0.5 bg-px-peach text-[#14141A] font-pixel text-[10px] hover:bg-white"
          >
            [X]
          </button>
        </div>

        {/* Video Screen (Preserves Original Ratio) */}
        <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={video.videoSrc}
            className={`w-full max-h-[65vh] ${isVertical ? 'object-contain aspect-[9/16]' : 'object-contain aspect-video'}`}
            playsInline
            loop
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="px-4 py-2 bg-px-mint text-[#14141A] font-pixel text-xs">
                [PAUSED]
              </div>
            </div>
          )}
        </div>

        {/* Controls and Actions */}
        <div className="p-3 bg-[#14141A] border-t-2 border-[#3A3A4A] flex flex-wrap items-center justify-between gap-3 font-pixelui text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-2.5 py-1 bg-[#1C1C24] border border-[#3A3A4A] text-px-mint hover:bg-px-mint hover:text-[#14141A]"
            >
              {isPlaying ? "[❚❚ PAUSE]" : "[▶ PLAY]"}
            </button>

            <button
              onClick={toggleMute}
              className={`px-2.5 py-1 border ${
                isMuted ? 'text-px-peach border-[#3A3A4A]' : 'text-px-mint border-px-mint'
              }`}
            >
              {isMuted ? "[SOUND: OFF]" : "[SOUND: ON]"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-px-mint text-[#14141A] font-bold"
            >
              [DISCUSS EDIT ON WHATSAPP]
            </a>

            <a
              href={CONTACT.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#1C1C24] text-[#EDECE6] border border-[#3A3A4A]"
            >
              [4K DRIVE]
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
