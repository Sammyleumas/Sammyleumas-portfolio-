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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-4xl border rounded-3xl p-6 sm:p-10 max-h-[94vh] overflow-y-auto shadow-2xl transition-colors"
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
              aria-label="Close article"
              className="absolute top-6 right-6 p-2 rounded-full border transition-colors z-20 cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Back Link */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors mb-6 cursor-pointer font-bold"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights</span>
            </button>

            {/* Article Header */}
            <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div
                className="flex flex-wrap items-center gap-3 text-xs font-mono mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span
                  className="uppercase tracking-wider font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    color: 'var(--primary-accent)',
                  }}
                >
                  {article.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 opacity-60" />
                  <span>{article.publishedDate}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 opacity-60" />
                  <span>{article.readingTime}</span>
                </span>
              </div>

              <h1
                className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {article.title}
              </h1>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--primary-accent)',
                    }}
                  >
                    SL
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                      Sammy Leumas
                    </div>
                    <div className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                      Author · Creative Technologist
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-success)' }} />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div
              className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Introduction Quote */}
            <div
              className="p-6 rounded-2xl border-l-4 text-base sm:text-lg font-medium leading-relaxed mb-8 italic"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderLeftColor: 'var(--primary-accent)',
                color: 'var(--text-primary)',
              }}
            >
              &ldquo;{article.content.intro}&rdquo;
            </div>

            {/* Body Sections */}
            <div className="space-y-8 mb-12">
              {article.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                    {section.heading}
                  </h3>
                  <p
                    className="text-sm sm:text-base font-normal leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div
              className="p-6 rounded-2xl border mb-10"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <h4
                className="text-xs font-mono uppercase tracking-wider mb-3 font-bold"
                style={{ color: 'var(--primary-accent)' }}
              >
                Key Practitioner Takeaways
              </h4>
              <ul className="space-y-2.5">
                {article.content.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="font-bold" style={{ color: 'var(--color-success)' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Have thoughts or a challenge related to this topic?
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact(`Discussion regarding article: ${article.title}`);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--primary-accent)' }}
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
