import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, Send, Eye, MapPin, Calendar } from "lucide-react";
import type { Player } from "@/lib/mock-data";

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
  onViewProfile?: (id: string) => void;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

const positionColors: Record<string, string> = {
  CAM: "from-primary to-emerald-400",
  ST: "from-red-500 to-orange-400",
  LB: "from-blue-500 to-cyan-400",
  CDM: "from-amber-500 to-yellow-400",
  GK: "from-violet-500 to-purple-400",
  CB: "from-slate-500 to-slate-300",
  RW: "from-pink-500 to-rose-400",
  LW: "from-teal-500 to-green-400",
};

const PlayerCard = ({ player, compact, onViewProfile, onSave, isSaved }: PlayerCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(false);

  const gradient = positionColors[player.position] || "from-primary to-emerald-400";

  return (
    <div className="w-full max-w-[320px]">
      <motion.div
        className="relative aspect-[3/4] cursor-pointer perspective-1000"
        onClick={() => setFlipped(!flipped)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 glass-card overflow-hidden"
            >
              {/* Card header with position badge */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-4 h-full flex flex-col">
                {/* Jersey & Position */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-3xl font-bold text-foreground">
                      #{player.jerseyNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${gradient} text-background`}>
                      {player.position}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    player.recruitingStatus === "Available" 
                      ? "bg-primary/20 text-primary" 
                      : player.recruitingStatus === "Committed"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {player.recruitingStatus}
                  </span>
                </div>

                {/* Avatar placeholder */}
                <div className="flex-1 rounded-lg bg-secondary/50 flex items-center justify-center mb-3 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-display text-4xl font-bold text-muted-foreground">
                      {player.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>

                {/* Name & Info */}
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                    {player.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {player.hometown}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Age {player.age}
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50">
                  <div className="text-center">
                    <div className="font-display text-lg font-bold text-foreground">{player.stats[0]?.goals || 0}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg font-bold text-foreground">{player.stats[0]?.assists || 0}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Assists</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg font-bold text-primary flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" /> {player.profileViews > 1000 ? `${(player.profileViews/1000).toFixed(1)}k` : player.profileViews}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Views</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 glass-card overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-4 h-full flex flex-col overflow-y-auto">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {player.name} — Stats & Info
                </h3>

                {/* Stats Table */}
                <div className="mb-3">
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Performance</h4>
                  <div className="space-y-1">
                    {player.stats.map((s) => (
                      <div key={s.season} className="flex items-center justify-between text-xs bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">{s.season}</span>
                        <div className="flex gap-3">
                          <span>{s.gamesPlayed} <span className="text-muted-foreground">GP</span></span>
                          <span className="text-primary">{s.goals} <span className="text-muted-foreground">G</span></span>
                          <span>{s.assists} <span className="text-muted-foreground">A</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical */}
                <div className="flex gap-4 mb-3 text-xs">
                  <div className="bg-secondary/30 rounded px-3 py-2 flex-1 text-center">
                    <div className="text-muted-foreground text-[10px] uppercase">Height</div>
                    <div className="font-display font-bold text-foreground">{player.height}</div>
                  </div>
                  <div className="bg-secondary/30 rounded px-3 py-2 flex-1 text-center">
                    <div className="text-muted-foreground text-[10px] uppercase">Weight</div>
                    <div className="font-display font-bold text-foreground">{player.weight}</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-3">
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Achievements</h4>
                  <div className="flex flex-wrap gap-1">
                    {player.achievements.slice(0, 3).map((a) => (
                      <span key={a} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Profile Button */}
                {onViewProfile && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewProfile(player.id); }}
                    className="mt-auto w-full py-2 rounded-lg bg-primary text-background font-display font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    View Full Profile
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interaction Bar */}
      {!compact && (
        <div className="flex items-center justify-center gap-6 mt-3">
          <button
            onClick={(e) => { e.stopPropagation(); onSave?.(player.id); }}
            className={`p-2 rounded-full transition-colors ${isSaved ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className={`p-2 rounded-full transition-colors ${liked ? "text-red-400 bg-red-400/10" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
