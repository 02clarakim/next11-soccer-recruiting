import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockPlayers, mockPlayer } from "@/lib/mock-data";
import { 
  ArrowLeft, 
  Send, 
  Save, 
  MessageSquare, 
  StickyNote, 
  Trophy, 
  Shield, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Ruler, 
  Weight, 
  Play, 
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

const ScoutPlayerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [isNotesSaved, setIsNotesSaved] = useState(false);

  // In a real app, we'd fetch by ID. For now, use mockPlayer or find in mockPlayers
  const p = mockPlayers.find(player => player.id === id) || mockPlayer;

  const handleSaveNotes = () => {
    setIsNotesSaved(true);
    setTimeout(() => setIsNotesSaved(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
    // In real app, send to backend
  };

  const radarData = [
    { subject: 'Speed', A: p.technicalStats.speed, fullMark: 100 },
    { subject: 'Dribbling', A: p.technicalStats.dribbling, fullMark: 100 },
    { subject: 'Shooting', A: p.technicalStats.shooting, fullMark: 100 },
    { subject: 'Passing', A: p.technicalStats.passing, fullMark: 100 },
    { subject: 'Defense', A: p.technicalStats.defense, fullMark: 100 },
    { subject: 'Physical', A: p.technicalStats.physical, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 px-4 max-w-[1600px] mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Player Profile (80% on large screens) */}
          <div className="lg:w-[75%] space-y-6">
            {/* Identity Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center shrink-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10" />
                  <span className="font-display text-4xl font-bold text-muted-foreground relative z-10">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="font-display text-3xl font-bold text-foreground">
                          {p.name}
                        </h1>
                        <span className="font-display text-2xl font-bold text-muted-foreground">#{p.jerseyNumber}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> {p.position}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.hometown}</span>
                        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {p.school}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Age {p.age}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-display font-medium bg-primary/20 text-primary">
                      {p.recruitingStatus}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 max-w-2xl">{p.bio}</p>
                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Ruler className="w-3.5 h-3.5" /> {p.height}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Weight className="w-3.5 h-3.5" /> {p.weight}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Technical Profile (Radar Chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" /> Technical Profile
                </h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={p.name}
                        dataKey="A"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" /> Performance Stats
                </h2>
                <div className="space-y-4">
                  {p.stats.map((s) => (
                    <div key={s.season} className="flex items-center justify-between p-3 bg-secondary/20 rounded-xl">
                      <span className="font-medium">{s.season}</span>
                      <div className="flex gap-4 text-sm">
                        <span>GP: <span className="font-bold">{s.gamesPlayed}</span></span>
                        <span>Goals: <span className="font-bold text-primary">{s.goals}</span></span>
                        <span>Assists: <span className="font-bold">{s.assists}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" /> Pinned Highlight
                </h2>
                <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/RANzfjekkAw"
                    title="Highlight Video"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              {/* Credentials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Credentials & References</h2>
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {p.achievements.map((a) => (
                        <Badge key={a} variant="secondary" className="bg-primary/10 text-primary border-0">{a}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Coaches</h3>
                    <div className="space-y-2">
                      {p.coachReferences.map((r) => (
                        <div key={r.name} className="text-sm p-2 bg-secondary/20 rounded-lg">
                          <div className="font-medium">{r.name}</div>
                          <div className="text-primary text-xs">{r.contact}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Scout Tools (25% on large screens) */}
          <div className="lg:w-[25%] space-y-6">
            {/* Messaging */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 flex flex-col h-[400px]"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Message Player
              </h2>
              <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-hide">
                <div className="bg-secondary/30 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                  Hello {p.name.split(" ")[0]}, we're interested in your profile. Are you attending the upcoming showcase?
                </div>
                <div className="text-[10px] text-muted-foreground text-center uppercase tracking-widest py-2">Today</div>
              </div>
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-secondary/50 border border-border rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-background rounded-full hover:scale-110 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Private Notes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-primary" /> Private Notes
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your internal notes here... (e.g. 'Strong left foot', 'Needs better positioning')"
                className="w-full h-48 bg-secondary/50 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none mb-4"
              />
              <Button 
                onClick={handleSaveNotes}
                className={`w-full gap-2 transition-all ${isNotesSaved ? "bg-green-500 hover:bg-green-600" : "action-gradient"}`}
              >
                {isNotesSaved ? <><Save className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Notes</>}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutPlayerView;
