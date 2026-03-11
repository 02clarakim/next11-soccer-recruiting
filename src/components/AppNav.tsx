import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { LogOut, User, Search, Bookmark, Briefcase, Calendar, Activity } from "lucide-react";

const AppNav = () => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const playerLinks = [
    { name: "Profile", path: "/player/profile", icon: User },
    { name: "Jobs", path: "/player/jobs", icon: Briefcase },
    { name: "Events", path: "/player/events", icon: Calendar },
  ];

  const scoutLinks = [
    { name: "Discover", path: "/scout/discover", icon: Search },
    { name: "Saved", path: "/scout/saved", icon: Bookmark },
    { name: "Posts", path: "/scout/posts", icon: Briefcase },
    { name: "Events", path: "/scout/events", icon: Calendar },
    { name: "Analytics", path: "/scout/analytics", icon: Activity },
  ];

  const links = role === "player" ? playerLinks : scoutLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground">N11</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">NEXT11</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-display font-medium transition-colors ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
