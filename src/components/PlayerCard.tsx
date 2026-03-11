import { Player } from "@/lib/mock-data";
import { Shield, MapPin, GraduationCap, Calendar, Trophy, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="glass-card p-5 w-full md:w-80 shrink-0 group hover:glow-border transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-muted-foreground">
            {player.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display text-xl font-bold text-foreground truncate">{player.name}</h3>
          <span className="text-primary font-display font-bold">#{player.jerseyNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3 text-primary" />
          <span>{player.position}</span>
          <span>•</span>
          <span>Class of {player.year}</span>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{player.hometown}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GraduationCap className="w-3 h-3" />
          <span className="truncate">{player.school}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Views</span>
          <span className="text-sm font-display font-bold text-foreground">{player.profileViews.toLocaleString()}</span>
        </div>
        <Link
          to={`/player/profile`}
          className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-display font-bold hover:bg-primary hover:text-primary-foreground transition-all"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
