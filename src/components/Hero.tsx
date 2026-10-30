import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Sliders, ExternalLink, MessageSquare, Mail } from 'lucide-react';
import { CONTACT_INFO, DRIVE_FOLDER_URL } from '../data/videos';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(74);
  const [lutActive, setLutActive] = useState(true);

  const [activeReel, setActiveReel] = useState({
    title: "MERCEDES SLS // CHROME APEX",
    src: "/videos/sls-2.mp4",
    client: "Silver Arrow Automotive",
    format: "16:9 Widescreen // 4K ProRes"
  });

  const reelPresets = [
    { title: "MERCEDES SLS", src: "/videos/sls-2.mp4", client: "Automotive", format: "16:9 4K" },
    { title: "DARK SYNDICATE", src: "/videos/DS PROMO-2.mp4", client: "Cyberpunk", format: "16:9 4K" },
    { title: "OCTAGON UFC", src: "/videos/UFC.mp4", client: "Sports Trailer", format: "16:9 4K" },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration || 74);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [activeReel]);

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

  const stepFrame = (frames: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + (frames / 24));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatSMPTE = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    const f = Math.floor((secs % 1) * 24).toString().padStart(2, '0');
    return `00:${m}:${s}:${f}`;
  };

  return (
    <section id="showreel" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Headline Block */}
      <div className="mb-10 border-b-2 border-white pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brutal-yellow text-black font-mono font-bold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#FFF]">
            <span>NLE SUITE // 2026 REEL ARCHIVE</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
            <span>DIRECT CONTACT:</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-brutal-yellow underline hover:text-white">
              {CONTACT_INFO.email}
            </a>
            <span>//</span>
            <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brutal-green underline hover:text-white">
              WA: {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.98]">
          Crafting High-Octane Visuals, Pacing &amp; Motion.
        </h1>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-base sm:text-lg text-gray-300 font-body max-w-2xl leading-relaxed">
            Pushkar Verma is a lead post-production video editor &amp; colorist shaping commercial campaigns, music videos, and viral reels with rhythmic kinetic cuts, ACES color science, and surgical sound foley.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#carousel"
              className="px-5 py-3 bg-brutal-yellow text-black font-mono font-black text-xs uppercase border-2 border-white shadow-[4px_4px_0px_#FFF] brutal-btn"
            >
              Watch Video Carousel &darr;
            </a>

            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-black text-white font-mono font-bold text-xs uppercase border-2 border-white shadow-[4px_4px_0px_#E4FC00] brutal-btn hover:bg-brutal-yellow hover:text-black flex items-center gap-1.5"
            >
              <span>4K Master Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Studio NLE Showreel Viewport */}
      <div className="border-3 border-white bg-black shadow-[8px_8px_0px_#E4FC00] overflow-hidden">
        
        {/* NLE Monitor Top Header Bar */}
        <div className="px-4 py-2.5 bg-[#121218] border-b-2 border-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-500 border border-black" />
              <span className="w-3 h-3 bg-yellow-400 border border-black" />
              <span className="w-3 h-3 bg-green-500 border border-black" />
            </div>
            <span className="text-gray-400 font-bold">MONITOR 01:</span>
            <span className="text-brutal-yellow font-bold uppercase">{activeReel.title}</span>
          </div>

          {/* Quick Clip Preset Buttons */}
          <div className="flex items-center gap-1">
            {reelPresets.map((preset) => (
              <button
                key={preset.src}
                onClick={() => {
                  setActiveReel(preset);
                  setIsPlaying(true);
                  setTimeout(() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play().catch(() => {});
                    }
                  }, 50);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase border ${
                  activeReel.src === preset.src
                    ? 'bg-brutal-yellow text-black border-black shadow-[2px_2px_0px_#FFF]'
                    : 'bg-black text-gray-400 border-white/20 hover:text-white hover:border-white'
                }`}
              >
                {preset.title}
              </button>
            ))}
          </div>

          {/* LUT / Color Profile Toggle */}
          <button
            onClick={() => setLutActive(!lutActive)}
            className={`px-2 py-1 flex items-center gap-1.5 font-mono text-[11px] font-bold border transition-all ${
              lutActive
                ? 'bg-brutal-cyan text-black border-black'
                : 'bg-black text-gray-400 border-white/20'
            }`}
            title="Toggle ACES LUT Preview"
          >
            <Sliders className="w-3 h-3" />
            <span>LUT: {lutActive ? "KODAK 2383 [ON]" : "RAW LOG [OFF]"}</span>
          </button>
        </div>

        {/* Video Canvas Container (16:9 Natural Ratio) */}
        <div
          className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={activeReel.src}
            className={`w-full h-full object-contain transition-all duration-300 ${
              lutActive ? 'contrast-[1.08] saturate-[1.05]' : 'contrast-[0.88] saturate-[0.75] brightness-[1.06]'
            }`}
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Play/Pause Overlay Icon if paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-20 h-20 bg-brutal-yellow text-black flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_#FFF] brutal-btn">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Film Frame Guides & Watermark */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-black/90 border border-white/30 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold">REC ● PLAYBACK</span>
            <span className="text-gray-400">|</span>
            <span className="text-brutal-yellow font-bold">{activeReel.format}</span>
          </div>
        </div>

        {/* NLE Transport Bar */}
        <div className="p-3 sm:p-4 bg-[#121218] border-t-2 border-white flex flex-col gap-3 font-mono">
          
          {/* Timecode Scrubber Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-brutal-yellow font-bold tracking-widest min-w-[85px]">
              {formatSMPTE(currentTime)}
            </span>

            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.0416}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-black border border-white/30 rounded-none appearance-none cursor-pointer accent-brutal-yellow"
              />
            </div>

            <span className="text-xs text-gray-400 min-w-[85px] text-right">
              {formatSMPTE(duration)}
            </span>
          </div>

          {/* Bottom Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            
            {/* Playback Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => stepFrame(-1)}
                className="p-1.5 bg-black border border-white/30 text-white hover:bg-brutal-yellow hover:text-black hover:border-black"
                title="Previous Frame (Left Arrow)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="px-3 py-1.5 bg-brutal-yellow text-black font-black text-xs border border-black shadow-[2px_2px_0px_#FFF] flex items-center gap-1.5 brutal-btn"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? "PAUSE [SPACE]" : "PLAY [SPACE]"}</span>
              </button>

              <button
                onClick={() => stepFrame(1)}
                className="p-1.5 bg-black border border-white/30 text-white hover:bg-brutal-yellow hover:text-black hover:border-black"
                title="Next Frame (Right Arrow)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                className={`p-1.5 border ${
                  isMuted
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-black border-white/30 text-white hover:border-brutal-yellow hover:text-brutal-yellow'
                }`}
                title={isMuted ? "Unmute [M]" : "Mute [M]"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Right: Technical Inspector info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-400">
                <span className="px-1.5 py-0.5 bg-black border border-white/20 text-white">4K UHD</span>
                <span className="px-1.5 py-0.5 bg-black border border-white/20 text-white">24.00 FPS</span>
                <span className="px-1.5 py-0.5 bg-black border border-white/20 text-brutal-yellow">PRORES 422 HQ</span>
              </div>

              <button
                onClick={handleFullscreen}
                className="p-1.5 bg-black border border-white/30 text-white hover:bg-white hover:text-black"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Raw Studio Production Numbers (Neobrutalist Blocks) */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: "45M+", label: "TOTAL VIEWS", desc: "YouTube & Commercial Campaigns" },
          { num: "180+", label: "MASTER DELIVERIES", desc: "Films, Commercials & Music Videos" },
          { num: "100%", label: "AUDIO SYNC", desc: "Surgical Transient Foley & Mastering" },
          { num: "<24H", label: "SPRINT READY", desc: "Fast-Paced Editorial Turnaround" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 bg-[#121218] border-2 border-white shadow-[4px_4px_0px_#E4FC00] flex flex-col justify-between"
          >
            <div className="font-display font-black text-3xl sm:text-4xl text-brutal-yellow">
              {stat.num}
            </div>
            <div className="mt-2 font-mono font-bold text-xs uppercase tracking-wider text-white">
              {stat.label}
            </div>
            <div className="text-[11px] text-gray-400 font-mono mt-0.5">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
