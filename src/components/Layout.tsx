import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, MapPin, Star, Navigation, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/trip-planner', label: 'Plan Trip' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">Zenway</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={`text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/premium"
              className={`text-sm font-medium flex items-center ${
                isActive('/premium')
                  ? 'text-amber-600'
                  : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              <Star className="h-4 w-4 mr-1" />
              Premium
            </NavLink>
          </nav>

          {/* User/Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full h-9 w-9 p-0 focus-visible:ring-0"
                  >
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings-history" className="w-full cursor-pointer">
                      <Navigation className="h-4 w-4 mr-2" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/destinations" className="text-gray-600 hover:text-blue-600">Popular Places</Link></li>
                <li><Link to="/destinations/featured" className="text-gray-600 hover:text-blue-600">Featured</Link></li>
                <li><Link to="/destinations/recommended" className="text-gray-600 hover:text-blue-600">Recommended</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-4 text-gray-500">
                <a href="#" className="hover:text-blue-600">FB</a>
                <a href="#" className="hover:text-blue-600">TW</a>
                <a href="#" className="hover:text-blue-600">IG</a>
                <a href="#" className="hover:text-blue-600">YT</a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} Zenway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
