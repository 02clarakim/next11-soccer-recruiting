import { useState } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockJobPosts, JobPost } from "@/lib/mock-data";
import { MapPin, Calendar, Tag, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplyModal from "@/components/ApplyModal";

const PlayerJobs = () => {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (job: JobPost) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

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
              <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.date}</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Ages {job.targetAges}</span>
                <span className="flex items-center gap-1 text-primary"><Clock className="w-3 h-3" /> Posted {job.postedAt}</span>
              </div>

              <Button 
                onClick={() => handleApply(job)}
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-display"
              >
                Apply for Position
              </Button>
            </motion.div>
          ))}
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

export default PlayerJobs;
