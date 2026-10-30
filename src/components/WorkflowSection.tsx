import React, { useState } from 'react';
import { Activity, Palette, Volume2, Sparkles, CheckSquare, Layers, Cpu } from 'lucide-react';
import { EDITING_TOOLKIT } from '../data/videos';

export const WorkflowSection: React.FC = () => {
  const [selectedFps, setSelectedFps] = useState<number>(24);

  const pipelineStages = [
    {
      step: "01",
      name: "PACING & RETENTION BLUEPRINT",
      role: "Assembly Cut & Hook Retention",
      desc: "Every cut serves psychological momentum. Micro-retention hooks in the first 0.8 seconds, beat-locked pacing, and breath pauses that command undivided viewer attention.",
      deliverables: ["Assembly Timeline", "Retention Curve Analysis", "Beat-Locked EDL"],
      icon: Activity,
      accent: "bg-brutal-yellow text-black",
    },
    {
      step: "02",
      name: "ACES COLOR ARCHITECTURE",
      role: "Color Transform & Film Prints",
      desc: "Color-managed pipeline inside DaVinci Resolve Studio. Kodak 2383 D60 print-film emulation, skin-tone isolation, and high-contrast commercial split-toning.",
      deliverables: ["Custom 3D LUT Architecture", "Shot-to-Shot Color Matching", "Rec.709 & HDR Master"],
      icon: Palette,
      accent: "bg-brutal-cyan text-black",
    },
    {
      step: "03",
      name: "SURGICAL SOUND FOLEY & MIX",
      role: "Acoustic Punch & Spatial Panning",
      desc: "Sound constitutes 60% of cinematic perception. Heavy sub-bass impacts, organic foley, vocal frequency ducking, and -14 LUFS streaming compliance.",
      deliverables: ["Custom Sound FX & Risers", "Vocal De-Noise & Compression", "Broadcast LUFS Master"],
      icon: Volume2,
      accent: "bg-brutal-pink text-white",
    },
    {
      step: "04",
      name: "KINETIC MOTION & 3D VFX",
      role: "After Effects & Tracking",
      desc: "3D camera tracking, cyber HUD overlays, custom kinetic typography, screen replacements, and seamless match cuts that elevate production value.",
      deliverables: ["Kinetic Typography Suite", "Match Cut Transitions", "Screen Replacements"],
      icon: Sparkles,
      accent: "bg-white text-black",
    },
  ];

  return (
    <section id="pipeline" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 border-white">
      
      {/* Header */}
      <div className="mb-12 border-b-2 border-white pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brutal-yellow text-black font-mono font-bold text-xs uppercase border-2 border-white mb-3">
          <span>THE EDITORIAL PIPELINE</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Surgical Timeline Architecture
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-300 font-body max-w-2xl">
          A disciplined, four-stage post-production pipeline built to deliver broadcast-caliber assets on tight deadlines.
        </p>
      </div>

      {/* Simulated NLE Track Ribbon Visualization */}
      <div className="mb-14 p-4 bg-black border-3 border-white shadow-[6px_6px_0px_#FFF] font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-3 text-gray-400">
          <span className="text-brutal-yellow font-bold">NLE TIMELINE SEQUENCE MAP // MULTI-TRACK STACK</span>
          <span className="text-[11px]">PROJECT: 4K_PRORES_MASTER_FINAL.PRPROJ</span>
        </div>

        <div className="space-y-2">
          {/* V2 Track */}
          <div className="flex items-center gap-2">
            <span className="w-12 px-1.5 py-1 bg-[#1A1A24] border border-white/30 text-white font-bold text-center">
              V2
            </span>
            <div className="flex-1 h-8 bg-[#121218] border border-white/20 flex items-center px-3 gap-2 overflow-hidden">
              <span className="px-2 py-0.5 bg-brutal-cyan text-black font-bold text-[10px] shrink-0">B-ROLL OVERLAY</span>
              <span className="px-2 py-0.5 bg-brutal-yellow text-black font-bold text-[10px] shrink-0">SPEED RAMP</span>
              <span className="px-2 py-0.5 bg-brutal-pink text-white font-bold text-[10px] shrink-0">3D VFX TRACK</span>
            </div>
          </div>

          {/* V1 Track */}
          <div className="flex items-center gap-2">
            <span className="w-12 px-1.5 py-1 bg-[#1A1A24] border border-white/30 text-white font-bold text-center">
              V1
            </span>
            <div className="flex-1 h-8 bg-[#121218] border border-white/20 flex items-center px-3 gap-2 overflow-hidden">
              <span className="px-3 py-0.5 bg-white text-black font-bold text-[10px] shrink-0">MAIN ASSEMBLY CUT (A-ROLL)</span>
              <span className="px-3 py-0.5 bg-white text-black font-bold text-[10px] shrink-0">SCENE 02 CLIMAX</span>
            </div>
          </div>

          {/* A1 Track */}
          <div className="flex items-center gap-2">
            <span className="w-12 px-1.5 py-1 bg-[#20202C] border border-white/30 text-brutal-yellow font-bold text-center">
              A1
            </span>
            <div className="flex-1 h-8 bg-[#121218] border border-white/20 flex items-center px-3 gap-2 overflow-hidden">
              <span className="px-2 py-0.5 bg-brutal-yellow text-black font-bold text-[10px] shrink-0">VOCAL / DIALOGUE DE-NOISE</span>
              <span className="text-[10px] text-gray-500">// -14 LUFS NORMALIZED</span>
            </div>
          </div>

          {/* A2 Track */}
          <div className="flex items-center gap-2">
            <span className="w-12 px-1.5 py-1 bg-[#20202C] border border-white/30 text-brutal-yellow font-bold text-center">
              A2
            </span>
            <div className="flex-1 h-8 bg-[#121218] border border-white/20 flex items-center px-3 gap-2 overflow-hidden">
              <span className="px-2 py-0.5 bg-brutal-pink text-white font-bold text-[10px] shrink-0">FOLEY IMPACTS</span>
              <span className="px-2 py-0.5 bg-brutal-green text-black font-bold text-[10px] shrink-0">SUB-BASS RISERS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Stages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pipelineStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.step}
              className="p-6 bg-[#121218] border-3 border-white shadow-[5px_5px_0px_#FFF] hover:shadow-[5px_5px_0px_#E4FC00] hover:border-brutal-yellow transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-white text-black border border-black">
                    PHASE {stage.step}
                  </span>
                  <div className={`p-2 border border-black ${stage.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="font-mono text-[11px] text-brutal-yellow font-bold uppercase mb-1">
                  {stage.role}
                </div>

                <h3 className="font-display font-black text-xl text-white uppercase leading-tight mb-3">
                  {stage.name}
                </h3>

                <p className="font-body text-xs text-gray-300 leading-relaxed mb-6">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-white/10 space-y-1.5 font-mono text-[11px]">
                {stage.deliverables.map((del) => (
                  <div key={del} className="flex items-center gap-1.5 text-gray-300">
                    <CheckSquare className="w-3.5 h-3.5 text-brutal-yellow shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Software Toolkit & Cadence Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Software Toolkit Grid */}
        <div className="lg:col-span-2 p-6 sm:p-8 bg-[#121218] border-3 border-white shadow-[6px_6px_0px_#E4FC00]">
          <div className="flex items-center justify-between mb-6 border-b-2 border-white pb-4 font-mono">
            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">Software Toolkit</h3>
              <p className="text-xs text-gray-400">Battle-tested industry standard post-production tools</p>
            </div>
            <span className="px-2 py-1 bg-brutal-yellow text-black font-bold text-xs uppercase border border-black">
              PRO RIG
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EDITING_TOOLKIT.map((tool) => (
              <div
                key={tool.name}
                className="p-4 bg-black border-2 border-white/30 hover:border-white transition-colors"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="font-display font-black text-base text-white">{tool.name}</span>
                  <span className="text-xs text-brutal-yellow font-bold">{tool.version}</span>
                </div>
                <div className="text-xs text-gray-400 font-mono mt-1">{tool.role}</div>
                <div className="mt-2 inline-block px-1.5 py-0.5 bg-[#1F1F2B] border border-white/20 text-[10px] font-mono text-gray-300">
                  {tool.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Cadence FPS Lab */}
        <div className="p-6 sm:p-8 bg-black border-3 border-white shadow-[6px_6px_0px_#FFF] flex flex-col justify-between font-mono">
          <div>
            <h3 className="font-display font-black text-2xl text-white uppercase mb-1">
              Cadence Lab
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Precision time-remapping curves mapped to target platform.
            </p>

            <div className="space-y-2 mb-6">
              {[
                { fps: 24, label: "24.00 FPS // Cinematic standard", desc: "180° shutter blur, natural fiction cadence" },
                { fps: 60, label: "60.00 FPS // Punchy social reels", desc: "Crisp movement, zero motion stutter" },
                { fps: 120, label: "120.00 FPS // Optical slow-mo", desc: "Hyper fluid velocity time stretches" },
              ].map((item) => (
                <button
                  key={item.fps}
                  onClick={() => setSelectedFps(item.fps)}
                  className={`w-full text-left p-3 border-2 transition-all ${
                    selectedFps === item.fps
                      ? 'bg-brutal-yellow text-black font-bold border-black shadow-[3px_3px_0px_#FFF]'
                      : 'bg-[#121218] text-gray-300 border-white/20 hover:border-white'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] mt-0.5 opacity-80">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#161622] border-2 border-white flex items-center justify-between text-xs">
            <span>ACTIVE TIMELINE:</span>
            <div className="flex items-center gap-2">
              <span className="text-brutal-yellow font-bold">{selectedFps} FRAMES/SECOND</span>
              <span
                className="w-2.5 h-2.5 bg-brutal-yellow border border-black rounded-none"
                style={{
                  animation: `blink ${1 / selectedFps * 12}s step-end infinite`
                }}
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
