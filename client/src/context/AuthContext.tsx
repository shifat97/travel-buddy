import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import StorageService from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const foundUser = StorageService.findUserByEmail(email);
      if (foundUser && foundUser.password === password) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        StorageService.setCurrentUser(userWithoutPassword);
      } else {
        throw new Error('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const existingUser = StorageService.findUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      };

      StorageService.saveUser(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      StorageService.setCurrentUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    StorageService.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
