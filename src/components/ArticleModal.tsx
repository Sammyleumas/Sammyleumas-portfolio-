import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, ArrowRight, Share2, Check, ArrowLeft } from 'lucide-react';
import { Article } from '../data/portfolioData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenContact: (prefill?: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0D0F17] border border-white/15 rounded-3xl p-6 sm:p-10 text-slate-200 max-h-[94vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close article"
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Back Link */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </button>

        {/* Article Header */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
            <span className="text-[#38BDF8] uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                SL
              </div>
              <div>
                <div className="text-xs font-bold text-white">Sammy Leumas</div>
                <div className="text-[10px] text-slate-400 font-mono">Author · Creative Technologist</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-white/10 bg-black">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Introduction Quote */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border-l-2 border-[#38BDF8] text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 italic">
          &ldquo;{article.content.intro}&rdquo;
        </div>

        {/* Body Sections */}
        <div className="space-y-8 mb-12">
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {section.heading}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 mb-10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3 font-semibold">
            Key Practitioner Takeaways
          </h4>
          <ul className="space-y-2.5">
            {article.content.takeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="text-[#38BDF8] font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Have thoughts or a challenge related to this topic?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact(`Discussion regarding article: ${article.title}`);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer shadow-md"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

export default ArticleModal;
