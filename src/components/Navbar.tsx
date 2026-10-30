import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Film, Sliders, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/videos';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'SHOWREEL', href: '#showreel' },
    { name: 'VIDEO CAROUSEL', href: '#carousel' },
    { name: 'PIPELINE', href: '#pipeline' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-[38px] z-40 bg-[#0A0A0E] border-b-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo & Identity */}
          <a href="#" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-white group-hover:text-brutal-yellow transition-colors">
                PUSHKAR VERMA
              </span>
              <span className="px-1.5 py-0.5 bg-brutal-yellow text-black font-mono font-bold text-[10px] uppercase border border-black shadow-[2px_2px_0px_#000]">
                EDITOR
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-mono text-gray-400">
                POST-PRODUCTION // COMMERCIAL &amp; NARRATIVE
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 border-2 border-white/20 bg-black p-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider text-gray-300 hover:text-black hover:bg-brutal-yellow transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Callouts */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brutal-green text-black font-mono font-bold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#FFF] brutal-btn hover:bg-white"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: 8269959465</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brutal-yellow text-black font-mono font-bold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#FFF] brutal-btn hover:bg-white"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-white bg-black text-white hover:bg-brutal-yellow hover:text-black"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-white bg-black px-4 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 border border-white/20 text-gray-200 hover:bg-brutal-yellow hover:text-black font-bold"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 bg-brutal-green text-black font-bold border-2 border-white shadow-[3px_3px_0px_#FFF]"
            >
              WhatsApp: +91 82699 59465
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="w-full text-center py-2.5 bg-brutal-yellow text-black font-bold border-2 border-white shadow-[3px_3px_0px_#FFF]"
            >
              Email: {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
