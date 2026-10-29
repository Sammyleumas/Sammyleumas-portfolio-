import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Eye, ShieldCheck, Terminal, Layers, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { PHILOSOPHY_PRINCIPLES, PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#090A0F] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>ABOUT SAMMY LEUMAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
            Curiosity drives the build.
          </h2>
        </motion.div>

        {/* Biography & Studio Presence Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          {/* Left Column: Biography Prose & Studio Initiatives (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            <p className="text-white font-normal text-lg sm:text-xl leading-snug">
              I&apos;m Sammy Leumas, a creative technologist, web developer, and digital designer passionate about turning ideas into meaningful digital experiences.
            </p>

            <p>
              My work brings together technology, design, and artificial intelligence to create websites, digital products, and visual experiences that balance functionality with creativity. I enjoy exploring new ideas, solving problems, and finding better ways to transform concepts into practical solutions.
            </p>

            <p>
              Through my work with <strong className="text-white font-medium">SL-TECHCO</strong> and <strong className="text-white font-medium">SL-DESIGN</strong>, I pursue opportunities to help individuals and businesses establish their digital presence, communicate their ideas, and bring their visions to life.
            </p>

            <p>
              Beyond client projects, I&apos;m passionate about experimenting with emerging technologies, developing original digital products, and sharing my journey of creativity, learning, and innovation.
            </p>

            <blockquote className="p-5 rounded-2xl bg-white/[0.03] border-l-2 border-[#38BDF8] text-slate-200 italic font-normal text-base sm:text-lg my-2 transition-colors hover:bg-white/[0.05]">
              &ldquo;I believe technology should do more than work — it should solve problems, create opportunities, and leave a lasting impression. My mission is simple: to turn ideas into digital experiences that matter.&rdquo;
            </blockquote>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                type="button"
                onClick={onOpenContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer shadow-md"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={scrollToWork}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Creator Profile Spotlight Card with attached photograph */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 shadow-2xl backdrop-blur-md flex items-center gap-5 group hover:border-white/25 transition-all duration-500">
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-md bg-[#12141C]">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt="Sammy Leumas"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Verified Creator</span>
                </div>
                <div className="text-lg font-bold text-white tracking-tight">Sammy Leumas</div>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  Creative Technologist · Web Developer · Digital Designer
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-2">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Studio Identity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 shadow-xl backdrop-blur-sm hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    STUDIO PRACTICE
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5">SL-TECHCO &amp; SL-DESIGN</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold font-mono text-white text-sm">
                  SL.
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block font-medium">SL-TECHCO</strong>
                    <span className="text-slate-400 font-light">
                      Technical engineering, web applications, custom algorithms, and system integrations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-[#818CF8] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block font-medium">SL-DESIGN</strong>
                    <span className="text-slate-400 font-light">
                      Visual systems, brand identity, user interfaces, 3D interaction, and editorial layout.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block font-medium">AI &amp; Cognitive Workflows</strong>
                    <span className="text-slate-400 font-light">
                      Synthesizing generative tools with human taste to accelerate digital product deployment.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Creative Interests */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
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
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-300 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Working Philosophy - 3 Core Principles */}
        <div className="pt-12 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] block mb-1">
              WORKING PHILOSOPHY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Three principles behind every build.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((principle, idx) => {
              const icons = [
                <Compass key="1" className="w-5 h-5 text-[#38BDF8]" />,
                <Eye key="2" className="w-5 h-5 text-[#818CF8]" />,
                <ShieldCheck key="3" className="w-5 h-5 text-emerald-400" />,
              ];

              return (
                <motion.div
                  key={principle.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-sky-400 transition-colors">
                        {principle.number}
                      </span>
                      {icons[idx]}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{principle.title}</h4>
                    <p className="text-sm font-medium text-slate-200 mb-3 leading-snug">
                      {principle.description}
                    </p>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {principle.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
