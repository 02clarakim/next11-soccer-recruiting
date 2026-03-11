import { useState } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockPlayer, mockJobPosts, JobPost } from "@/lib/mock-data";
import { Eye, Play, Pin, Trophy, Shield, Users, MapPin, Calendar, GraduationCap, Ruler, Weight, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplyModal from "@/components/ApplyModal";

const PlayerProfile = () => {
  const p = mockPlayer;
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const matchedJobs = mockJobPosts.filter(job => job.position === p.position);

  const handleApply = (job: JobPost) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-5xl mx-auto px-4">
        {/* Identity Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
              <span className="font-display text-5xl font-bold text-muted-foreground">
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
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Eye className="w-3.5 h-3.5" /> {p.profileViews.toLocaleString()} profile views
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" /> Performance Stats
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">Season</th>
                      <th className="text-center py-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">GP</th>
                      <th className="text-center py-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">Goals</th>
                      <th className="text-center py-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">Assists</th>
                      <th className="text-center py-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">G+A</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.stats.map((s) => (
                      <tr key={s.season} className="border-b border-border/30">
                        <td className="py-3 font-medium text-foreground">{s.season}</td>
                        <td className="text-center text-muted-foreground">{s.gamesPlayed}</td>
                        <td className="text-center font-bold text-primary">{s.goals}</td>
                        <td className="text-center text-foreground">{s.assists}</td>
                        <td className="text-center font-bold text-foreground">{s.goals + s.assists}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Video Vault */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" /> Video Vault
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {p.videos.map((v) => (
                  <div
                    key={v.id}
                    className={`rounded-xl overflow-hidden transition-colors group ${
                      v.isPinned ? "ring-2 ring-primary/40" : "hover:ring-1 hover:ring-border"
                    }`}
                  >
                    <div className="relative aspect-video bg-secondary/30">
                      <iframe
                        src="https://www.youtube.com/embed/RANzfjekkAw"
                        title={v.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
		     </div>
                    <div className="p-3 bg-secondary/20">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{v.title}</span>
                        {v.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-display text-primary uppercase shrink-0">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Eye className="w-3 h-3" /> {v.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Credentials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Achievements</h3>
                  <div className="space-y-1">
                    {p.achievements.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                        <Trophy className="w-3 h-3 text-primary shrink-0" /> {a}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Competitions</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {p.competitions.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Coach References</h3>
                <div className="space-y-2">
                  {p.coachReferences.map((r) => (
                    <div key={r.name} className="text-sm">
                      <span className="text-foreground font-medium">{r.name}</span>
                      <span className="text-muted-foreground"> — </span>
                      <span className="text-primary">{r.contact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Scout Insights */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> Scout Activity
              </h2>
              <div className="space-y-3">
                {p.scoutViews.map((sv, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{sv.scoutName}</div>
                      <div className="text-xs text-primary">{sv.org}</div>
                      <div className="text-xs text-muted-foreground">{sv.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Matched Jobs
              </h2>
              <p className="text-xs text-muted-foreground mb-3">Jobs matching your position and age</p>
              <div className="space-y-3">
                {matchedJobs.map((job) => (
                  <div key={job.id} className="bg-secondary/30 rounded-lg p-3 border border-border/50">
                    <div className="text-sm font-medium text-foreground">{job.title}</div>
                    <div className="text-xs text-primary">{job.org}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-[10px] text-muted-foreground">{job.date}</div>
                      <button 
                        onClick={() => handleApply(job)}
                        className="text-[10px] font-display font-bold text-primary hover:underline"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
                {matchedJobs.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-4">No direct matches found</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ApplyModal 
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PlayerProfile;
