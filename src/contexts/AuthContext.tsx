import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/data/types';
import { ADMIN_USER, DEMO_BUYER, ARTISAN_USERS } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_CREDENTIALS: Record<string, { password: string; user: User }> = {
  'admin@artnet.local': { password: 'Admin@123', user: ADMIN_USER },
  'priya@example.com': { password: 'Buyer@123', user: DEMO_BUYER },
  'artisan1@artnet.local': { password: 'Artisan@123', user: ARTISAN_USERS[0] },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string) => {
    const cred = MOCK_CREDENTIALS[email.toLowerCase()];
    if (cred) {
      setUser(cred.user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const switchRole = useCallback((role: UserRole) => {
    if (role === 'admin') setUser(ADMIN_USER);
    else if (role === 'artisan') setUser(ARTISAN_USERS[0]);
    else setUser(DEMO_BUYER);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
