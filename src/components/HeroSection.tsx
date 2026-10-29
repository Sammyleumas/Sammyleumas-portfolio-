import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient gradient flare */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-[#818CF8]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
        {/* Left Column: Typographic Hierarchy & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Introductory Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
              {PERSONAL_INFO.title}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
            {PERSONAL_INFO.headline}
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
            {PERSONAL_INFO.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            {/* Primary Button */}
            <button
              type="button"
              onClick={scrollToWork}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-200 active:scale-95 transition-all shadow-md cursor-pointer w-full sm:w-auto"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Availability Indicator */}
          {PERSONAL_INFO.isAvailable && (
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.availabilityText}</span>
            </div>
          )}
        </div>

        {/* Right Column: Editorial Portrait & Graphic Treatment (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none">
            {/* Ambient card frame */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-transparent p-2.5 shadow-2xl backdrop-blur-sm">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#12141C]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                  alt="Sammy Leumas — Creative Technologist Portrait"
                  loading="eager"
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 ease-out"
                />

                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-80" />

                {/* Editorial Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0A0B10]/85 border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide uppercase">
                      Sammy Leumas
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      SL-TECHCO · SL-DESIGN
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-mono text-xs font-bold">
                    SL.
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background decorative accent lines */}
            <div
              className="absolute -bottom-4 -right-4 w-28 h-28 border-r border-b border-white/20 rounded-br-2xl -z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 flex items-center justify-between border-t border-white/5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-300">01 / 06</span>
          <span className="text-slate-500">·</span>
          <span>{PERSONAL_INFO.brandTagline}</span>
        </div>

        <button
          type="button"
          onClick={scrollToAbout}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
