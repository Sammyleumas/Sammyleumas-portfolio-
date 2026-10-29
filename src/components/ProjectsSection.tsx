import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Gamepad2, Smartphone, LayoutGrid, ExternalLink, Box } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (prefillService?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | '3d' | 'saas' | 'mobile'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === '3d') return p.category.includes('3D') || p.id.includes('sl-design') || p.id.includes('sl-taxi');
    if (filter === 'saas') return p.category.includes('SaaS') || p.category.includes('Web Application');
    if (filter === 'mobile') return p.category.includes('Mobile') || p.id.includes('launcher');
    return true;
  });

  return (
    <section
      id="work"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 transition-colors border-t"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
              <span className="font-bold" style={{ color: 'var(--primary-accent)' }}>
                SELECTED PROJECTS & PORTFOLIO
              </span>
            </div>
            {/* BIG FONT FOR SECTION */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight big-section-title"
              style={{ color: 'var(--text-primary)' }}
            >
              Ideas made tangible.
            </h2>
            <p
              className="text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              A selection of digital experiences, products, and creative systems shaped by curiosity and a commitment to high-impact craft.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border self-start md:self-end"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            {[
              { key: 'all', label: 'All Works' },
              { key: '3d', label: '3D Web & Studio' },
              { key: 'saas', label: 'Web & SaaS' },
              { key: 'mobile', label: 'Mobile OS' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key as any)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: filter === tab.key ? 'var(--primary-accent)' : 'transparent',
                  color: filter === tab.key ? '#FFFFFF' : 'var(--text-secondary)',
                  boxShadow: filter === tab.key ? '0 2px 8px rgba(79, 70, 229, 0.25)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Editorial Project Showcase Grid */}
        <div className="flex flex-col gap-14 sm:gap-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isReversed = index % 2 === 1;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  key={project.id}
                  className="group relative rounded-3xl border transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-xl"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Media Viewport (7 cols) */}
                    <div
                      className={`lg:col-span-7 relative rounded-2xl overflow-hidden border aspect-[16/10] cursor-pointer group/img ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderColor: 'var(--border-color)',
                      }}
                      onClick={() => onSelectProject(project)}
                    >
                      <img
                        src={project.coverImage}
                        alt={`${project.title} Preview`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                      {/* Interactive Demo Badges */}
                      {project.id === 'sl-design-3d' && (
                        <div
                          className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-mono text-xs font-bold shadow-lg backdrop-blur-md"
                          style={{ backgroundColor: 'var(--primary-accent)' }}
                        >
                          <Box className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                          <span>3D Live Website</span>
                        </div>
                      )}

                      {project.id === 'sl-taxi-driver' && (
                        <div
                          className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-mono text-xs font-bold shadow-lg backdrop-blur-md"
                          style={{ backgroundColor: 'var(--primary-accent)' }}
                        >
                          <Gamepad2 className="w-4 h-4" />
                          <span>Interactive 3D Game</span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/15 text-xs text-white backdrop-blur-md font-mono">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-success)' }}
                        />
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
                      <div
                        className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider mb-2 font-semibold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span
                          className="font-black text-sm px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: 'var(--surface-secondary)',
                            color: 'var(--primary-accent)',
                          }}
                        >
                          {project.number}
                        </span>
                        <span>·</span>
                        <span>{project.category}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight hover:opacity-85 transition-opacity cursor-pointer mb-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        className="text-sm sm:text-base font-normal leading-relaxed mb-6"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {project.description}
                      </p>

                      {/* Key Capabilities Preview */}
                      <div className="mb-6 w-full">
                        <span
                          className="text-[11px] font-mono uppercase tracking-wider block mb-2 font-bold"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Technologies & Tools:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg border text-xs font-mono font-medium"
                              style={{
                                backgroundColor: 'var(--surface-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-secondary)',
                              }}
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-md"
                          style={{ backgroundColor: 'var(--primary-accent)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm"
                            style={{
                              backgroundColor: 'var(--surface-secondary)',
                              borderColor: 'var(--border-color)',
                              color: 'var(--primary-accent)',
                            }}
                          >
                            <span>Live App</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
