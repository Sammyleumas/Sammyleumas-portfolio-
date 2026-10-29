import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Article, ARTICLES } from '../data/portfolioData';

interface InsightsSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onSelectArticle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const categories = [
    'All',
    'Artificial Intelligence',
    'UI/UX and Digital Design',
    'Web Development',
    'Building Digital Products',
  ];

  const total = ARTICLES.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    touchStartX.current = null;
  };

  // Filter interaction: selecting category scrolls carousel directly to that article
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') return;
    const targetIdx = ARTICLES.findIndex((a) => a.category === cat);
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
    }
  };

  return (
    <section
      id="insights"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#090A0F] border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background ambient flare */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[26rem] bg-[#818CF8]/6 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>INSIGHTS &amp; WRITING · 3D CAROUSEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
              Notes from the process.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-3 leading-relaxed">
              Reflections on creative technology, user experience, prompt engineering, and building resilient digital products.
            </p>
          </div>

          {/* Carousel Navigation Toolbar */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Toggle Autoplay"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Auto</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/15 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                aria-label="Previous Article"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/15 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                aria-label="Next Article"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-8 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="relative w-full h-[580px] sm:h-[620px] md:h-[660px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {ARTICLES.map((article: Article, index: number) => {
            // Calculate shortest signed distance on the 4-item ring [-2, -1, 0, 1, 2]
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === -1;
            const isBack = Math.abs(offset) >= 2;

            // 3D positioning transforms matching Services 3D stage
            let transform = 'translate3d(0, 0, -400px) scale(0.65)';
            let opacity = 0;
            let zIndex = 5;
            let filter = 'blur(3px)';
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isCenter) {
              transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
              opacity = 1;
              zIndex = 30;
              filter = 'blur(0px)';
              pointerEvents = 'auto';
            } else if (isRight) {
              transform = 'translate3d(min(320px, 32vw), 0, -180px) rotateY(-24deg) scale(0.88)';
              opacity = 0.55;
              zIndex = 20;
              filter = 'blur(0.5px)';
              pointerEvents = 'auto';
            } else if (isLeft) {
              transform = 'translate3d(max(-320px, -32vw), 0, -180px) rotateY(24deg) scale(0.88)';
              opacity = 0.55;
              zIndex = 20;
              filter = 'blur(0.5px)';
              pointerEvents = 'auto';
            } else if (isBack) {
              transform = 'translate3d(0, 0, -360px) rotateY(180deg) scale(0.72)';
              opacity = 0.15;
              zIndex = 10;
              filter = 'blur(2px)';
            }

            return (
              <div
                key={article.id}
                onClick={() => {
                  if (isCenter) {
                    onSelectArticle(article);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  !isCenter ? 'cursor-pointer hover:opacity-85' : ''
                }`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  pointerEvents,
                  transformStyle: 'preserve-3d',
                }}
              >
                <article
                  className={`p-6 sm:p-8 md:p-9 rounded-3xl bg-gradient-to-b from-[#141824]/95 to-[#0D101A]/95 border ${
                    isCenter
                      ? 'border-[#38BDF8]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] ring-1 ring-[#38BDF8]/20'
                      : 'border-white/10 shadow-xl'
                  } backdrop-blur-xl flex flex-col justify-between h-[520px] sm:h-[550px] md:h-[580px] group`}
                >
                  <div>
                    {/* Cover image & category badge */}
                    <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5 bg-[#12141C] border border-white/10 relative">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold border border-white/10">
                        {article.category}
                      </div>
                    </div>

                    {/* Metadata strip */}
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{article.publishedDate}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{article.readingTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Read Note Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                      <span>Journal Note</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectArticle(article);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>Read Note</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicators / Trackers */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            {ARTICLES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-8 bg-[#38BDF8]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to article ${idx + 1}`}
              />
            ))}
          </div>
          <div className="font-mono text-xs text-slate-500">
            0{activeIndex + 1} / 0{total} · Click active card to open full essay
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
