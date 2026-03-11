import AppNav from "@/components/AppNav";
import { Bookmark } from "lucide-react";

const ScoutSaved = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-5xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Saved Talent
        </h1>
        <div className="glass-card p-12 text-center">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-display text-lg">No saved players yet</p>
          <p className="text-sm text-muted-foreground mt-1">Bookmark players from the Discover feed to save them here</p>
        </div>
      </div>
    </div>
  );
};

export default ScoutSaved;
