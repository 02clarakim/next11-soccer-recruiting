import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockPlayers, mockJobPosts, Player } from "@/lib/mock-data";
import { 
  Users, 
  Bookmark, 
  Briefcase, 
  ChevronRight, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Activity,
  X
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Badge } from "@/components/ui/badge";

const PLAYER_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#a855f7"];

const ScoutAnalytics = () => {
  const [filterType, setFilterType] = useState<"saved" | string>("saved");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [chartType, setChartType] = useState<"radar" | "bar" | "line">("radar");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("scout_saved_players");
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  const getFilteredPlayers = () => {
    if (filterType === "saved") {
      return mockPlayers.filter(p => savedIds.includes(p.id));
    } else {
      // Mock applicants for a job post
      return mockPlayers.slice(0, 4);
    }
  };

  const filteredPlayers = getFilteredPlayers();
  const selectedPlayers = mockPlayers.filter(p => selectedPlayerIds.includes(p.id));

  const togglePlayerSelection = (id: string) => {
    setSelectedPlayerIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(pId => pId !== id);
      }
      if (prev.length >= 4) {
        alert("You can select up to 4 players for comparison.");
        return prev;
      }
      return [...prev, id];
    });
  };

  // Prepare data for Radar Chart
  const radarData = [
    { subject: 'Speed', fullMark: 100 },
    { subject: 'Dribbling', fullMark: 100 },
    { subject: 'Shooting', fullMark: 100 },
    { subject: 'Passing', fullMark: 100 },
    { subject: 'Defense', fullMark: 100 },
    { subject: 'Physical', fullMark: 100 },
  ].map(item => {
    const newItem: any = { ...item };
    selectedPlayers.forEach((p, index) => {
      const key = `p${index}`;
      newItem[key] = p.technicalStats[item.subject.toLowerCase() as keyof typeof p.technicalStats];
    });
    return newItem;
  });

  // Prepare data for Bar Chart (Latest Season Goals/Assists)
  const barData = selectedPlayers.map((p, index) => ({
    name: p.name,
    goals: p.stats[0].goals,
    assists: p.stats[0].assists,
    color: PLAYER_COLORS[index]
  }));

  // Prepare data for Line Chart (Goals over seasons)
  // We need to normalize seasons
  const seasons = Array.from(new Set(mockPlayers.flatMap(p => p.stats.map(s => s.season)))).sort();
  const lineData = seasons.map(season => {
    const item: any = { season };
    selectedPlayers.forEach((p, index) => {
      const stat = p.stats.find(s => s.season === season);
      item[`p${index}`] = stat ? stat.goals : null;
    });
    return item;
  });

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 h-[calc(100vh-80px)] flex overflow-hidden">
        {/* Left Sidebar: Player List (20%) */}
        <div className="w-[20%] border-r border-border/50 flex flex-col bg-secondary/10">
          <div className="p-4 border-b border-border/50 space-y-4">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Player Selection
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Filter By</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="saved">Saved Players</option>
                {mockJobPosts.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-10 px-4">
                <p className="text-xs text-muted-foreground">No players found for this filter.</p>
              </div>
            ) : (
              filteredPlayers.map((player) => {
                const isSelected = selectedPlayerIds.includes(player.id);
                const selectionIndex = selectedPlayerIds.indexOf(player.id);
                
                return (
                  <button
                    key={player.id}
                    onClick={() => togglePlayerSelection(player.id)}
                    className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 text-left ${
                      isSelected 
                        ? "bg-primary/10 border-primary shadow-sm" 
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        <span className="font-display text-xs font-bold text-muted-foreground">
                          {player.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      {isSelected && (
                        <div 
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: PLAYER_COLORS[selectionIndex] }}
                        >
                          {selectionIndex + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm truncate">{player.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{player.position} | {player.year}</div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-border/50 bg-background/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Selected ({selectedPlayerIds.length}/4)</span>
              {selectedPlayerIds.length > 0 && (
                <button 
                  onClick={() => setSelectedPlayerIds([])}
                  className="text-[10px] uppercase text-primary hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex gap-1">
              {selectedPlayerIds.map((id, i) => (
                <div 
                  key={id} 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: PLAYER_COLORS[i] }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Area: Charts (80%) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 flex items-center justify-between bg-background">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-2xl font-bold">Analytics Dashboard</h1>
              <div className="flex bg-secondary/30 rounded-lg p-1">
                <button
                  onClick={() => setChartType("radar")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                    chartType === "radar" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" /> Radar
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                    chartType === "bar" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" /> Bar
                </button>
                <button
                  onClick={() => setChartType("line")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                    chartType === "line" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LineChartIcon className="w-3.5 h-3.5" /> Line
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedPlayers.map((p, i) => (
                <Badge 
                  key={p.id} 
                  variant="outline" 
                  className="gap-2 border-0 bg-secondary/50"
                  style={{ borderLeft: `4px solid ${PLAYER_COLORS[i]}` }}
                >
                  {p.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            {selectedPlayerIds.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center">
                  <Activity className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">No Players Selected</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                    Select up to 4 players from the left sidebar to compare their performance analytics.
                  </p>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full space-y-8"
              >
                <div className="glass-card p-8 h-[600px]">
                  <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                    {chartType === "radar" && <><Activity className="w-5 h-5 text-primary" /> Technical Comparison</>}
                    {chartType === "bar" && <><BarChart3 className="w-5 h-5 text-primary" /> Performance Breakdown</>}
                    {chartType === "line" && <><LineChartIcon className="w-5 h-5 text-primary" /> Scoring Trends</>}
                  </h3>
                  
                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "radar" ? (
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 14 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          {selectedPlayers.map((p, i) => (
                            <Radar
                              key={p.id}
                              name={p.name}
                              dataKey={`p${i}`}
                              stroke={PLAYER_COLORS[i]}
                              fill={PLAYER_COLORS[i]}
                              fillOpacity={0.3}
                            />
                          ))}
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '12px' }}
                          />
                          <Legend />
                        </RadarChart>
                      ) : chartType === "bar" ? (
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                          <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                          />
                          <Legend />
                          <Bar dataKey="goals" fill="#22c55e" radius={[4, 4, 0, 0]} name="Goals" />
                          <Bar dataKey="assists" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Assists" />
                        </BarChart>
                      ) : (
                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="season" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                          <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                          />
                          <Legend />
                          {selectedPlayers.map((p, i) => (
                            <Line 
                              key={p.id}
                              type="monotone" 
                              dataKey={`p${i}`} 
                              stroke={PLAYER_COLORS[i]} 
                              strokeWidth={3}
                              dot={{ r: 6, fill: PLAYER_COLORS[i], strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 8 }}
                              name={p.name}
                            />
                          ))}
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {selectedPlayers.map((p, i) => (
                    <div key={p.id} className="glass-card p-4 border-l-4" style={{ borderLeftColor: PLAYER_COLORS[i] }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                          <span className="font-display text-[10px] font-bold text-muted-foreground">
                            {p.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div className="font-display font-bold text-sm truncate">{p.name}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Top Skill</span>
                          <span className="font-bold text-primary">
                            {Object.entries(p.technicalStats).sort((a, b) => b[1] - a[1])[0][0].toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Avg. Score</span>
                          <span className="font-bold">
                            {(Object.values(p.technicalStats).reduce((a, b) => a + b, 0) / 6).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutAnalytics;
