import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockEvents } from "@/lib/mock-data";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PlayerEvents = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Upcoming Events
        </h1>
        <div className="space-y-4">
          {mockEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex items-center justify-between"
            >
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">{event.name}</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {event.date}</span>
                </div>
              </div>
              <Badge variant="secondary" className="font-display">{event.type}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerEvents;
