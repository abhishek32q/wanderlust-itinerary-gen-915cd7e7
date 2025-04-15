
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  upgradeToPremuim: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('travel_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('travel_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user - in a real app this would come from the API
      const user = {
        id: 'user_123',
        name: 'Demo User',
        email,
        isPremium: false
      };
      
      setCurrentUser(user);
      localStorage.setItem('travel_user', JSON.stringify(user));
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('travel_user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  }, [toast]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user - in a real app this would come from the API
      const user = {
        id: `user_${Date.now().toString(36)}`,
        name,
        email,
        isPremium: false
      };
      
      setCurrentUser(user);
      localStorage.setItem('travel_user', JSON.stringify(user));
      
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created.',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const upgradeToPremuim = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = {
        ...currentUser,
        isPremium: true
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('travel_user', JSON.stringify(updatedUser));
      
      toast({
        title: 'Upgrade successful!',
        description: 'You are now a premium member.',
      });
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: 'Upgrade failed',
        description: 'An error occurred during the upgrade process.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [currentUser, toast]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        login,
        logout,
        register,
        upgradeToPremuim
      }}
    >
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
