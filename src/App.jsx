import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Play,
  Bookmark,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import LiquidBackground from './components/LiquidBackground';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import { ArcadeCard, CuratedEditorialCard } from './components/ArcadeCard';
import GameStageModal from './components/GameStageModal';
import {
  CATEGORIES,
  TRENDING_GAMES,
  CURATED_FOR_YOU,
  CATALOG_GAMES,
  ALL_GAMES,
} from './data/games';

export default function App() {
  const [activeNav, setActiveNav] = useState('Discover');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('players');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState(null);
  const [savedIds, setSavedIds] = useState(['black-myth-wukong', 'cyberpunk-2077', 'elden-ring']);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showExpandedTrending, setShowExpandedTrending] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [recentHistory, setRecentHistory] = useState([
    { game: CATALOG_GAMES[0], hours: '38.4 hrs on record', timeAgo: '2h ago' },
    { game: TRENDING_GAMES[0], hours: '64.2 hrs on record', timeAgo: 'Yesterday' },
    { game: CURATED_FOR_YOU[2], hours: '192.0 hrs on record', timeAgo: '3d ago' },
  ]);

  const browseRef = useRef(null);
  const catalogRef = useRef(null);

  const handlePlayGame = (game) => {
    setActiveGame(game);
    setRecentHistory((prev) => {
      const existing = prev.find((item) => item.game.id === game.id);
      const filtered = prev.filter((item) => item.game.id !== game.id);
      return [
        {
          game,
          hours: existing ? existing.hours : '12.5 hrs on record',
          timeAgo: 'Just now',
        },
        ...filtered,
      ].slice(0, 5);
    });
  };

  const handlePlayRandom = () => {
    const pick = ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)];
    handlePlayGame(pick);
  };

  const handleToggleSave = (gameId) => {
    setSavedIds((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const handleSelectNav = (navId) => {
    setActiveNav(navId);
    if (navId === 'Discover') {
      setSelectedCategory('All');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (navId === 'Categories') {
      browseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (navId === 'Trending') {
      setSortBy('players');
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (navId === 'Top Rated') {
      setSortBy('metacritic');
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_GAMES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.studio.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.filterTags && g.filterTags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  const filteredCategoryGames = useMemo(() => {
    if (selectedCategory === 'All') return null;
    return ALL_GAMES.filter(
      (g) =>
        g.category === selectedCategory ||
        (g.filterTags && g.filterTags.includes(selectedCategory))
    );
  }, [selectedCategory]);

  const sortedCatalog = useMemo(() => {
    const list = [...ALL_GAMES];
    if (sortBy === 'metacritic') {
      return list.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
    }
    return list.sort((a, b) => (b.playersNum || 0) - (a.playersNum || 0));
  }, [sortBy]);

  const savedGames = useMemo(
    () => ALL_GAMES.filter((g) => savedIds.includes(g.id)),
    [savedIds]
  );

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#8500FF] selection:text-white">
      {/* Moving Liquid Black-to-Electric-Purple Silk Background (image-1.jpeg) */}
      <LiquidBackground />

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchResults={searchResults}
          onPlayGame={handlePlayGame}
          onPlayRandom={handlePlayRandom}
          savedIds={savedIds}
          onOpenVault={() => setVaultOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="flex-1 max-w-[1420px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16 space-y-10">
          {/* 1. Asymmetric AAA Hero Showcase + Live Switcher Rail */}
          <section aria-label="Featured Releases">
            <HeroCarousel
              onPlayFeatured={handlePlayGame}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
            />
          </section>

          {/* 2. Minimalist Genre Filter Strip */}
          <section ref={browseRef} aria-label="Browse Genres">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-[40px] px-4 rounded-xl text-[13px] font-semibold whitespace-nowrap inline-flex items-center gap-2 transition-all border ${
                      active
                        ? 'bg-white text-[#090513] border-white shadow-[0_6px_22px_rgba(255,255,255,0.14)]'
                        : 'studio-panel text-white/75 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] tabular-nums ${
                        active ? 'text-[#090513]/55 font-bold' : 'text-white/35'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Filtered Category View OR Full Editorial Storefront */}
          <AnimatePresence mode="wait">
            {selectedCategory !== 'All' ? (
              <motion.section
                key={`cat-${selectedCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-[20px] font-bold tracking-[-0.02em] text-white">
                      {selectedCategory}
                    </h2>
                    <span className="text-xs text-white/45 tabular-nums">
                      {filteredCategoryGames.length} titles available
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-xs font-semibold text-white/65 hover:text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset Filter
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredCategoryGames.map((game, idx) => (
                    <ArcadeCard
                      key={game.id}
                      game={game}
                      index={idx}
                      onPlay={handlePlayGame}
                      isSaved={savedIds.includes(game.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </motion.section>
            ) : (
              <motion.div
                key="editorial-home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* 3. TRENDING RIGHT NOW (5-Column Storefront Row) */}
                <section aria-labelledby="trending-heading">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h2
                        id="trending-heading"
                        className="text-[20px] sm:text-[21px] font-bold tracking-[-0.02em] text-white"
                      >
                        Popular Right Now
                      </h2>
                      <p className="text-xs text-white/45 mt-0.5">
                        Most active cloud-streamed titles in the past 24 hours
                      </p>
                    </div>

                    <button
                      onClick={() => setShowExpandedTrending((prev) => !prev)}
                      className="group text-white/70 hover:text-white text-[13px] font-semibold inline-flex items-center gap-1.5 transition"
                    >
                      <span>{showExpandedTrending ? 'Show fewer' : 'View all'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {(showExpandedTrending
                      ? [...TRENDING_GAMES, ...CATALOG_GAMES.slice(0, 5)]
                      : TRENDING_GAMES
                    ).map((game, idx) => (
                      <ArcadeCard
                        key={game.id}
                        game={game}
                        index={idx}
                        onPlay={handlePlayGame}
                        isSaved={savedIds.includes(game.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                </section>

                {/* 4. SPLIT ROW: CURATED FOR YOU + JUMP BACK IN (RECENTLY PLAYED) */}
                <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                  {/* Left 9 cols: Curated For You */}
                  <div className="xl:col-span-9">
                    <div className="mb-4">
                      <h2 className="text-[20px] sm:text-[21px] font-bold tracking-[-0.02em] text-white">
                        Critically Acclaimed
                      </h2>
                      <p className="text-xs text-white/45 mt-0.5">
                        Award-winning releases verified for 4K 120Hz cloud play
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {CURATED_FOR_YOU.map((game, idx) => (
                        <CuratedEditorialCard
                          key={game.id}
                          game={game}
                          index={idx}
                          onPlay={handlePlayGame}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right 3 cols: Jump Back In / Recently Played */}
                  <div className="xl:col-span-3">
                    <div className="studio-panel rounded-2xl p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#C084FC]" />
                          <h3 className="text-[15px] font-bold text-white">
                            Recently Played
                          </h3>
                        </div>

                        <button
                          onClick={() => setShowAllRecent((prev) => !prev)}
                          className="text-xs font-semibold text-white/55 hover:text-white transition"
                        >
                          {showAllRecent ? 'Collapse' : 'History'}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(showAllRecent ? recentHistory : recentHistory.slice(0, 2)).map(
                          (entry) => (
                            <div
                              key={entry.game.id}
                              onClick={() => handlePlayGame(entry.game)}
                              className="group flex items-center justify-between gap-3 p-2 -mx-2 rounded-xl hover:bg-white/[0.06] cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={entry.game.image}
                                  alt={entry.game.title}
                                  className="w-[72px] h-[44px] rounded-lg object-cover shrink-0 ring-1 ring-white/10"
                                />
                                <div className="min-w-0">
                                  <div className="text-[13px] font-semibold text-white group-hover:text-[#E9D5FF] truncate transition-colors">
                                    {entry.game.title}
                                  </div>
                                  <div className="text-[11px] text-white/40 truncate tabular-nums">
                                    {entry.timeAgo} · {entry.hours}
                                  </div>
                                </div>
                              </div>

                              <button
                                aria-label={`Resume ${entry.game.title}`}
                                className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white text-white group-hover:text-[#090513] flex items-center justify-center shrink-0 transition"
                              >
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. FULL CATALOG BROWSE WITH SORTING */}
          <section ref={catalogRef} className="pt-2">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <div>
                <h2 className="text-[20px] sm:text-[21px] font-bold tracking-[-0.02em] text-white">
                  All Cloud-Ready Titles
                </h2>
                <p className="text-xs text-white/45 mt-0.5">
                  Instant browser & desktop streaming — no local installation required
                </p>
              </div>

              <div className="flex items-center gap-1.5 studio-panel p-1 rounded-xl">
                <SlidersHorizontal className="w-3.5 h-3.5 text-white/40 ml-2 mr-1" />
                {[
                  { id: 'players', label: 'Most Played' },
                  { id: 'metacritic', label: 'Highest Rated' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      sortBy === opt.id
                        ? 'bg-white text-[#090513]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedCatalog.slice(0, 12).map((game, idx) => (
                <ArcadeCard
                  key={game.id}
                  game={game}
                  index={idx}
                  onPlay={handlePlayGame}
                  isSaved={savedIds.includes(game.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Minimalist Professional Footer */}
        <footer className="border-t border-white/[0.08] bg-[#05020C]/70 backdrop-blur-xl">
          <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white tracking-wider uppercase">
                PLAYNOVA
              </span>
              <span>·</span>
              <span>Cloud Gaming Storefront & Library</span>
            </div>
            <div className="flex items-center gap-5 tabular-nums">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                All Regions Operational (11ms)
              </span>
              <span>RTX 4080 Cloud Nodes</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {vaultOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVaultOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0B0617]/98 text-white h-full border-l border-white/10 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-[#C084FC]" />
                  <h3 className="font-bold text-base">Saved Wishlist ({savedGames.length})</h3>
                </div>
                <button
                  onClick={() => setVaultOpen(false)}
                  className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/15"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-5 space-y-2.5">
                {savedGames.length === 0 ? (
                  <div className="p-8 rounded-xl bg-white/[0.03] border border-white/[0.07] text-center text-xs text-white/50">
                    Bookmark any title in the store to keep it in your wishlist.
                  </div>
                ) : (
                  savedGames.map((g) => (
                    <div
                      key={g.id}
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between gap-3 transition"
                    >
                      <div
                        onClick={() => {
                          setVaultOpen(false);
                          handlePlayGame(g);
                        }}
                        className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                      >
                        <img
                          src={g.image}
                          alt={g.title}
                          className="w-16 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-white truncate">
                            {g.title}
                          </div>
                          <div className="text-[11px] text-white/45 truncate">
                            {g.studio} · {g.category}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setVaultOpen(false);
                          handlePlayGame(g);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white text-[#090513] text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" /> Play
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloud Stream Session Modal */}
      <GameStageModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
        allGames={ALL_GAMES}
        onSwitchGame={handlePlayGame}
        isSaved={activeGame ? savedIds.includes(activeGame.id) : false}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
}
