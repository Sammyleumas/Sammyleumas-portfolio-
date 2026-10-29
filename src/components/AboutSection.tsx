import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Eye,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { PHILOSOPHY_PRINCIPLES, PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [isProcessAutoPlay, setIsProcessAutoPlay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const totalPrinciples = PHILOSOPHY_PRINCIPLES.length;

  const nextProcess = () => {
    setActiveProcessIdx((prev) => (prev + 1) % totalPrinciples);
  };

  const prevProcess = () => {
    setActiveProcessIdx((prev) => (prev - 1 + totalPrinciples) % totalPrinciples);
  };

  useEffect(() => {
    if (!isProcessAutoPlay) return;
    const interval = setInterval(() => {
      nextProcess();
    }, 5500);
    return () => clearInterval(interval);
  }, [isProcessAutoPlay, activeProcessIdx]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 border-t overflow-hidden transition-colors"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with BIG FONT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-16 pb-8 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3 font-bold">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary-accent)' }}
            />
            <span style={{ color: 'var(--primary-accent)' }}>ABOUT SAMMY LEUMAS</span>
          </div>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight big-section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            Curiosity drives the build.
          </h2>
          <p
            className="text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Creative thinking united with intelligent engineering to transform ambitious visions into enduring digital artifacts.
          </p>
        </motion.div>

        {/* Biography & Studio Presence Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          {/* Left Column: Biography Prose & Studio Initiatives (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg font-normal leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p className="font-semibold text-lg sm:text-xl leading-snug" style={{ color: 'var(--text-primary)' }}>
              I&apos;m Sammy Leumas, a creative technologist, web developer, and digital designer passionate about turning ideas into meaningful digital experiences.
            </p>

            <p>
              My work brings together technology, design, and artificial intelligence to create websites, digital products, and visual experiences that balance functionality with creativity. I enjoy exploring new ideas, solving problems, and finding better ways to transform concepts into practical solutions.
            </p>

            <p>
              Through my work with <strong className="font-bold" style={{ color: 'var(--text-primary)' }}>SL-TECHCO</strong> and <strong className="font-bold" style={{ color: 'var(--text-primary)' }}>SL-DESIGN</strong>, I pursue opportunities to help individuals and businesses establish their digital presence, communicate their ideas, and bring their visions to life.
            </p>

            <p>
              Beyond client projects, I&apos;m passionate about experimenting with emerging technologies, developing original digital products, and sharing my journey of creativity, learning, and innovation.
            </p>

            <blockquote
              className="p-5 rounded-2xl border-l-4 italic font-medium text-base sm:text-lg my-2 transition-colors"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderLeftColor: 'var(--primary-accent)',
                color: 'var(--text-primary)',
              }}
            >
              &ldquo;I believe technology should do more than work — it should solve problems, create opportunities, and leave a lasting impression. My mission is simple: to turn ideas into digital experiences that matter.&rdquo;
            </blockquote>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                type="button"
                onClick={onOpenContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                style={{ backgroundColor: 'var(--primary-accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={scrollToWork}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>Explore Projects</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Profile Feature & Studio Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Creator Profile Spotlight Card */}
            <div
              className="p-5 sm:p-6 rounded-3xl border shadow-xl flex items-center gap-5 transition-all duration-300"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border shadow-md"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt="Sammy Leumas"
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider mb-1 font-bold"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Creator</span>
                </div>
                <div className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Sammy Leumas
                </div>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  Creative Technologist · Web Developer · Digital Designer
                </p>
                <div
                  className="flex items-center gap-1.5 text-[11px] font-mono mt-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <MapPin className="w-3 h-3 opacity-60" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Studio Identity Card */}
            <div
              className="p-6 sm:p-8 rounded-3xl border shadow-xl transition-all duration-300"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="flex items-center justify-between mb-6 pb-4 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div>
                  <span
                    className="text-xs font-mono uppercase tracking-wider block font-bold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    STUDIO PRACTICE
                  </span>
                  <div className="text-lg font-black mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    SL-TECHCO &amp; SL-DESIGN
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold font-mono text-sm"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--primary-accent)',
                  }}
                >
                  SL.
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--primary-accent)' }} />
                  <div>
                    <strong className="block font-bold" style={{ color: 'var(--text-primary)' }}>
                      SL-TECHCO
                    </strong>
                    <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                      Technical engineering, web applications, custom algorithms, and system integrations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--primary-accent)' }} />
                  <div>
                    <strong className="block font-bold" style={{ color: 'var(--text-primary)' }}>
                      SL-DESIGN
                    </strong>
                    <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                      Visual systems, brand identity, user interfaces, 3D interaction, and editorial layout.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--accent-hover)' }} />
                  <div>
                    <strong className="block font-bold" style={{ color: 'var(--text-primary)' }}>
                      AI &amp; Cognitive Workflows
                    </strong>
                    <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                      Synthesizing generative tools with human taste to accelerate digital product deployment.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Creative Interests */}
            <div
              className="p-6 rounded-2xl border transition-all duration-300"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <span
                className="text-xs font-mono uppercase tracking-wider block mb-3 font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                Core Domains of Practice
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Creative Technology',
                  'Web Architecture',
                  'UI/UX Systems',
                  'Figma Prototyping',
                  'Android Experience',
                  'WebGL & Three.js',
                  'Prompt Engineering',
                  'Brand Strategy',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border text-xs font-mono font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Working Philosophy - 3D Carousel of Process Notes */}
        <div className="pt-16 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span
                className="text-xs font-mono uppercase tracking-wider block mb-2 font-bold"
                style={{ color: 'var(--primary-accent)' }}
              >
                WORKING PHILOSOPHY &amp; PROCESS NOTES · 3D CAROUSEL
              </span>
              <h3
                className="text-3xl sm:text-5xl font-black tracking-tight big-section-title"
                style={{ color: 'var(--text-primary)' }}
              >
                Principles behind every build.
              </h3>
            </div>

            {/* 3D Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsProcessAutoPlay(!isProcessAutoPlay)}
                className="px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Toggle Carousel Autoplay"
              >
                {isProcessAutoPlay ? (
                  <>
                    <Pause className="w-3.5 h-3.5" style={{ color: 'var(--primary-accent)' }} />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Auto</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevProcess}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Previous principle"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextProcess}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Next principle"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3D Stage for Process Notes */}
          <div
            className="relative w-full h-[400px] sm:h-[420px] flex items-center justify-center select-none"
            style={{ perspective: '1100px' }}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) prevProcess();
                else nextProcess();
              }
              touchStartX.current = null;
            }}
          >
            {PHILOSOPHY_PRINCIPLES.map((principle, idx) => {
              let offset = idx - activeProcessIdx;
              if (offset > totalPrinciples / 2) offset -= totalPrinciples;
              if (offset < -totalPrinciples / 2) offset += totalPrinciples;

              const isCenter = offset === 0;
              const isRight = offset === 1;
              const isLeft = offset === -1;

              let transform = 'translate3d(0, 0, -300px) scale(0.7)';
              let opacity = 0.2;
              let zIndex = 5;

              if (isCenter) {
                transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
                opacity = 1;
                zIndex = 30;
              } else if (isRight) {
                transform = 'translate3d(min(280px, 28vw), 0, -120px) rotateY(-20deg) scale(0.88)';
                opacity = 0.55;
                zIndex = 15;
              } else if (isLeft) {
                transform = 'translate3d(max(-280px, -28vw), 0, -120px) rotateY(20deg) scale(0.88)';
                opacity = 0.55;
                zIndex = 15;
              }

              const icons = [
                <Compass key="1" className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />,
                <Eye key="2" className="w-6 h-6" style={{ color: 'var(--accent-hover)' }} />,
                <ShieldCheck key="3" className="w-6 h-6" style={{ color: 'var(--color-success)' }} />,
              ];

              return (
                <div
                  key={principle.number}
                  onClick={() => {
                    if (!isCenter) setActiveProcessIdx(idx);
                  }}
                  className={`absolute w-full max-w-[340px] sm:max-w-[460px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    !isCenter ? 'cursor-pointer hover:opacity-80' : ''
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="p-7 sm:p-9 rounded-3xl border shadow-2xl backdrop-blur-md flex flex-col justify-between h-[340px] sm:h-[360px]"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      borderColor: isCenter ? 'var(--primary-accent)' : 'var(--border-color)',
                      boxShadow: isCenter ? 'var(--card-shadow)' : 'none',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                          style={{
                            backgroundColor: 'var(--surface-secondary)',
                            color: 'var(--primary-accent)',
                          }}
                        >
                          NOTE {principle.number}
                        </span>
                        {icons[idx]}
                      </div>

                      <h4
                        className="text-2xl sm:text-3xl font-black mb-3 tracking-tight"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {principle.title}
                      </h4>

                      <p
                        className="text-sm font-semibold mb-3 leading-snug"
                        style={{ color: 'var(--primary-accent)' }}
                      >
                        {principle.description}
                      </p>

                      <p
                        className="text-xs sm:text-sm font-normal leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {principle.detail}
                      </p>
                    </div>

                    <div className="pt-3 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      <span>Core Foundation</span>
                      <span className="font-bold" style={{ color: 'var(--primary-accent)' }}>
                        0{idx + 1} / 0{totalPrinciples}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {PHILOSOPHY_PRINCIPLES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveProcessIdx(idx)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: activeProcessIdx === idx ? '32px' : '8px',
                  backgroundColor: activeProcessIdx === idx ? 'var(--primary-accent)' : 'var(--border-color)',
                }}
                aria-label={`Go to principle ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
