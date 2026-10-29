import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ExternalLink, Check, Sparkles, Layers, Cpu } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';
import InteractiveRacerDemo from './InteractiveRacerDemo';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (prefillService?: string) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  onOpenContact,
  onSelectProject,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const caseStudy = project?.caseStudy;
  const allImages = project
    ? [
        { title: 'Primary Overview', url: project.coverImage, caption: project.tagline },
        ...project.additionalImages,
      ]
    : [];

  const otherProjects = project ? PROJECTS.filter((p) => p.id !== project.id) : [];

  return (
    <AnimatePresence>
      {project && caseStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-5xl border rounded-3xl p-5 sm:p-8 md:p-10 max-h-[94vh] overflow-y-auto shadow-2xl transition-colors"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close case study"
              className="absolute top-5 right-5 p-2 rounded-full border transition-colors z-20 cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. Project Introduction & Meta */}
            <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    color: 'var(--primary-accent)',
                  }}
                >
                  PROJECT {project.number}
                </span>
                <span className="opacity-40">·</span>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.category}
                </span>
                <span className="opacity-40">·</span>
                <span
                  className="text-xs font-mono px-2.5 py-0.5 rounded-full border font-medium"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-black tracking-tight mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h2>
              <p
                className="text-base sm:text-lg font-normal leading-relaxed max-w-3xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>

              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs flex-1">
                  <div>
                    <span
                      className="block font-mono uppercase tracking-wider mb-1 font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Role
                    </span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {project.role}
                    </span>
                  </div>
                  <div>
                    <span
                      className="block font-mono uppercase tracking-wider mb-1 font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Timeline
                    </span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {project.timeline}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span
                      className="block font-mono uppercase tracking-wider mb-1 font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Platform
                    </span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shrink-0 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Visual Documentation & Stage Gallery */}
            <div className="mb-12">
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2 font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Layers className="w-4 h-4" style={{ color: 'var(--primary-accent)' }} />
                <span>Visual Documentation & System Interface</span>
              </h3>

              <div
                className="relative rounded-2xl overflow-hidden border aspect-video mb-3"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <img
                  src={allImages[activeImageIdx]?.url}
                  alt={allImages[activeImageIdx]?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <div className="text-sm font-bold">
                    {allImages[activeImageIdx]?.title}
                  </div>
                  <p className="text-xs opacity-80 font-normal mt-0.5">
                    {allImages[activeImageIdx]?.caption}
                  </p>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIdx === idx ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: activeImageIdx === idx ? 'var(--primary-accent)' : 'var(--border-color)',
                    }}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Live Demo Stage (where implemented) */}
            {(project.id === 'sl-taxi-driver' || project.id === 'sl-racer') && (
              <div
                className="mb-12 p-6 rounded-3xl border shadow-xl"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold mb-1.5"
                      style={{
                        backgroundColor: 'var(--badge-bg)',
                        color: 'var(--primary-accent)',
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Interactive WebGL 3D Driving Engine</span>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      SL-TAXI-DRIVER Playable Stage
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Test the physics, collision routines, and throttle curves directly in your browser.
                    </p>
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all self-start sm:self-auto"
                      style={{
                        backgroundColor: 'var(--surface-card)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--primary-accent)',
                      }}
                    >
                      <span>Play Full Screen</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <InteractiveRacerDemo />
              </div>
            )}

            {/* Problem & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h4
                  className="text-sm font-mono uppercase tracking-wider mb-2 font-bold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  02. Problem & Opportunity
                </h4>
                <p className="text-sm leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
                  {caseStudy.problem}
                </p>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h4
                  className="text-sm font-mono uppercase tracking-wider mb-2 font-bold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  03. Project Goals
                </h4>
                <ul className="space-y-2 mt-2">
                  {caseStudy.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <span className="font-bold mt-0.5" style={{ color: 'var(--primary-accent)' }}>✓</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Role & Engineering Process */}
            <div className="mb-12">
              <h4
                className="text-sm font-mono uppercase tracking-wider mb-3 font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                04 & 05. Role & Engineering Process
              </h4>
              <p className="text-sm leading-relaxed mb-4 font-normal" style={{ color: 'var(--text-secondary)' }}>
                {caseStudy.roleAndResponsibilities}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {caseStudy.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border text-xs"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <span
                      className="font-mono font-bold block mb-1"
                      style={{ color: 'var(--primary-accent)' }}
                    >
                      PHASE 0{idx + 1}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-12">
              <h4
                className="text-sm font-mono uppercase tracking-wider mb-3 flex items-center gap-2 font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Cpu className="w-4 h-4" style={{ color: 'var(--primary-accent)' }} />
                <span>06. Technology Stack & Architecture</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.technologiesUsed.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border flex flex-col"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <span className="text-xs font-mono font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                      {tech.name}
                    </span>
                    <span className="text-[11px] font-normal" style={{ color: 'var(--text-secondary)' }}>
                      {tech.purpose}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h4
                className="text-sm font-mono uppercase tracking-wider mb-3 font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                07. Key System Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <h5 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {feat.title}
                    </h5>
                    <p className="text-xs font-normal leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Decisions & Verified Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h4
                  className="text-sm font-mono uppercase tracking-wider mb-2 font-bold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  08. Design Decisions & Challenges
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
                  {caseStudy.designDecisionsAndChallenges}
                </p>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h4
                  className="text-sm font-mono uppercase tracking-wider mb-2 font-bold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  10. Verified Outcomes & Metrics
                </h4>
                <ul className="space-y-2 mt-2">
                  {caseStudy.verifiedOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Projects & Direct CTA */}
            <div className="pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    Interested in building something similar?
                  </h4>
                  <p className="text-xs font-normal mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Sammy Leumas is available for design systems, web development, and interactive builds.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContact(`Project collaboration inspired by ${project.title}`);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  style={{ backgroundColor: 'var(--primary-accent)' }}
                >
                  <span>Discuss Similar Build</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <span
                  className="text-xs font-mono uppercase tracking-wider block mb-3 font-bold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Explore Other Projects
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {otherProjects.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => onSelectProject(op)}
                      className="p-3.5 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer group"
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderColor: 'var(--border-color)',
                      }}
                    >
                      <div>
                        <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--primary-accent)' }}>
                          PROJECT {op.number}
                        </span>
                        <div className="text-sm font-bold group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                          {op.title}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectCaseStudyModal;
