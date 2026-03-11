import { useState } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockEvents } from "@/lib/mock-data";
import { CalendarDays, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PlayerEvents = () => {
  const [attendingIds, setAttendingIds] = useState<string[]>(
    mockEvents.filter(e => e.attending).map(e => e.id)
  );

  const toggleAttendance = (id: string) => {
    setAttendingIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Upcoming Events
        </h1>
        <div className="space-y-4">
          {mockEvents.map((event, i) => {
            const isAttending = attendingIds.includes(event.id);
            return (
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
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-display">{event.type}</Badge>
                  <button
                    onClick={() => toggleAttendance(event.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all ${
                      isAttending
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isAttending ? (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Attending</span>
                    ) : "Mark Attending"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerEvents;
