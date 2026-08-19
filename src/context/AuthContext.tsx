// المسار: src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types/adminTypes';
import { usersdb } from '../data/usersDb'; // تعديل الاسم إلى usersdb
import { hasPermission } from '../utils/permissions';

interface AuthContextType {
  currentUser: UserProfile | null;
  login: (username: string) => boolean;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(usersdb[0]);

  const login = (username: string): boolean => {
    const foundUser = usersdb.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.status === 'active'
    );
    
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const checkPermission = (permission: string): boolean => {
    return hasPermission(currentUser, permission);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, checkPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};