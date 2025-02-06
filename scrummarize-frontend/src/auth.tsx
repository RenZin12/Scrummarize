import { ReactNode, useState } from 'react';
import { AuthContext } from './lib/context';
import { User } from './lib/types';

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

    return result;
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
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
