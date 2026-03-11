import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (post: any) => void;
}

const NewPostModal = ({ isOpen, onClose, onAdd }: NewPostModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    org: "",
    position: "CAM",
    description: "",
    location: "",
    date: "Immediate",
    targetAges: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: "Just now",
    });
    setFormData({
      title: "",
      org: "",
      position: "CAM",
      description: "",
      location: "",
      date: "Immediate",
      targetAges: "",
    });
    onClose();
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
                <h2 className="font-display text-2xl font-bold text-foreground">Create New Job Post</h2>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Job Title</label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. Looking for 2026 CAM"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Organization</label>
                    <input
                      required
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. Stanford University"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Position</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {["CAM", "ST", "LB", "CDM", "GK", "CB", "RW", "LW"].map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Target Ages</label>
                    <input
                      required
                      value={formData.targetAges}
                      onChange={(e) => setFormData({ ...formData, targetAges: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. 16-18"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Location</label>
                    <input
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. Palo Alto, CA"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Timeline</label>
                    <input
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g. Fall 2026"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24 bg-secondary/50 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Describe what you're looking for in a player..."
                  />
                </div>

                <Button type="submit" className="w-full action-gradient h-12 font-display text-lg">
                  Post Job
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewPostModal;
