import React from 'react';
import { motion, type Variants } from 'motion/react';
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: 'easeOut',
      },
    },
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

      {/* Smooth ambient gradient flares */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#38BDF8] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-[#818CF8] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
        {/* Left Column: Typographic Hierarchy & Actions (7 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Introductory Label */}
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 shadow-sm backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
              {PERSONAL_INFO.title}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance"
          >
            {PERSONAL_INFO.headline}
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
          >
            {PERSONAL_INFO.heroDescription}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <motion.button
              type="button"
              onClick={scrollToWork}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-200 shadow-md cursor-pointer w-full sm:w-auto transition-colors"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              type="button"
              onClick={onOpenContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-white/30 cursor-pointer w-full sm:w-auto transition-colors backdrop-blur-sm"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </motion.button>
          </motion.div>

          {/* Availability Indicator */}
          {PERSONAL_INFO.isAvailable && (
            <motion.div
              variants={itemFadeUp}
              className="flex items-center gap-2.5 text-xs text-slate-400 font-medium"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.availabilityText}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Editorial Portrait & Graphic Treatment (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none group">
            {/* Ambient card frame with smooth hover glow */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-transparent p-2.5 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.12)]">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#12141C]">
                {/* User's attached high-contrast profile picture */}
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt="Sammy Leumas — Creative Technologist Portrait"
                  loading="eager"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle bottom gradient scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Subtle Status Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0B10]/75 border border-white/15 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-200">
                    Sammy Leumas
                  </span>
                </div>

                {/* Editorial Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0A0B10]/85 border border-white/10 backdrop-blur-md flex items-center justify-between transition-transform duration-500 group-hover:-translate-y-0.5">
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide uppercase">
                      Sammy Leumas
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      SL-TECHCO · SL-DESIGN
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-mono text-xs font-bold shadow-inner">
                    {PERSONAL_INFO.initials}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background decorative accent lines */}
            <div
              className="absolute -bottom-4 -right-4 w-28 h-28 border-r border-b border-white/20 rounded-br-2xl -z-10 pointer-events-none transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:border-sky-400/40"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-10 flex items-center justify-between border-t border-white/5 text-xs text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-300">01 / 06</span>
          <span className="text-slate-500">·</span>
          <span>{PERSONAL_INFO.brandTagline}</span>
        </div>

        <button
          type="button"
          onClick={scrollToAbout}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
