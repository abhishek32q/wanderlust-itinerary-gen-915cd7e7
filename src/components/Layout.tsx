
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Map, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">ZenWay</span>
            <span className="text-lg font-medium text-muted-foreground">Travels</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/destinations" className="text-gray-700 hover:text-primary transition-colors">Destinations</Link>
            <Link to="/trip-planner" className="text-gray-700 hover:text-primary transition-colors">Plan Trip</Link>
            {currentUser?.isPremium && (
              <Link to="/premium" className="text-gray-700 hover:text-primary transition-colors">
                <span className="inline-flex items-center">
                  <span className="mr-1 text-amber-500">✦</span>
                  Premium
                </span>
              </Link>
            )}
          </nav>
          
          {/* User Controls */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link to="/bookings" className="text-gray-600 hover:text-primary">
                  My Trips
                </Link>
                <Link to="/profile" className="flex items-center text-gray-600 hover:text-primary">
                  <User className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">{currentUser.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-primary flex items-center"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline ml-1">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-primary"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ZenWay Travels. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-500 hover:text-primary text-sm">About</Link>
              <Link to="/contact" className="text-gray-500 hover:text-primary text-sm">Contact</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-primary text-sm">Privacy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary text-sm">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
