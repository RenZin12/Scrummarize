import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from './lib/types';

export type AuthContext = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContext | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function getAuthStatus() {
    const res = await fetch('http://localhost:3000/api/auth/status', {
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to get auth status');
    }
    const result = await res.json();

    setIsAuthenticated(result.isAuthenticated);
    setUser(result.user);
  }

  async function login(username: string, password: string) {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to log in');
    }
    const result = await res.json();

    setIsAuthenticated(result.isAuthenticated);
    setUser(result.user);
  }

  async function logout() {
    const res = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to log out');
    }
    const result = await res.json();

    setIsAuthenticated(result.isAuthenticated);
    setUser(result.user);
  }

  useEffect(() => {
    getAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
