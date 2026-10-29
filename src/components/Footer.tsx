import React from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#06070B] border-t border-white/10 px-6 sm:px-10 py-16 text-slate-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Callout Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] block mb-1">
              HAVE AN INITIATIVE IN MIND?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to transform your idea into a digital product?
            </h3>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shrink-0 cursor-pointer shadow-md"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Navigation & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/5">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-[#12141C]">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-white tracking-tight leading-none">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider mt-1">
                  SL-TECHCO · SL-DESIGN
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm mb-4 leading-relaxed">
              {PERSONAL_INFO.brandTagline}
            </p>
            <div className="text-xs text-slate-400 font-mono">
              Direct: <span className="text-white font-medium">{PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Navigation Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Site Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => scrollTo('top')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => scrollTo('about')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollTo('insights')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                Insights
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social Links & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 block md:text-right font-semibold">
                Profiles
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollTo('top')}
              className="mt-6 md:mt-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Sammy Leumas. All rights reserved.</p>
          <p className="text-[11px] font-mono text-slate-400">
            Developed by <span className="text-slate-300 font-medium">SL-TECHCO</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
