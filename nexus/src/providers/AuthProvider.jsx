import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi, setToken } from '../api/client';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from stored token
  useEffect(() => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      authApi.me()
        .then((data) => {
          setUser(data.user);
          setRole(data.role);
        })
        .catch(() => {
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async ({ email, fullName, password }) => {
    setLoading(true);
    try {
      const data = await authApi.signup({ email, fullName, password });
      setToken(data.token);
      setUser(data.user);
      setRole(data.role);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await authApi.signin({ email, password });
      setToken(data.token);
      setUser(data.user);
      setRole(data.role);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.signout();
    } catch {
      // Ignore errors on signout
    }
    setToken(null);
    setUser(null);
    setRole(null);
  }, []);

  const isAdmin = role === 'admin';
  const isClient = role === 'client';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user, role, loading, isAdmin, isClient, isAuthenticated,
      signUp, signIn, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
