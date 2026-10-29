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
    <footer
      className="w-full border-t px-6 sm:px-10 py-16 transition-colors"
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Callout Strip */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <span
              className="text-xs font-mono uppercase tracking-wider block mb-1 font-bold"
              style={{ color: 'var(--primary-accent)' }}
            >
              HAVE AN INITIATIVE IN MIND?
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Ready to transform your idea into a digital product?
            </h3>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--primary-accent)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Navigation & Identity */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl overflow-hidden border shrink-0"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-black text-base tracking-tight leading-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {PERSONAL_INFO.name}
                </span>
                <span
                  className="text-[10px] font-mono tracking-wider mt-1 font-bold"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  SL-TECHCO · SL-DESIGN
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-normal max-w-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {PERSONAL_INFO.brandTagline}
            </p>
            <div className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
              Direct: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Navigation Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <span
              className="text-xs font-mono uppercase tracking-wider mb-3 font-bold"
              style={{ color: 'var(--text-secondary)' }}
            >
              Site Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
              {['Home', 'Work', 'About', 'Services', 'Insights', 'Contact'].map((item) => {
                const id = item === 'Home' ? 'top' : item.toLowerCase();
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-left transition-colors cursor-pointer py-1 hover:opacity-80"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Channels (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <span
              className="text-xs font-mono uppercase tracking-wider mb-3 font-bold"
              style={{ color: 'var(--text-secondary)' }}
            >
              Digital Presence
            </span>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                <Twitter className="w-4 h-4" />
                <span>X (Twitter)</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <button
            type="button"
            onClick={() => scrollTo('top')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
