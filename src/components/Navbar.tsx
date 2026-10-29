import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: (prefillService?: string) => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0B10]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo / Monogram */}
        <button
          type="button"
          onClick={() => scrollTo('top')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-lg p-1"
          aria-label="Sammy Leumas Home"
        >
          <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-base tracking-tighter group-hover:border-[#38BDF8] group-hover:bg-[#38BDF8]/10 transition-colors">
            {PERSONAL_INFO.initials}
          </span>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#38BDF8] transition-colors leading-none">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider mt-0.5">
              CREATIVE TECH
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => scrollTo('top')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollTo('work')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollTo('services')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => scrollTo('insights')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            Insights
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded px-1"
          >
            Contact
          </button>
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50 active:scale-95 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              title="Open Gemini Studio Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>AI Copilot</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="p-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 flex items-center justify-center cursor-pointer hover:bg-sky-500/20 transition-colors"
              aria-label="Open AI Copilot"
              title="AI Copilot"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenContact()}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-900 transition-colors"
          >
            Let&apos;s Talk
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in / Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-50 bg-[#0A0B10]/95 backdrop-blur-xl md:hidden border-t border-white/10 px-6 py-8 flex flex-col justify-between overflow-y-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="flex flex-col gap-5 text-lg font-medium text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => scrollTo('top')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo('work')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollTo('insights')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              Insights
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-white/5"
            >
              Contact
            </button>
          </div>

          <div
            className="pt-6 border-t border-white/10 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {onOpenChat && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-3 rounded-xl text-sm font-medium border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Ask Studio Copilot (Gemini)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider bg-white text-slate-900 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono pt-2">
              <span>{PERSONAL_INFO.email}</span>
              <span>{PERSONAL_INFO.formattedPhone}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
