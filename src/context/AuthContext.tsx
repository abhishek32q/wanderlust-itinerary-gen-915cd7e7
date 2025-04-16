
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User>;
  updateUserProfile: (userData: Partial<User>) => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API call with 500ms delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock check against users in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email);
        
        if (user && user.password === password) {
          const authenticatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isPremium: user.isPremium || false
          };
          
          localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          setCurrentUser(authenticatedUser);
          setIsAuthenticated(true);
          resolve(authenticatedUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === email);
        
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }
        
        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          password, // Note: In a real app, never store plain text passwords
          isPremium: false
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const authenticatedUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isPremium: newUser.isPremium
        };
        
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        setCurrentUser(authenticatedUser);
        setIsAuthenticated(true);
        resolve(authenticatedUser);
      }, 500);
    });
  };

  // Mock update user profile function
  const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!currentUser) {
          reject(new Error('No user is logged in'));
          return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
        
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        // Update the user in the users array
        users[userIndex] = {
          ...users[userIndex],
          ...userData
        };
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update the current user
        const updatedUser = {
          ...currentUser,
          ...userData
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup, updateUserProfile, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
