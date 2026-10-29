import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Layout,
  Palette,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { SERVICES, Service } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenContact: (prefillService?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const total = SERVICES.length;

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
    }, 5000);
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />;
      case 'Layout':
        return <Layout className="w-6 h-6" style={{ color: 'var(--accent-hover)' }} />;
      case 'Palette':
        return <Palette className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      default:
        return <Code2 className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />;
    }
  };

  return (
    <section
      id="services"
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
                SERVICES &amp; EXPERTISE · 3D CAROUSEL
              </span>
            </div>
            {/* BIG FONT FOR SECTION */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight big-section-title"
              style={{ color: 'var(--text-primary)' }}
            >
              Creative solutions, built around your goals.
            </h2>
            <p
              className="text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every offering is engineered to deliver measurable utility, distinct visual polish, and resilient production code.
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
                aria-label="Previous Service"
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
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3D Carousel Stage */}
        <div
          className="relative w-full h-[580px] sm:h-[620px] md:h-[660px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {SERVICES.map((service: Service, index: number) => {
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
                key={service.id}
                onClick={() => {
                  if (!isCenter) {
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
                <div
                  className="p-6 sm:p-8 md:p-10 rounded-3xl border backdrop-blur-xl flex flex-col justify-between h-[520px] sm:h-[550px] md:h-[580px]"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: isCenter ? 'var(--primary-accent)' : 'var(--border-color)',
                    boxShadow: isCenter ? 'var(--card-shadow)' : 'none',
                  }}
                >
                  <div>
                    {/* Header with Number and Icon */}
                    <div
                      className="flex items-center justify-between mb-6 pb-4 border-b"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        {getIcon(service.icon)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-xs font-bold uppercase tracking-wider"
                          style={{ color: 'var(--primary-accent)' }}
                        >
                          SERVICE
                        </span>
                        <span
                          className="font-mono text-base font-black px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: 'var(--surface-secondary)',
                            color: 'var(--primary-accent)',
                          }}
                        >
                          {service.number}
                        </span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3
                      className="text-2xl sm:text-3xl font-black mb-3 tracking-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-sm font-normal leading-relaxed mb-6"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div
                      className="space-y-2.5 mb-6 pt-4 border-t"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <span
                        className="text-[11px] font-mono uppercase tracking-wider block mb-2 font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        What this offering encompasses:
                      </span>
                      {service.offerings.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <Check
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: 'var(--color-success)' }}
                          />
                          <span
                            className="line-clamp-1 font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Functional CTA Button */}
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenContact(service.title);
                      }}
                      className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-between cursor-pointer shadow-md hover:scale-[1.01] active:scale-95"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
                    >
                      <span>Discuss a Project in {service.title.split(' ')[0]}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicators / Trackers */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: activeIndex === idx ? '32px' : '8px',
                  backgroundColor: activeIndex === idx ? 'var(--primary-accent)' : 'var(--border-color)',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="font-mono text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            0{activeIndex + 1} / 0{total} · Click flanking cards or swipe to rotate
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
