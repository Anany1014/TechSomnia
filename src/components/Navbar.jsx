import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, X, Bookmark, Menu } from 'lucide-react';
import { PlaynovaLogoIcon } from './ArcadeIcons';

const NAV_ITEMS = [
  { id: 'Discover', label: 'Discover' },
  { id: 'Categories', label: 'Browse' },
  { id: 'Trending', label: 'Most Played' },
  { id: 'Top Rated', label: 'Top Rated' },
];

export default function Navbar({
  activeNav,
  onSelectNav,
  searchQuery,
  onSearchChange,
  searchResults,
  onPlayGame,
  onPlayRandom,
  savedIds,
  onOpenVault,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06030F]/68 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => {
              onSelectNav('Discover');
              onSearchChange('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          >
            <PlaynovaLogoIcon className="w-9 h-7" />
            <span className="text-white font-extrabold text-[17px] tracking-[0.09em] uppercase">
              PLAYNOVA
            </span>
          </button>

          {/* Primary Storefront Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={`relative py-2 text-[13.5px] font-medium tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-white/55 hover:text-white/90'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                      className="absolute left-0 right-0 -bottom-[15px] h-[2px] bg-[#A855F7]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center / Right Search + Library Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end max-w-[620px]">
          <div className="relative flex-1 max-w-[340px]">
            <Search className="w-3.5 h-3.5 text-white/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search titles, studios, genres..."
              className="w-full h-[38px] pl-9 pr-12 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] focus:bg-[#120924]/90 border border-white/[0.09] focus:border-[#A855F7]/70 text-[13px] text-white placeholder-white/40 outline-none transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/50 hover:text-white transition"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-white/40 bg-white/[0.06] border border-white/[0.08] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                ⌘K
              </kbd>
            )}

            {/* Instant Search Results Popover */}
            <AnimatePresence>
              {searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.14 }}
                  className="absolute left-0 right-0 top-[46px] bg-[#0D071B]/96 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden z-50"
                >
                  <div className="px-3.5 py-2 border-b border-white/[0.07] flex items-center justify-between text-[11px] text-white/45">
                    <span>Catalog Results ({searchResults.length})</span>
                    <span>Instant Cloud Launch</span>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-5 text-center text-xs text-white/50">
                      No matching titles for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto divide-y divide-white/[0.05]">
                      {searchResults.slice(0, 6).map((game) => (
                        <button
                          key={game.id}
                          onClick={() => {
                            onPlayGame(game);
                            onSearchChange('');
                          }}
                          className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-white/[0.06] transition text-left group"
                        >
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-14 h-8 rounded-md object-cover shrink-0 ring-1 ring-white/10"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-semibold text-white truncate">
                              {game.title}
                            </div>
                            <div className="text-[11px] text-white/45 truncate">
                              {game.studio} · {game.category}
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#C084FC] opacity-0 group-hover:opacity-100 transition">
                            Launch →
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Saved Library Button */}
          <button
            onClick={onOpenVault}
            className="hidden sm:inline-flex h-[38px] px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/[0.09] items-center gap-2 text-[12.5px] font-medium text-white/85 transition shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>Wishlist</span>
            {savedIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-md bg-[#8500FF]/40 text-[#E9D5FF] text-[11px] font-semibold tabular-nums">
                {savedIds.length}
              </span>
            )}
          </button>

          {/* Primary Instant Launch CTA */}
          <button
            onClick={onPlayRandom}
            className="hidden md:inline-flex h-[38px] px-4 rounded-xl bg-white hover:bg-[#F3E8FF] text-[#090513] text-[12.5px] font-bold items-center gap-1.5 transition shrink-0 shadow-[0_4px_20px_rgba(255,255,255,0.14)]"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Quick Play</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.07] text-white border border-white/10"
            aria-label="Toggle Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0A0516]/95 border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-wrap gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeNav === item.id
                      ? 'bg-white text-[#090513]'
                      : 'bg-white/[0.06] text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenVault();
                  setMobileMenuOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.06] text-[#E9D5FF]"
              >
                Wishlist ({savedIds.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
