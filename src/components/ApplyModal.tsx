import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Play, Video } from "lucide-react";
import { mockPlayer, JobPost } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface ApplyModalProps {
  job: JobPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({ job, isOpen, onClose }: ApplyModalProps) => {
  const [message, setMessage] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(
    mockPlayer.videos.find(v => v.isPinned)?.id || mockPlayer.videos[0]?.id
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setMessage("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-card overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-1 action-gradient" />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Apply for Position</h2>
                  <p className="text-sm text-muted-foreground">{job.title} @ {job.org}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Application Sent!</h3>
                  <p className="text-muted-foreground">Good luck, {mockPlayer.name.split(" ")[0]}!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Auto-filled Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <div className="text-sm font-medium">{mockPlayer.name}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Position</label>
                      <div className="text-sm font-medium">{mockPlayer.position}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Age</label>
                      <div className="text-sm font-medium">{mockPlayer.age}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Hometown</label>
                      <div className="text-sm font-medium">{mockPlayer.hometown}</div>
                    </div>
                  </div>

                  {/* Video Selection */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Include Highlight Video</label>
                    <div className="space-y-2">
                      {mockPlayer.videos.map((video) => (
                        <button
                          key={video.id}
                          type="button"
                          onClick={() => setSelectedVideoId(video.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            selectedVideoId === video.id 
                              ? "border-primary bg-primary/5 ring-1 ring-primary" 
                              : "border-border hover:border-muted-foreground/50 bg-secondary/20"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedVideoId === video.id ? "bg-primary text-background" : "bg-secondary text-muted-foreground"
                          }`}>
                            <Video className="w-4 h-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{video.title}</div>
                            {video.isPinned && <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Pinned Default</span>}
                          </div>
                          {selectedVideoId === video.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Message to Recruiter (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell them why you're a good fit..."
                      className="w-full h-24 bg-secondary/50 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full action-gradient h-12 font-display text-lg">
                    Submit Application
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;
