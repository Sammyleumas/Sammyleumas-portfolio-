import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenContact: (prefillService?: string) => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenChat }) => {
  const { theme, toggleTheme } = useTheme();
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
          ? 'backdrop-blur-md border-b py-3.5 shadow-md'
          : 'bg-transparent py-5'
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
        borderColor: isScrolled ? 'var(--border-color)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo / Monogram */}
        <button
          type="button"
          onClick={() => scrollTo('top')}
          className="flex items-center gap-2.5 group cursor-pointer text-left rounded-lg p-1 transition-opacity hover:opacity-90"
          aria-label="Sammy Leumas Home"
        >
          <span
            className="w-9 h-9 rounded-xl border flex items-center justify-center font-black text-base tracking-tighter transition-all shadow-sm"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--primary-accent)',
            }}
          >
            {PERSONAL_INFO.initials}
          </span>
          <div className="hidden sm:flex flex-col">
            <span
              className="font-black text-sm tracking-tight leading-none transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {PERSONAL_INFO.name}
            </span>
            <span
              className="text-[10px] font-mono tracking-wider mt-0.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              CREATIVE TECHNOLOGIST
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-semibold"
          aria-label="Main Navigation"
        >
          {['Home', 'Work', 'About', 'Services', 'Insights', 'Contact'].map((item) => {
            const id = item === 'Home' ? 'top' : item.toLowerCase();
            return (
              <button
                key={item}
                type="button"
                onClick={() => scrollTo(id)}
                className="transition-colors cursor-pointer rounded px-1 py-0.5 hover:opacity-100"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions: Theme Toggle + Copilot + Let's Talk CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-sm active:scale-95"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--primary-accent)',
              }}
              title="Open Gemini Studio Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Copilot</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 text-white"
            style={{
              backgroundColor: 'var(--primary-accent)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              className="p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--primary-accent)',
              }}
              aria-label="Open AI Copilot"
              title="AI Copilot"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenContact()}
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-transform active:scale-95"
            style={{ backgroundColor: 'var(--primary-accent)' }}
          >
            Talk
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in / Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-50 backdrop-blur-xl md:hidden border-t px-6 py-8 flex flex-col justify-between overflow-y-auto"
          style={{
            backgroundColor: 'var(--bg-page)',
            borderColor: 'var(--border-color)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="flex flex-col gap-4 text-xl font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            {['Home', 'Work', 'About', 'Services', 'Insights', 'Contact'].map((item) => {
              const id = item === 'Home' ? 'top' : item.toLowerCase();
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="text-left py-2.5 transition-colors cursor-pointer border-b"
                  style={{
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div
            className="pt-6 border-t flex flex-col gap-3.5"
            style={{ borderColor: 'var(--border-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Theme switcher toggle row */}
            <div
              className="flex items-center justify-between p-3 rounded-2xl border"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-2.5">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                  Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--primary-accent)',
                }}
              >
                Switch
              </button>
            </div>

            {onOpenChat && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-3 rounded-xl text-sm font-semibold border text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--primary-accent)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Studio Copilot (Gemini)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md text-white"
              style={{
                backgroundColor: 'var(--primary-accent)',
              }}
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div
              className="flex flex-col gap-1 text-xs font-mono pt-2"
              style={{ color: 'var(--text-secondary)' }}
            >
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
