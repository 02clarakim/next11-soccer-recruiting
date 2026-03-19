import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Landing from "./pages/Landing";
import PlayerProfile from "./pages/PlayerProfile";
import PlayerJobs from "./pages/PlayerJobs";
import PlayerEvents from "./pages/PlayerEvents";
import PlayerRoadmap from "./pages/PlayerRoadmap";
import ScoutDiscover from "./pages/ScoutDiscover";
import ScoutSaved from "./pages/ScoutSaved";
import ScoutPosts from "./pages/ScoutPosts";
import ScoutEvents from "./pages/ScoutEvents";
import ScoutPlayerView from "./pages/ScoutPlayerView";
import ScoutAnalytics from "./pages/ScoutAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: "player" | "scout" }) => {
  const { role } = useAuth();
  if (role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={role ? <Navigate to={role === "player" ? "/player/profile" : "/scout/discover"} replace /> : <Landing />} />
      <Route path="/player/profile" element={<ProtectedRoute requiredRole="player"><PlayerProfile /></ProtectedRoute>} />
      <Route path="/player/jobs" element={<ProtectedRoute requiredRole="player"><PlayerJobs /></ProtectedRoute>} />
      <Route path="/player/events" element={<ProtectedRoute requiredRole="player"><PlayerEvents /></ProtectedRoute>} />
      <Route path="/player/roadmap" element={<ProtectedRoute requiredRole="player"><PlayerRoadmap /></ProtectedRoute>} />
      <Route path="/scout/discover" element={<ProtectedRoute requiredRole="scout"><ScoutDiscover /></ProtectedRoute>} />
      <Route path="/scout/saved" element={<ProtectedRoute requiredRole="scout"><ScoutSaved /></ProtectedRoute>} />
      <Route path="/scout/posts" element={<ProtectedRoute requiredRole="scout"><ScoutPosts /></ProtectedRoute>} />
      <Route path="/scout/events" element={<ProtectedRoute requiredRole="scout"><ScoutEvents /></ProtectedRoute>} />
      <Route path="/scout/player/:id" element={<ProtectedRoute requiredRole="scout"><ScoutPlayerView /></ProtectedRoute>} />
      <Route path="/scout/analytics" element={<ProtectedRoute requiredRole="scout"><ScoutAnalytics /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
