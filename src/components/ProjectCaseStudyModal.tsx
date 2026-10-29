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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#0D0F17] border border-white/15 rounded-3xl p-5 sm:p-8 md:p-10 text-slate-200 max-h-[94vh] overflow-y-auto shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close case study"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 1. Project Introduction & Meta */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold text-[#38BDF8] uppercase tracking-wider">
              PROJECT {project.number}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-slate-300">
              {project.status}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs flex-1">
              <div>
                <span className="text-slate-400 block font-mono uppercase tracking-wider mb-1">Role</span>
                <span className="text-white font-medium">{project.role}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono uppercase tracking-wider mb-1">Timeline</span>
                <span className="text-white font-medium">{project.timeline}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block font-mono uppercase tracking-wider mb-1">Platform</span>
                <span className="text-white font-medium">{project.category}</span>
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-all cursor-pointer shadow-lg shrink-0"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* 9. Visual Documentation & Stage Gallery */}
        <div className="mb-12">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <span>Visual Documentation & System Interface</span>
          </h3>

          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video mb-3">
            <img
              src={allImages[activeImageIdx].url}
              alt={allImages[activeImageIdx].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="text-sm font-semibold text-white">
                {allImages[activeImageIdx].title}
              </div>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                {allImages[activeImageIdx].caption}
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
                  activeImageIdx === idx
                    ? 'border-[#38BDF8] ring-2 ring-[#38BDF8]/20 scale-105'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 11. Interactive Live Demo Stage (where implemented) */}
        {(project.id === 'sl-taxi-driver' || project.id === 'sl-racer') && (
          <div className="mb-12 p-6 rounded-3xl bg-[#090A0F] border border-[#38BDF8]/30 shadow-xl">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-mono font-medium mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive WebGL 3D Driving Engine</span>
                </div>
                <h3 className="text-xl font-bold text-white">SL-TAXI-DRIVER Playable Stage</h3>
                <p className="text-xs text-slate-300">
                  Test the physics, collision routines, and throttle curves directly in your browser.
                </p>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all self-start sm:self-auto"
                >
                  <span>Play Full Screen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <InteractiveRacerDemo />
          </div>
        )}

        {/* 2 & 3. Problem, Opportunity & Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
              02. Problem & Opportunity
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {caseStudy.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
              03. Project Goals
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-[#38BDF8] font-bold mt-0.5">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 & 5. Role & Development Process */}
        <div className="mb-12">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
            04 & 05. Role & Engineering Process
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed mb-4 font-light">
            {caseStudy.roleAndResponsibilities}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {caseStudy.process.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                <span className="font-mono text-[#38BDF8] font-bold block mb-1">
                  PHASE 0{idx + 1}
                </span>
                <span className="text-slate-300 leading-normal">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Technologies and Tools Used */}
        <div className="mb-12">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#38BDF8]" />
            <span>06. Technology Stack & Architecture</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseStudy.technologiesUsed.map((tech, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col">
                <span className="text-xs font-mono font-bold text-white mb-0.5">{tech.name}</span>
                <span className="text-[11px] text-slate-400 font-light">{tech.purpose}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Key Features */}
        <div className="mb-12">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
            07. Key System Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-sm font-bold text-white mb-1">{feat.title}</h5>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 8 & 10. Design Decisions & Verified Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
              08. Design Decisions & Challenges
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {caseStudy.designDecisionsAndChallenges}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
              10. Verified Outcomes & Metrics
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.verifiedOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 12. Related Projects & Direct CTA */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h4 className="text-lg font-bold text-white">Interested in building something similar?</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Sammy Leumas is available for design systems, web development, and interactive builds.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact(`Project collaboration inspired by ${project.title}`);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shrink-0 cursor-pointer shadow-lg"
            >
              <span>Discuss Similar Build</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-3">
              Explore Other Projects
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherProjects.map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => onSelectProject(op)}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-left transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <span className="text-[11px] font-mono text-slate-500">PROJECT {op.number}</span>
                    <div className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {op.title}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
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
