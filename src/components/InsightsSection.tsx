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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

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
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 border-t overflow-hidden select-none transition-colors"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with BIG FONT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3 font-bold">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
              <span style={{ color: 'var(--primary-accent)' }}>
                INSIGHTS &amp; WRITING · 3D CAROUSEL
              </span>
            </div>
            {/* BIG FONT FOR SECTION */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight big-section-title"
              style={{ color: 'var(--text-primary)' }}
            >
              Notes from the process.
            </h2>
            <p
              className="text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Reflections on creative technology, user experience, prompt engineering, and building resilient digital products.
            </p>
          </div>

          {/* Carousel Navigation Toolbar */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle Autoplay"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" style={{ color: 'var(--primary-accent)' }} />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Auto</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Previous Article"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Next Article"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Pill Filters */}
        <div
          className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl border mb-8 max-w-fit"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--primary-accent)' : 'transparent',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
              }}
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
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === -1;
            const isBack = Math.abs(offset) >= 2;

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
                  className="p-6 sm:p-8 md:p-9 rounded-3xl border backdrop-blur-xl flex flex-col justify-between h-[520px] sm:h-[550px] md:h-[580px] group"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: isCenter ? 'var(--primary-accent)' : 'var(--border-color)',
                    boxShadow: isCenter ? 'var(--card-shadow)' : 'none',
                  }}
                >
                  <div>
                    {/* Cover image & category badge */}
                    <div
                      className="rounded-2xl overflow-hidden aspect-[16/9] mb-5 border relative"
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderColor: 'var(--border-color)',
                      }}
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-mono uppercase tracking-wider font-bold border shadow-sm"
                        style={{
                          backgroundColor: 'var(--surface-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--primary-accent)',
                        }}
                      >
                        {article.category}
                      </div>
                    </div>

                    {/* Metadata strip */}
                    <div
                      className="flex items-center gap-3 text-xs font-mono mb-2.5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
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

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl font-black mb-3 group-hover:opacity-85 transition-opacity line-clamp-2 leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p
                      className="text-xs sm:text-sm font-normal leading-relaxed line-clamp-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {article.summary}
                    </p>
                  </div>

                  {/* Read Note Action Footer */}
                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      <BookOpen className="w-4 h-4" style={{ color: 'var(--primary-accent)' }} />
                      <span>Journal Note</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectArticle(article);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
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
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: activeIndex === idx ? '32px' : '8px',
                  backgroundColor: activeIndex === idx ? 'var(--primary-accent)' : 'var(--border-color)',
                }}
                aria-label={`Go to article ${idx + 1}`}
              />
            ))}
          </div>
          <div className="font-mono text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            0{activeIndex + 1} / 0{total} · Click active card to open full essay
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
