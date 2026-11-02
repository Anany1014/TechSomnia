import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, ChevronRight, Bookmark } from 'lucide-react';

export function ArcadeCard({ game, index = 0, onPlay, isSaved, onToggleSave }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.22), ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onPlay(game)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer studio-card flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      {/* Official 16:9 Key Art Capsule */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#090514]">
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle bottom contrast fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080412]/80 via-transparent to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />

        {/* Top-Left Access / Spec Tag */}
        {game.accessTag && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#090514]/80 backdrop-blur-md border border-white/12 text-[10px] font-semibold tracking-wider uppercase text-white/90">
            {game.accessTag}
          </span>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(game.id);
          }}
          aria-label="Toggle Wishlist"
          className={`absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-lg backdrop-blur-md flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#8500FF] text-white opacity-100 border border-[#C084FC]/50'
              : 'bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-white/20 border border-white/10'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Launch Pill */}
        <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <span className="px-3 py-1 rounded-lg bg-white text-[#090513] text-[11px] font-bold inline-flex items-center gap-1 shadow-lg">
            <Play className="w-2.5 h-2.5 fill-current" />
            Play
          </span>
        </div>
      </div>

      {/* Editorial Metadata Footer */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-medium text-white/45 truncate mb-0.5">
            {game.studio}
          </div>
          <h3 className="text-[14.5px] font-bold text-white group-hover:text-[#E9D5FF] transition-colors leading-snug line-clamp-1 mb-2.5">
            {game.title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-white/[0.06] text-white/70 text-[10.5px] font-medium">
              {game.category}
            </span>
            {game.metacritic && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/12 border border-emerald-400/25 text-emerald-300 text-[10px] font-bold tabular-nums">
                {game.metacritic}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-white/50 text-[11px] font-medium tabular-nums">
            <Users className="w-3 h-3 text-[#A855F7]" />
            <span>{game.players}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CuratedEditorialCard({ game, index = 0, onPlay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onPlay(game)}
      className="group relative h-[158px] rounded-2xl overflow-hidden cursor-pointer border border-white/[0.09] hover:border-[#A855F7]/55 bg-[#090514] shadow-[0_14px_34px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1"
    >
      <img
        src={game.image}
        alt={game.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,4,18,0.12) 0%, rgba(8,4,18,0.55) 52%, rgba(8,4,18,0.94) 100%)',
        }}
      />

      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/80 tabular-nums">
        {game.metacritic} MC · {game.players}
      </div>

      <div className="absolute bottom-3 left-3.5 right-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10.5px] font-medium text-white/55 truncate">
            {game.studio}
          </div>
          <h4 className="text-[14px] font-bold text-white group-hover:text-[#E9D5FF] truncate leading-tight">
            {game.title}
          </h4>
        </div>

        <span className="w-7 h-7 rounded-lg bg-white/12 group-hover:bg-white text-white group-hover:text-[#090513] flex items-center justify-center shrink-0 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </motion.article>
  );
}
