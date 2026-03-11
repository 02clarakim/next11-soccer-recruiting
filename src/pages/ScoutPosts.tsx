import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNav from "@/components/AppNav";
import PlayerCard from "@/components/PlayerCard";
import NewPostModal from "@/components/NewPostModal";
import { mockJobPosts, mockPlayers, Player, JobPost } from "@/lib/mock-data";
import { Plus, MapPin, Calendar, Tag, Users, ArrowLeft, MessageSquare, Bookmark, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const ScoutPosts = () => {
  const [viewingApplicationsFor, setViewingApplicationsFor] = useState<string | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [posts, setPosts] = useState<JobPost[]>(mockJobPosts);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const navigate = useNavigate();

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

  const handleAddPost = (newPost: JobPost) => {
    setPosts([newPost, ...posts]);
  };

  const selectedJob = posts.find(j => j.id === viewingApplicationsFor);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!viewingApplicationsFor ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-3xl font-bold text-foreground">
                  My Job Posts
                </h1>
                <Button onClick={() => setIsNewPostModalOpen(true)} variant="default" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> New Post
                </Button>
              </div>
              <div className="space-y-4">
                {posts.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground">{job.title}</h2>
                        <div className="text-sm text-primary font-medium">{job.org}</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0 font-display">{job.position}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.date}</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Ages {job.targetAges}</span>
                    </div>
                    <Button 
                      onClick={() => setViewingApplicationsFor(job.id)}
                      variant="secondary" 
                      className="w-full gap-2"
                    >
                      <Users className="w-4 h-4" /> View Applications (12)
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="applications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setViewingApplicationsFor(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to My Jobs
              </button>

              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Applications for {selectedJob?.title}
                </h1>
                <p className="text-muted-foreground">Reviewing 12 candidates for this position</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlayers.slice(0, 6).map((player, i) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PlayerCard 
                      player={player} 
                      onViewProfile={(id) => navigate(`/scout/player/${id}`)}
                      onSave={handleSave}
                      isSaved={savedIds.includes(player.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NewPostModal 
        isOpen={isNewPostModalOpen} 
        onClose={() => setIsNewPostModalOpen(false)} 
        onAdd={handleAddPost}
      />
    </div>
  );
};

export default ScoutPosts;
