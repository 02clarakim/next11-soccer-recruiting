import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Shield, Search, ChevronRight, Trophy, Eye, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleRoleSelect = (role: "player" | "scout") => {
    setRole(role);
    navigate(role === "player" ? "/player/profile" : "/scout/discover");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg action-gradient flex items-center justify-center">
              <span className="font-display text-lg font-bold text-primary-foreground">N11</span>
            </div>
            <span className="font-display text-2xl font-bold text-foreground tracking-wider">
              NEXT<span className="text-primary">11</span>
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-6">
              Where Future
              <br />
              <span className="text-gradient-green">Stars</span> Get
              <br />
              Discovered
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-10 font-body">
              The premier platform connecting youth soccer talent with college scouts. Build your profile, showcase your game, get recruited.
            </p>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 max-w-2xl"
          >
            {/* Player Card */}
            <button
              onClick={() => handleRoleSelect("player")}
              className="glass-card p-6 text-left group hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl action-gradient flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                I'm a Player
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Build your soccer resume, upload highlights, and get discovered by college scouts nationwide.
              </p>
              <span className="flex items-center gap-1 text-primary text-sm font-display font-medium group-hover:gap-2 transition-all">
                Enter HQ <ChevronRight className="w-4 h-4" />
              </span>
            </button>

            {/* Scout Card */}
            <button
              onClick={() => handleRoleSelect("scout")}
              className="glass-card p-6 text-left group hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                I'm a Scout
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Discover, filter, and connect with top youth talent. Post opportunities and track prospects.
              </p>
              <span className="flex items-center gap-1 text-primary text-sm font-display font-medium group-hover:gap-2 transition-all">
                Start Scouting <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-border/30"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="stat-number text-foreground">12K+</span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Active Players</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-primary" />
                <span className="stat-number text-foreground">850+</span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">College Scouts</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="stat-number text-foreground">2.4K</span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Commitments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
