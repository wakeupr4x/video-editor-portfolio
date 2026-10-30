import React, { useState, useEffect } from 'react';
import { Mail, Phone, Copy, Check, ArrowUpRight, FolderGit2, ArrowUp, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTACT_INFO, DRIVE_FOLDER_URL } from '../data/videos';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E4FC00', '#00F0FF', '#FF2A7A', '#FFFFFF']
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-16 pb-12 bg-black border-t-3 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Neobrutalist Action Slab */}
        <div className="p-8 sm:p-12 md:p-16 bg-[#121218] border-3 border-white shadow-[10px_10px_0px_#E4FC00] mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brutal-yellow text-black font-mono font-bold text-xs uppercase border-2 border-black mb-6 shadow-[2px_2px_0px_#FFF]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>BOOKING CLIENT PROJECTS</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[0.95] tracking-tight">
              Ready to elevate <br />
              <span className="text-brutal-yellow">your timeline?</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-gray-300 font-body max-w-xl leading-relaxed">
              Let’s build edits that hook viewers, communicate brand power, and deliver broadcast-grade polish. Get in touch directly via WhatsApp or Email:
            </p>

            {/* Direct Contact Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono">
              
              {/* WhatsApp Direct Action */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-brutal-green text-black font-black text-sm uppercase border-2 border-white shadow-[4px_4px_0px_#FFF] brutal-btn flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp: 8269959465</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Direct Mailto */}
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Project%20Inquiry%20//%20Pushkar%20Verma`}
                className="px-6 py-4 bg-brutal-yellow text-black font-black text-sm uppercase border-2 border-white shadow-[4px_4px_0px_#FFF] brutal-btn flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Quick Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="px-5 py-4 bg-black text-white font-bold text-xs uppercase border-2 border-white/60 hover:border-white transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-brutal-green" />
                    <span className="text-brutal-green font-bold">COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span>COPY: {CONTACT_INFO.email}</span>
                  </>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Studio Info & Local Clock Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t-2 border-b-2 border-white items-center font-mono text-xs">
          
          {/* Identity */}
          <div>
            <div className="font-display font-black text-2xl text-white tracking-tighter">
              PUSHKAR VERMA
            </div>
            <p className="text-gray-400 mt-0.5">
              LEAD VIDEO EDITOR &amp; COLORIST // INDIA &bull; REMOTE GLOBAL
            </p>
          </div>

          {/* Contact Direct Readouts */}
          <div className="space-y-1">
            <div className="text-gray-400">
              EMAIL: <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-brutal-yellow underline font-bold">{CONTACT_INFO.email}</a>
            </div>
            <div className="text-gray-400">
              WHATSAPP: <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brutal-green hover:underline font-bold">+91 82699 59465</a>
            </div>
            <div className="text-gray-400">
              CLOUD REEL: <a href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="text-brutal-yellow hover:underline font-bold">Google Drive 4K Archive &rarr;</a>
            </div>
          </div>

          {/* Real-time Studio Clock (IST) */}
          <div className="md:text-right">
            <div className="text-[11px] text-gray-500 uppercase tracking-widest">
              LOCAL STUDIO TIME (IST // UTC+5:30)
            </div>
            <div className="text-2xl font-black text-brutal-yellow mt-0.5 flex items-center md:justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{localTime || "00:00:00"}</span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} PUSHKAR VERMA &bull; ALL TIMELINES RESERVED
          </div>

          <div className="flex items-center gap-6">
            <span>NEOBRUTALISM MINIMAL POST-PRODUCTION</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-brutal-yellow transition-colors font-bold"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
