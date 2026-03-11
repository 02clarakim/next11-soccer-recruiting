import { useState } from "react";
import { motion } from "framer-motion";
import AppNav from "@/components/AppNav";
import { mockEvents } from "@/lib/mock-data";
import { CalendarDays, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ScoutEvents = () => {
  const [events, setEvents] = useState(mockEvents);

  const toggleAttending = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, attending: !e.attending } : e));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          Event Directory
        </h1>
        <div className="space-y-4">
          {events.map((event, i) => (
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
                  onClick={() => toggleAttending(event.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all ${
                    event.attending
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {event.attending ? (
                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Attending</span>
                  ) : "Mark Attending"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoutEvents;
