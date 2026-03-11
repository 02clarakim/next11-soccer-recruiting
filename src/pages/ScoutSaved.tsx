import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import PlayerCard from "@/components/PlayerCard";
import { mockPlayers } from "@/lib/mock-data";
import { Bookmark, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScoutSaved = () => {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("scout_saved_players");
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  const handleSave = (id: string) => {
    setSavedIds(prev => {
      const newSaved = prev.filter(i => i !== id);
      localStorage.setItem("scout_saved_players", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const savedPlayers = mockPlayers.filter(p => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Saved Talent
          </h1>
        </div>

        {savedPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedPlayers.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <PlayerCard 
                  player={player} 
                  onViewProfile={(id) => navigate(`/scout/player/${id}`)}
                  onSave={handleSave}
                  isSaved={true}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-display text-lg">No saved players yet</p>
            <p className="text-sm text-muted-foreground mt-1">Bookmark players from the Discover feed to save them here</p>
            <button 
              onClick={() => navigate("/scout/discover")}
              className="mt-6 text-primary font-display font-bold hover:underline flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Go to Discover
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoutSaved;
