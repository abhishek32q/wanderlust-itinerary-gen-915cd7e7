
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ChevronDown, Home, Map, Compass, Calendar, Sun, Info, Phone, FileText, ShieldCheck } from 'lucide-react';
import { useMobile } from '../hooks/use-mobile';
import AIChatbot from './AIChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { isMobile } = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl">ZenWay Travels</span>
            </Link>
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
            
            {/* Desktop navigation */}
            {!isMobile && (
              <nav className="flex items-center space-x-1">
                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${isActive('/')}`}>
                  Home
                </Link>
                <Link to="/destinations" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${isActive('/destinations')}`}>
                  Destinations
                </Link>
                <Link to="/trip-planner" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${isActive('/trip-planner')}`}>
                  Plan A Trip
                </Link>
                <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${isActive('/about')}`}>
                  About Us
                </Link>
                <Link to="/contact" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${isActive('/contact')}`}>
                  Contact
                </Link>
              </nav>
            )}
            
            {/* User menu (desktop) */}
            {!isMobile && (
              <div className="flex items-center">
                {currentUser ? (
                  <div className="relative group">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span>{currentUser.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-1">
                        {currentUser.isPremium && (
                          <div className="px-4 py-2 text-sm text-amber-600 border-b flex items-center">
                            <span className="text-amber-500 font-bold mr-1">✦</span> Premium Member
                          </div>
                        )}
                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                        <Link to="/bookings" className="block px-4 py-2 text-sm hover:bg-gray-100">My Bookings</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => navigate('/login')}>Sign in</Button>
                    <Button onClick={() => navigate('/register')}>Sign up</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link to="/destinations" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              <Map className="w-5 h-5 mr-3" />
              Destinations
            </Link>
            <Link to="/trip-planner" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              <Compass className="w-5 h-5 mr-3" />
              Plan A Trip
            </Link>
            {currentUser && (
              <Link to="/bookings" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                <Calendar className="w-5 h-5 mr-3" />
                My Bookings
              </Link>
            )}
            <Link to="/about" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              <Info className="w-5 h-5 mr-3" />
              About Us
            </Link>
            <Link to="/contact" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              <Phone className="w-5 h-5 mr-3" />
              Contact
            </Link>
            
            <div className="pt-4 mt-4 border-t">
              {currentUser ? (
                <>
                  <div className="p-3">
                    <div className="font-medium">{currentUser.name}</div>
                    <div className="text-sm text-gray-500">{currentUser.email}</div>
                    {currentUser.isPremium && (
                      <div className="text-sm text-amber-600 flex items-center mt-1">
                        <span className="text-amber-500 font-bold mr-1">✦</span> Premium Member
                      </div>
                    )}
                  </div>
                  <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                    Sign out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button onClick={() => { navigate('/login'); setIsOpen(false); }}>Sign in</Button>
                  <Button variant="outline" onClick={() => { navigate('/register'); setIsOpen(false); }}>Sign up</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ZenWay Travels</h3>
              <p className="text-gray-400 text-sm">
                Discover the essence of India with our curated travel experiences designed for peace of mind and authentic connections.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
                <li><Link to="/trip-planner" className="hover:text-white">Plan A Trip</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><a href="#" className="hover:text-white">Cancellation Policy</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                123 Travel Lane, Zen District<br />
                New Delhi, 110001, India
              </address>
              <p className="text-gray-400 mt-2">
                <span className="block">Phone: +91 98765 43210</span>
                <span className="block">Email: info@zenwaytravels.com</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ZenWay Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Layout;
