
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, User, LogOut, LogIn, PlaneTakeoff, Info, Mail, Shield, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">ZenWay</span>
            <span className="text-lg font-medium text-muted-foreground">Travels</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-gray-700 hover:text-primary transition-colors",
                isActive('/') && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={cn(
                "text-gray-700 hover:text-primary transition-colors",
                isActive('/destinations') && "text-primary font-medium"
              )}
            >
              Destinations
            </Link>
            <Link 
              to="/trip-planner" 
              className={cn(
                "text-gray-700 hover:text-primary transition-colors",
                isActive('/trip-planner') && "text-primary font-medium"
              )}
            >
              Plan Trip
            </Link>
            {currentUser?.isPremium && (
              <Link 
                to="/premium" 
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors",
                  isActive('/premium') && "text-primary font-medium"
                )}
              >
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
                <Link 
                  to="/bookings" 
                  className={cn(
                    "text-gray-600 hover:text-primary",
                    isActive('/bookings') && "text-primary font-medium"
                  )}
                >
                  My Trips
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "flex items-center text-gray-600 hover:text-primary",
                    isActive('/profile') && "text-primary font-medium"
                  )}
                >
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
      
      {/* Mobile Navigation (visible on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around items-center p-3">
          <Link to="/" className={cn(
            "flex flex-col items-center text-xs", 
            isActive('/') ? "text-primary" : "text-gray-600"
          )}>
            <Home className="h-5 w-5 mb-1" />
            <span>Home</span>
          </Link>
          <Link to="/destinations" className={cn(
            "flex flex-col items-center text-xs", 
            isActive('/destinations') ? "text-primary" : "text-gray-600"
          )}>
            <Map className="h-5 w-5 mb-1" />
            <span>Explore</span>
          </Link>
          <Link to="/trip-planner" className={cn(
            "flex flex-col items-center text-xs", 
            isActive('/trip-planner') ? "text-primary" : "text-gray-600"
          )}>
            <PlaneTakeoff className="h-5 w-5 mb-1" />
            <span>Plan</span>
          </Link>
          <Link to="/profile" className={cn(
            "flex flex-col items-center text-xs", 
            isActive('/profile') ? "text-primary" : "text-gray-600"
          )}>
            <User className="h-5 w-5 mb-1" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ZenWay Travels</h3>
              <p className="text-gray-600 text-sm">
                Discover India's hidden gems with our personalized travel experiences. 
                We create journeys that connect you to authentic places and people.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-primary text-sm">Home</Link></li>
                <li><Link to="/destinations" className="text-gray-600 hover:text-primary text-sm">Destinations</Link></li>
                <li><Link to="/trip-planner" className="text-gray-600 hover:text-primary text-sm">Plan A Trip</Link></li>
                <li><Link to="/bookings" className="text-gray-600 hover:text-primary text-sm">My Bookings</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact Us</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-primary text-sm">About Us</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-600 text-sm space-y-2">
                <p>123 Harmony Road</p>
                <p>New Delhi, 110001</p>
                <p>India</p>
                <p className="mt-2">Email: info@zenwaytravels.com</p>
                <p>Phone: +91 98765 43210</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ZenWay Travels. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-500 hover:text-primary text-sm flex items-center">
                <Info className="h-4 w-4 mr-1" />
                About
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-primary text-sm flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-primary text-sm flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary text-sm flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
