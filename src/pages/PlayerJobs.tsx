import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockJobPosts } from "@/lib/mock-data";
import { MapPin, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PlayerJobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Scout Job Postings
        </h1>
        <div className="space-y-4">
          {mockJobPosts.map((job, i) => (
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
              <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.date}</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Class of {job.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerJobs;
