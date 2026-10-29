import React from 'react';
import { ArrowRight, Compass, Eye, ShieldCheck, Terminal, Layers, Sparkles } from 'lucide-react';
import { PHILOSOPHY_PRINCIPLES } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#090A0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>ABOUT SAMMY LEUMAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
            Curiosity drives the build.
          </h2>
        </div>

        {/* Biography & Studio Presence Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          {/* Left Column: Biography Prose & Studio Initiatives (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
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

            <p className="p-5 rounded-2xl bg-white/[0.03] border-l-2 border-[#38BDF8] text-slate-200 italic font-normal text-base sm:text-lg my-2">
              &ldquo;I believe technology should do more than work — it should solve problems, create opportunities, and leave a lasting impression. My mission is simple: to turn ideas into digital experiences that matter.&rdquo;
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer shadow-md"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Explore Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column: Studio Card & Core Focus Areas (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Studio Identity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 shadow-xl backdrop-blur-sm">
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
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
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
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Working Philosophy - 3 Core Principles */}
        <div className="pt-12 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] block mb-1">
              WORKING PHILOSOPHY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Three principles behind every build.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((principle, idx) => {
              const icons = [
                <Compass key="1" className="w-5 h-5 text-[#38BDF8]" />,
                <Eye key="2" className="w-5 h-5 text-[#818CF8]" />,
                <ShieldCheck key="3" className="w-5 h-5 text-emerald-400" />,
              ];

              return (
                <div
                  key={principle.number}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-slate-500">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
