import React, { createContext, useContext, useState, useCallback } from 'react';
import db from '../db/MockDatabase';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // profile row
  const [role, setRole] = useState(null);        // 'client' | 'admin'
  const [loading, setLoading] = useState(false);

  const signUp = useCallback(async ({ email, fullName, password }) => {
    setLoading(true);
    try {
      // Check duplicate email
      const existing = db.query('profiles', { email }, { isAdmin: true });
      if (existing.length > 0) throw new Error('Email already registered');

      // Create profile
      const profile = db.insert('profiles', {
        email,
        full_name: fullName,
        password_hash: btoa(password), // mock hash
        kyc_status: 'pending',
        status: 'active',
        user_id: null, // will self-ref
      });

      // Self-reference user_id
      db.update('profiles', profile.id, { user_id: profile.id });
      profile.user_id = profile.id;

      // Create role
      const isAdmin = email.endsWith('@nexus-admin.com');
      const roleRow = db.insert('roles', {
        user_id: profile.id,
        role: isAdmin ? 'admin' : 'client',
      });

      // Create bank account + ledger accounts for clients
      if (!isAdmin) {
        const depositRef = `NEX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        db.insert('bank_accounts', {
          user_id: profile.id,
          bank_name: 'Nexus Custody Bank',
          account_number: `ACCT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
          routing_number: '021000021',
          deposit_reference: depositRef,
          currency: 'USD',
          rail: 'ACH',
          status: 'active',
        });

        // Fiat account
        db.insert('ledger_accounts', {
          user_id: profile.id,
          type: 'fiat',
          currency: 'USD',
          label: 'USD Cash',
        });

        // Bitcoin account
        db.insert('ledger_accounts', {
          user_id: profile.id,
          type: 'bitcoin',
          currency: 'BTC',
          label: 'Bitcoin Holdings',
        });

        // Create welcome notification
        db.insert('notifications', {
          user_id: profile.id,
          type: 'welcome',
          title: 'Welcome to Nexus',
          message: 'Your account has been created. Complete KYC to unlock full features.',
          read: false,
        });

        // Queue welcome email
        db.insert('email_outbox', {
          user_id: profile.id,
          to: email,
          subject: 'Welcome to Nexus Bitcoin Banking',
          body: `Hi ${fullName}, welcome to Nexus!`,
          status: 'queued',
        });

        // Activity log
        db.insert('activity_log', {
          user_id: profile.id,
          action: 'signup',
          description: `User ${fullName} signed up`,
        });
      }

      setUser(profile);
      setRole(roleRow.role);
      return profile;
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const profiles = db.query('profiles', { email }, { isAdmin: true });
      if (profiles.length === 0) throw new Error('Invalid credentials');
      const profile = profiles[0];
      if (atob(profile.password_hash) !== password) throw new Error('Invalid credentials');

      const roles = db.query('roles', { user_id: profile.id }, { isAdmin: true });
      const userRole = roles[0]?.role || 'client';

      db.insert('activity_log', {
        user_id: profile.id,
        action: 'signin',
        description: `User signed in`,
      });

      setUser(profile);
      setRole(userRole);
      return profile;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    if (user) {
      db.insert('activity_log', {
        user_id: user.id,
        action: 'signout',
        description: 'User signed out',
      });
    }
    setUser(null);
    setRole(null);
  }, [user]);

  const isAdmin = role === 'admin';
  const isClient = role === 'client';
  const isAuthenticated = !!user;

  const dbCtx = { userId: user?.id, isAdmin };

  return (
    <AuthContext.Provider value={{
      user, role, loading, isAdmin, isClient, isAuthenticated, dbCtx,
      signUp, signIn, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
