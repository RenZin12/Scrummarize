import { ReactNode } from 'react';
import { AuthContext } from './context';

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
