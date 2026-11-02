import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, Users } from 'lucide-react';
import { HERO_SLIDES } from '../data/games';

const SLIDE_DURATION = 6500;

export default function HeroCarousel({ onPlayFeatured, savedIds, onToggleSave }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, index]);

  const current = HERO_SLIDES[index];
  const isSaved = savedIds.includes(current.id);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-3.5"
    >
      {/* ===================================================================
          LEFT 9 COLUMNS: CINEMATIC AAA SHOWCASE STAGE
      ==================================================================== */}
      <div className="lg:col-span-9 relative h-[380px] sm:h-[430px] lg:h-[465px] rounded-2xl overflow-hidden bg-[#070410] border border-white/[0.1] shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.heroImage}
            alt={current.title}
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.15, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />
        </AnimatePresence>

        {/* Studio-grade multi-stop gradient vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(6,3,14,0.94) 0%, rgba(6,3,14,0.74) 38%, rgba(6,3,14,0.16) 72%, rgba(6,3,14,0.28) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(0deg, rgba(6,3,14,0.92) 0%, rgba(6,3,14,0.22) 45%, transparent 100%)',
          }}
        />

        {/* Editorial Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-9 lg:p-11 max-w-[620px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-[#8500FF]/35 border border-[#A855F7]/45 text-[#E9D5FF] text-[10.5px] font-bold tracking-[0.09em] uppercase">
                  {current.tag}
                </span>
                <span className="px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10.5px] font-bold tabular-nums">
                  {current.metacritic} METACRITIC
                </span>
                <span className="text-xs font-medium text-white/55">
                  {current.studio} · {current.genre}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-white font-extrabold text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.06] tracking-[-0.025em] mb-3">
                {current.title}
              </h1>

              {/* Synopsis */}
              <p className="text-white/70 text-[13.5px] sm:text-[14.5px] leading-relaxed mb-5 max-w-[520px] line-clamp-2 sm:line-clamp-3">
                {current.subtitle}
              </p>

              {/* Spec micro-line */}
              <div className="text-[11.5px] font-medium text-white/45 mb-5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-white/75 tabular-nums">
                  <Users className="w-3.5 h-3.5 text-[#A855F7]" />
                  {current.players} in-game
                </span>
                <span>·</span>
                <span className="truncate">{current.specs}</span>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    onPlayFeatured({
                      id: current.id,
                      title: current.title,
                      studio: current.studio,
                      category: current.genre,
                      players: current.players,
                      metacritic: current.metacritic,
                      year: current.year,
                      accessTag: current.tag,
                      image: current.image,
                      heroImage: current.heroImage,
                      description: current.subtitle,
                      controls: current.controls,
                    })
                  }
                  className="h-[44px] px-6 rounded-xl bg-white hover:bg-[#F3E8FF] text-[#090513] text-[13.5px] font-bold inline-flex items-center gap-2 transition shadow-[0_8px_28px_rgba(255,255,255,0.16)]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Now</span>
                </button>

                <button
                  onClick={() => onToggleSave(current.id)}
                  className={`h-[44px] px-5 rounded-xl backdrop-blur-md border text-[13px] font-semibold inline-flex items-center gap-2 transition ${
                    isSaved
                      ? 'bg-[#8500FF]/30 border-[#A855F7]/60 text-white'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] border-white/15 text-white'
                  }`}
                >
                  {isSaved ? <Check className="w-4 h-4 text-[#D8B4FE]" /> : <Plus className="w-4 h-4" />}
                  <span>{isSaved ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ===================================================================
          RIGHT 3 COLUMNS: EPIC-STYLE VERTICAL SWITCHER RAIL
      ==================================================================== */}
      <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-1 gap-2">
        {HERO_SLIDES.map((slide, idx) => {
          const active = idx === index;
          return (
            <button
              key={slide.id}
              onClick={() => setIndex(idx)}
              className={`relative group rounded-xl p-2.5 flex items-center gap-3 text-left overflow-hidden transition-all border ${
                active
                  ? 'bg-white/[0.12] border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
                  : 'bg-[#0B0617]/55 hover:bg-white/[0.07] border-white/[0.06]'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-12 sm:w-14 h-14 sm:h-16 lg:w-16 lg:h-[58px] rounded-lg object-cover shrink-0 ring-1 ring-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1 hidden sm:block lg:block">
                <div
                  className={`text-[12.5px] font-semibold leading-snug line-clamp-2 ${
                    active ? 'text-white' : 'text-white/75 group-hover:text-white'
                  }`}
                >
                  {slide.title}
                </div>
                <div className="text-[11px] text-white/40 truncate mt-0.5">
                  {slide.studio}
                </div>
              </div>

              {/* Mobile compact title */}
              <div className="min-w-0 flex-1 sm:hidden">
                <div className="text-xs font-semibold text-white truncate">{slide.title}</div>
                <div className="text-[10px] text-white/45 truncate">{slide.studio}</div>
              </div>

              {/* Animated Progress Sweep along bottom of active item */}
              {active && !isPaused && (
                <motion.div
                  key={`prog-${slide.id}-${index}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8500FF] via-[#C084FC] to-white"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
