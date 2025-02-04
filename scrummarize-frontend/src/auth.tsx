import { createContext, ReactNode, useContext } from 'react';
import { User } from './lib/types';

export type AuthContext = {
  getAuthStatus: () => Promise<{ isAuthenticated: boolean; user: User }>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
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
  async function getAuthStatus() {
    const res = await fetch('http://localhost:3000/api/auth/status', {
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to get auth status');
    }
    return await res.json();
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
  }

  async function logout() {
    const res = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to log out');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        getAuthStatus,
        login,
        logout,
        isAuthenticated: false,
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
