import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Bookmark,
  Monitor,
  Wifi,
  Cpu,
} from 'lucide-react';

export default function GameStageModal({
  game,
  onClose,
  allGames,
  onSwitchGame,
  isSaved,
  onToggleSave,
}) {
  const [connecting, setConnecting] = useState(true);
  const [progress, setProgress] = useState(24);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [preset, setPreset] = useState('4K 120Hz');
  const stageRef = useRef(null);

  useEffect(() => {
    if (!game) return;
    setConnecting(true);
    setProgress(28);
    setIsPaused(false);

    const t1 = setTimeout(() => setProgress(74), 160);
    const t2 = setTimeout(() => setProgress(100), 340);
    const t3 = setTimeout(() => setConnecting(false), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [game?.id]);

  useEffect(() => {
    if (!game) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [game, onClose]);

  if (!game) return null;

  const handleFullscreen = () => {
    if (!stageRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      stageRef.current.requestFullscreen?.();
    }
  };

  const relatedGames = allGames.filter((g) => g.id !== game.id).slice(0, 5);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/82 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1040px] rounded-2xl bg-[#0B0716]/96 border border-white/[0.12] shadow-[0_32px_90px_rgba(0,0,0,0.85)] overflow-hidden text-white my-auto"
        >
          {/* Top Session Header */}
          <div className="px-5 py-3.5 bg-[#07040F] border-b border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-bold text-[15px] sm:text-base text-white truncate">
                    {game.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-white/[0.07] text-white/75 text-[10.5px] font-medium">
                    {game.studio}
                  </span>
                </div>
                <div className="text-[11px] text-white/45 flex items-center gap-3 mt-0.5 tabular-nums">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Cloud Rig Active · 11ms
                  </span>
                  <span>·</span>
                  <span>RTX 4080 Super Pod</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Stream Quality Selector */}
              <div className="hidden md:flex items-center bg-white/[0.05] rounded-lg p-0.5 border border-white/[0.08] mr-1.5">
                {['1080p 240Hz', '4K 120Hz'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPreset(mode)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                      preset === mode ? 'bg-white text-[#090513]' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPaused((p) => !p)}
                title={isPaused ? 'Resume Stream' : 'Pause Stream'}
                className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 transition"
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                title={muted ? 'Unmute' : 'Mute'}
                className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 transition"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleFullscreen}
                title="Fullscreen"
                className="hidden sm:flex p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 transition"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close session"
                className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/20 text-white transition ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cloud Stream Viewport */}
          <div
            ref={stageRef}
            className="relative aspect-[16/9] max-h-[480px] w-full bg-[#05030B] overflow-hidden select-none"
          >
            <motion.img
              src={game.heroImage || game.image}
              alt={game.title}
              animate={{ scale: isPaused ? 1.01 : [1.01, 1.045, 1.01] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className={`w-full h-full object-cover transition-all duration-500 ${
                connecting || isPaused ? 'brightness-50 blur-[2px]' : 'brightness-95'
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07040F] via-transparent to-black/35 pointer-events-none" />

            {/* Fast Handshake Overlay */}
            <AnimatePresence>
              {connecting && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-[#07040F]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-white/55 mb-1.5">
                    Allocating RTX 4080 Instance
                  </div>
                  <div className="text-lg font-bold text-white mb-5">{game.title}</div>
                  <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: '20%' }}
                      animate={{ width: `${progress}%` }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clean Telemetry Overlay */}
            {!connecting && (
              <>
                <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[11px] font-medium tabular-nums">
                  <div className="px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 flex items-center gap-3 text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-[#C084FC]" />
                      {preset}
                    </span>
                    <span className="text-white/25">|</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      0.2% Packet Loss
                    </span>
                    <span className="text-white/25 hidden sm:inline">|</span>
                    <span className="hidden sm:inline-flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-sky-400" />
                      75 Mbps HEVC
                    </span>
                  </div>

                  {game.metacritic && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-bold">
                      {game.metacritic} Metacritic
                    </div>
                  )}
                </div>

                {isPaused && (
                  <div className="absolute inset-0 z-20 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-1">
                      Session Paused
                    </div>
                    <div className="text-xl font-bold text-white mb-4">{game.title}</div>
                    <button
                      onClick={() => setIsPaused(false)}
                      className="px-5 py-2.5 rounded-xl bg-white text-[#090513] text-xs font-bold flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Resume Stream
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Metadata, Input Bindings & Quick Switcher */}
          <div className="p-5 sm:p-6 bg-[#0B0716] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="text-xs font-semibold text-white/45 mb-1.5">
                {game.studio} · {game.category} · {game.players} Concurrent Players
              </div>
              <p className="text-[13.5px] text-white/75 leading-relaxed mb-4">
                {game.description}
              </p>

              {/* Keybind Reference */}
              <div className="flex flex-wrap items-center gap-2">
                {(game.controls || []).map((ctrl, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-2 text-xs"
                  >
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] text-white font-semibold text-[10.5px]">
                      {ctrl.key}
                    </kbd>
                    <span className="text-white/55">{ctrl.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onToggleSave(game.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                    isSaved
                      ? 'bg-[#8500FF]/30 text-white border-[#A855F7]/60'
                      : 'bg-white/[0.06] text-white/85 border-white/10 hover:bg-white/[0.12]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-2">
                  Switch Cloud Session
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {relatedGames.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSwitchGame(item)}
                      title={item.title}
                      className="group relative aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-white/12 hover:ring-2 hover:ring-white transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
