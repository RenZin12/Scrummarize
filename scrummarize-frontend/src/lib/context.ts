import { createContext, useContext } from 'react';
import { User } from './types';

export type AuthContextType = {
  getAuthStatus: () => Promise<{ isAuthenticated: boolean; user: User }>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
