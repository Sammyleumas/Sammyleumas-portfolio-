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
    <section
      className="relative min-h-[92vh] sm:min-h-screen w-full pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between overflow-hidden transition-colors"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Subtle ambient gradient flares */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--primary-accent)' }}
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--accent-hover)' }}
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 shadow-sm backdrop-blur-sm"
            style={{
              backgroundColor: 'var(--badge-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary-accent)' }}
            />
            <span
              className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: 'var(--primary-accent)' }}
            >
              {PERSONAL_INFO.title}
            </span>
          </motion.div>

          {/* Big Section Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-6 text-balance big-section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            {PERSONAL_INFO.headline}
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-8"
            style={{ color: 'var(--text-secondary)' }}
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-md cursor-pointer w-full sm:w-auto transition-all"
              style={{ backgroundColor: 'var(--primary-accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border font-semibold text-sm cursor-pointer w-full sm:w-auto transition-all backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </motion.button>
          </motion.div>

          {/* Availability Indicator */}
          {PERSONAL_INFO.isAvailable && (
            <motion.div
              variants={itemFadeUp}
              className="flex items-center gap-2.5 text-xs font-semibold"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: 'var(--color-success)' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: 'var(--color-success)' }}
                />
              </span>
              <span>{PERSONAL_INFO.availabilityText}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Editorial Portrait & Graphic Treatment (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none group">
            {/* Ambient card frame */}
            <div
              className="relative rounded-3xl overflow-hidden border p-2.5 shadow-2xl backdrop-blur-md transition-all duration-500"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5]"
                style={{ backgroundColor: 'var(--surface-secondary)' }}
              >
                {/* User's profile picture */}
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt="Sammy Leumas — Creative Technologist Portrait"
                  loading="eager"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle bottom gradient scrim overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-75 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(to top, var(--bg-page), transparent)' }}
                />

                {/* Top Subtle Status Tag */}
                <div
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                  />
                  <span
                    className="text-[10px] font-mono tracking-wider uppercase font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Sammy Leumas
                  </span>
                </div>

                {/* Editorial Floating Badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl border backdrop-blur-md flex items-center justify-between transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div>
                    <div
                      className="text-xs font-bold tracking-wide uppercase"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Sammy Leumas
                    </div>
                    <div
                      className="text-[11px] font-mono font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      SL-TECHCO · SL-DESIGN
                    </div>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-xs font-bold shadow-inner"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--primary-accent)',
                    }}
                  >
                    {PERSONAL_INFO.initials}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent lines */}
            <div
              className="absolute -bottom-4 -right-4 w-28 h-28 border-r border-b rounded-br-2xl -z-10 pointer-events-none transition-all duration-500"
              style={{ borderColor: 'var(--border-color)' }}
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
        className="relative z-10 max-w-7xl mx-auto w-full pt-10 flex items-center justify-between border-t text-xs font-medium"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold" style={{ color: 'var(--primary-accent)' }}>
            01 / 06
          </span>
          <span>·</span>
          <span>{PERSONAL_INFO.brandTagline}</span>
        </div>

        <button
          type="button"
          onClick={scrollToAbout}
          className="inline-flex items-center gap-1.5 transition-colors duration-300 cursor-pointer hover:opacity-100"
          style={{ color: 'var(--text-primary)' }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
