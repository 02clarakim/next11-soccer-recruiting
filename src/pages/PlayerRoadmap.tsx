import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockPlayer } from "@/lib/mock-data";
import AppNav from "@/components/AppNav";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { Target, TrendingUp, GraduationCap, Zap, CheckCircle2, AlertCircle, ChevronRight, Info } from "lucide-react";

const PlayerRoadmap = () => {
  const player = mockPlayer;
  const [selectedDivision, setSelectedDivision] = useState<string>("Division I");

  const benchmarks: Record<string, any> = {
    "Division I": { gpa: 3.5, passing: 92, speed: 95, physical: 90 },
    "Division II": { gpa: 2.5, passing: 80, speed: 80, physical: 80 },
    "Division III": { gpa: 3.8, passing: 85, speed: 70, physical: 70 },
  };

  // Calculate Match Percentages
  const calculateMatch = () => {
    const results = Object.entries(benchmarks).map(([name, b]) => {
      const scores = {
        gpa: player.gpa >= b.gpa ? 100 : (player.gpa / b.gpa) * 100,
        passing: player.technicalStats.passing >= b.passing ? 100 : (player.technicalStats.passing / b.passing) * 100,
        speed: player.technicalStats.speed >= b.speed ? 100 : (player.technicalStats.speed / b.speed) * 100,
        physical: player.technicalStats.physical >= b.physical ? 100 : (player.technicalStats.physical / b.physical) * 100,
      };
      const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 4;
      return { 
        name, 
        score: Math.round(avg), 
        color: name === "Division I" ? "#10b981" : name === "Division II" ? "#3b82f6" : "#f59e0b" 
      };
    });
    return results;
  };

  const matchData = calculateMatch();

  const getSkillMatch = (divisionName: string) => {
    const b = benchmarks[divisionName];
    const skills = [
      { label: "GPA", value: player.gpa, target: b.gpa, unit: "" },
      { label: "Passing", value: player.technicalStats.passing, target: b.passing, unit: "%" },
      { label: "Speed", value: player.technicalStats.speed, target: b.speed, unit: "%" },
      { label: "Physicality", value: player.technicalStats.physical, target: b.physical, unit: "%" },
    ];

    return skills.map(s => ({
      ...s,
      isMet: s.value >= s.target
    }));
  };

  const skillMatches = getSkillMatch(selectedDivision);

  // Development Sprints
  const getSprints = () => {
    const sprints = [];
    
    if (player.technicalStats.passing < 90) {
      sprints.push({
        title: "Precision Passing Sprint",
        description: "Focus on 1-touch accuracy and long-range distribution. Target: 90%+ accuracy in high-pressure drills.",
        icon: <Target className="w-5 h-5 text-emerald-500" />,
        goal: "Increase Passing to 90+"
      });
    } else if (player.technicalStats.physical < 85) {
      sprints.push({
        title: "Elite Physicality Sprint",
        description: "Strength and conditioning focus. Plyometrics and core stability to handle D1 intensity.",
        icon: <Zap className="w-5 h-5 text-blue-500" />,
        goal: "Increase Physical to 85+"
      });
    }

    if (player.gpa < 3.5) {
      sprints.push({
        title: "Academic Excellence Sprint",
        description: "Focus on core subjects to boost GPA. D3 and high-academic D1s prioritize 3.5+ GPA.",
        icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
        goal: "Target GPA: 3.5+"
      });
    } else {
      sprints.push({
        title: "Tactical IQ Sprint",
        description: "Video analysis of professional CAMs. Focus on spatial awareness and defensive transition.",
        icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
        goal: "Master Spatial Awareness"
      });
    }

    return sprints.slice(0, 2);
  };

  const sprints = getSprints();

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Recruit-Ready Roadmap</h1>
          <p className="text-muted-foreground text-lg">NEXT11 Career Path Assistant Analysis</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Scores */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Division Match Analysis
              </h2>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Live Data
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={matchData} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'currentColor', fontSize: 14, fontWeight: 600 }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={40}>
                    {matchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {matchData.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => setSelectedDivision(item.name)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedDivision === item.name 
                      ? "bg-secondary border-primary shadow-lg scale-[1.02]" 
                      : "bg-secondary/30 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-bold text-muted-foreground uppercase">{item.name}</div>
                    {selectedDivision === item.name && <CheckCircle2 className="w-3 h-3 text-primary" />}
                  </div>
                  <div className="text-2xl font-bold" style={{ color: item.color }}>{item.score}%</div>
                  <div className="w-full bg-background/50 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${item.score}%`, backgroundColor: item.color }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Skill Match Breakdown */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="font-display text-xl font-bold">Skill Match: {selectedDivision}</h3>
                <div className="px-2 py-0.5 rounded bg-secondary text-[10px] font-bold text-muted-foreground uppercase">
                  LinkedIn Style Analysis
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {skillMatches.map((skill, idx) => (
                    <motion.div
                      key={`${selectedDivision}-${skill.label}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${skill.isMet ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                          {skill.isMet ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold">{skill.label}</div>
                          <div className="text-xs text-muted-foreground">
                            Target: {skill.target}{skill.unit}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${skill.isMet ? "text-emerald-500" : "text-amber-500"}`}>
                          {skill.value}{skill.unit}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold">
                          {skill.isMet ? "Matched" : "Lacking"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {!skillMatches.every(s => s.isMet) && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                  <Info className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You're missing <span className="text-amber-500 font-bold">{skillMatches.filter(s => !s.isMet).length} requirements</span> for {selectedDivision}. 
                    Focus on the development sprints on the right to close these specific gaps.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar: Development Sprints */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 border-l-4 border-emerald-500"
            >
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Coach's Assessment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "James, your technical profile is elite. Your vision and passing accuracy are already at a D1 level. To solidify your spot in a top-tier program, we need to focus on your physical presence and maintaining your academic edge. You're close—now it's about the details."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Development Sprints
              </h3>
              
              <div className="space-y-6">
                {sprints.map((sprint, i) => (
                  <div key={i} className="relative pl-8 border-l border-white/10 pb-2">
                    <div className="absolute left-[-11px] top-0 p-1 rounded-full bg-background border border-white/10">
                      {sprint.icon}
                    </div>
                    <div className="font-bold text-sm mb-1">{sprint.title}</div>
                    <p className="text-xs text-muted-foreground mb-3">{sprint.description}</p>
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold">
                      <Target className="w-3 h-3" />
                      {sprint.goal}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 bg-amber-500/5 border-amber-500/20"
            >
              <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-amber-500">
                <AlertCircle className="w-4 h-4" />
                Recruitment Tip
              </h3>
              <p className="text-xs text-muted-foreground italic">
                "Division I coaches look for consistency. Record your next 3 matches and tag every transition moment. They want to see how you react when the ball is lost."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRoadmap;
