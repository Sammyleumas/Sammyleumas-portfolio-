import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Gamepad2, Smartphone, LayoutGrid, ExternalLink } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (prefillService?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'saas' | 'mobile' | 'game'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'saas') return p.category.includes('SaaS');
    if (filter === 'mobile') return p.category.includes('Mobile');
    if (filter === 'game') return p.category.includes('Game');
    return true;
  });

  return (
    <section id="work" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#0A0B10]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>SELECTED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
              Ideas made tangible.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-3 leading-relaxed">
              A selection of digital experiences, products, and creative experiments shaped by curiosity and a commitment to building.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 self-start md:self-end">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Works
            </button>
            <button
              type="button"
              onClick={() => setFilter('saas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filter === 'saas'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Web / SaaS
            </button>
            <button
              type="button"
              onClick={() => setFilter('mobile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filter === 'mobile'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mobile OS
            </button>
            <button
              type="button"
              onClick={() => setFilter('game')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filter === 'game'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D & WebGL
            </button>
          </div>
        </div>

        {/* Editorial Project Showcase Grid */}
        <div className="flex flex-col gap-14 sm:gap-20">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-white/20 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Media Viewport (7 cols) */}
                  <div
                    className={`lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141C] aspect-[16/10] cursor-pointer group/img ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                    onClick={() => onSelectProject(project)}
                  >
                    <img
                      src={project.coverImage}
                      alt={`${project.title} Preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                    {/* Interactive Play Badge for SL-TAXI-DRIVER */}
                    {project.id === 'sl-taxi-driver' && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38BDF8]/90 text-slate-950 font-mono text-xs font-bold shadow-lg backdrop-blur-md">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Interactive Demo Inside</span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 text-xs text-white backdrop-blur-md font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Content Narrative (5 cols) */}
                  <div
                    className={`lg:col-span-5 flex flex-col items-start ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Number & Category */}
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      <span className="font-bold text-white text-sm">
                        {project.number}
                      </span>
                      <span>·</span>
                      <span>{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white hover:text-[#38BDF8] transition-colors cursor-pointer mb-3"
                    >
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Key Capabilities Preview */}
                    <div className="mb-6 w-full">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                        Technologies & Tools:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions: View Case Study + Launch Live App */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 active:scale-95 transition-all cursor-pointer shadow-md"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs uppercase tracking-wider transition-all"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
