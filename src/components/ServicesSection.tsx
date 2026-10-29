import React, { useState, useEffect, useRef } from 'react';
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

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#38BDF8]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#818CF8]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#F43F5E]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      default:
        return <Code2 className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#0A0B10] border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[25rem] bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>SERVICES &amp; EXPERTISE · 3D CAROUSEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
              Creative solutions, built around your goals.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-3 leading-relaxed">
              Every offering is tailored to deliver measurable utility, exceptional visual polish, and clean production architecture.
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
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/15 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
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
          {SERVICES.map((service: Service, index: number) => {
            // Calculate shortest signed distance on the ring [-2, -1, 0, 1, 2]
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === -1;
            const isBack = Math.abs(offset) >= 2;

            // 3D positioning transforms
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
                  className={`p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#141824]/95 to-[#0D101A]/95 border ${
                    isCenter
                      ? 'border-[#38BDF8]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] ring-1 ring-[#38BDF8]/20'
                      : 'border-white/10 shadow-xl'
                  } backdrop-blur-xl flex flex-col justify-between h-[520px] sm:h-[550px] md:h-[580px]`}
                >
                  <div>
                    {/* Header with Number and Icon */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        {getIcon(service.icon)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#38BDF8] font-semibold uppercase tracking-wider">
                          SERVICE
                        </span>
                        <span className="font-mono text-base font-bold text-white">
                          {service.number}
                        </span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                        What this offering encompasses:
                      </span>
                      {service.offerings.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Functional CTA Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenContact(service.title);
                      }}
                      className="w-full py-3.5 px-5 rounded-2xl bg-white text-slate-900 hover:bg-slate-200 active:scale-95 font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-between cursor-pointer shadow-md"
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
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-8 bg-[#38BDF8]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="font-mono text-xs text-slate-500">
            0{activeIndex + 1} / 0{total} · Click flanking cards or swipe to rotate
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
