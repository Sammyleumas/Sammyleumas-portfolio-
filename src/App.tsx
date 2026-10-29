/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectCaseStudyModal from './components/ProjectCaseStudyModal';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import InsightsSection from './components/InsightsSection';
import ArticleModal from './components/ArticleModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GeminiChatbot from './components/GeminiChatbot';
import { Project, Article } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [prefillService, setPrefillService] = useState<string | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenContact = (serviceName?: string) => {
    if (serviceName) {
      setPrefillService(serviceName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className="w-full min-h-screen overflow-x-clip relative transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-primary)',
      }}
    >
      {/* 1. Navigation System */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 2. Hero Section */}
      <HeroSection onOpenContact={() => handleOpenContact()} />

      {/* 3. Selected Projects */}
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenContact={handleOpenContact}
      />

      {/* 4. About Section */}
      <AboutSection onOpenContact={() => handleOpenContact()} />

      {/* 5. Services Section */}
      <ServicesSection onOpenContact={handleOpenContact} />

      {/* 6. Insights & Creative Journal */}
      <InsightsSection
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* 7. Contact Section */}
      <ContactSection prefillService={prefillService} />

      {/* 8. Footer */}
      <Footer onOpenContact={() => handleOpenContact()} />

      {/* Floating AI Copilot Launcher */}
      {!isChatOpen && (
        <aside aria-label="Interactive Studio Copilot" className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            aria-label="Open Studio Copilot powered by Gemini"
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full border shadow-2xl active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <span className="relative flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
            </span>

            <div className="flex items-center gap-2">
              <Sparkles
                className="w-4 h-4 group-hover:rotate-12 transition-transform"
                style={{ color: 'var(--primary-accent)' }}
              />
              <span className="text-xs font-bold tracking-wide">Studio Copilot</span>
            </div>

            <span
              className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border font-semibold"
              style={{
                backgroundColor: 'var(--badge-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--primary-accent)',
              }}
            >
              Gemini
            </span>
          </button>
        </aside>
      )}

      {/* Multi-Turn Gemini AI Copilot */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenContact={handleOpenContact}
      />

      {/* Reusable Project Case Study Modal (All 12 sections + interactive stage) */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={handleOpenContact}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Editorial Article Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenContact={handleOpenContact}
      />
    </main>
  );
}
