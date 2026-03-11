import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "player" | "scout" | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem("next11-role");
    return (saved as Role) || null;
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem("next11-role", newRole);
    } else {
      localStorage.removeItem("next11-role");
    }
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
