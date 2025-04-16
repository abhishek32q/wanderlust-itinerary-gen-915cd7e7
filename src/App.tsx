
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DestinationProvider } from './context/DestinationContext';
import { BookingProvider } from './context/BookingContext';
import { TripPlanningProvider } from './context/TripPlanningContext';

// Pages
import HomePage from './pages/HomePage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import BookingDetails from './pages/BookingDetails';
import DestinationDetail from './components/DestinationDetail';
import TripPlannerPage from './pages/TripPlannerPage';

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DestinationProvider>
          <BookingProvider>
            <TripPlanningProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/destinations" element={<Index />} />
                    <Route path="/destinations/:id" element={<DestinationDetail />} />
                    <Route path="/bookings/:id" element={<BookingDetails />} />
                    <Route path="/trip-planner" element={<TripPlannerPage />} />
                    <Route path="/bookings" element={<BookingDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </BrowserRouter>
              </TooltipProvider>
            </TripPlanningProvider>
          </BookingProvider>
        </DestinationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
