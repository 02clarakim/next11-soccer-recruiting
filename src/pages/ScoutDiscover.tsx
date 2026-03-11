import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import PlayerCard from "@/components/PlayerCard";
import { mockPlayers } from "@/lib/mock-data";
import { Filter, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const positions = ["All", "CAM", "ST", "LB", "CDM", "GK", "CB", "RW", "LW"];
const years = ["All", "2025", "2026", "2027"];
const sortOptions = ["Newest", "Most Viewed"];

const ScoutDiscover = () => {
  const navigate = useNavigate();
  const [posFilter, setPosFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Load saved IDs from localStorage for persistence during session
  useEffect(() => {
    const saved = localStorage.getItem("scout_saved_players");
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  const handleSave = (id: string) => {
    setSavedIds(prev => {
      const newSaved = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem("scout_saved_players", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const filtered = mockPlayers
    .filter((p) => posFilter === "All" || p.position === posFilter)
    .filter((p) => yearFilter === "All" || p.year === yearFilter)
    .sort((a, b) => sort === "Most Viewed" ? b.profileViews - a.profileViews : 0);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Discover Talent
          </h1>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-display">Position</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosFilter(pos)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    posFilter === pos ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
            <div className="h-6 w-px bg-border/50 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-display">Year</span>
              <div className="flex gap-1">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYearFilter(y)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      yearFilter === y ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-border/50 hidden md:block" />
            <div className="flex gap-1">
              {sortOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    sort === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Discovery Feed - Card + Video side by side */}
        <div className="space-y-8">
          {filtered.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <PlayerCard 
                player={player} 
                onViewProfile={(id) => navigate(`/scout/player/${id}`)}
                onSave={handleSave}
                isSaved={savedIds.includes(player.id)}
              />
              
              {/* Pinned Video */}
              <div className="flex-1 w-full">
              <div className="glass-card overflow-hidden">
                  <div className="aspect-video bg-secondary/30 relative">
                    <iframe
                      src="https://www.youtube.com/embed/RANzfjekkAw"
                      title={player.videos.find(v => v.isPinned)?.title || "Highlight Reel"}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {player.videos.find(v => v.isPinned)?.title || "Highlight Reel"}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Eye className="w-3 h-3" />
                      {(player.videos.find(v => v.isPinned)?.views || 0).toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-display text-lg">No players match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoutDiscover;
