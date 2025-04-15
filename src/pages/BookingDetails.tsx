import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingContext";
import { useTripPlanning } from "../context/TripPlanningContext";
import { useAuth } from "../context/AuthContext";
import { useDestinations } from "../context/DestinationContext";
import Layout from "../components/Layout";
import TripItinerary from "../components/TripItinerary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatPrice } from "../utils/helpers";
import { CalendarDays, Users, MapPin, Star, Clock, IndianRupee, Calendar, AlertTriangle } from "lucide-react";

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById, cancelBooking } = useBookings();
  const { getTripPlanById } = useTripPlanning();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [tripPlan, setTripPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!bookingId) {
          throw new Error("Booking ID is missing.");
        }

        const fetchedBooking = getBookingById(bookingId);
        if (!fetchedBooking) {
          throw new Error("Booking not found.");
        }

        setBooking(fetchedBooking);

        if (fetchedBooking.tripPlanId) {
          const fetchedTripPlan = getTripPlanById(fetchedBooking.tripPlanId);
          if (!fetchedTripPlan) {
            throw new Error("Trip plan not found for this booking.");
          }
          setTripPlan(fetchedTripPlan);
        }
      } catch (err) {
        setError((err as Error).message || "Failed to load booking details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, getBookingById, getTripPlanById]);

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      await cancelBooking(booking.id);
      navigate("/bookings");
    } catch (err) {
      setError("Failed to cancel booking.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">Loading booking details...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="container mx-auto p-4">Booking not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <Badge variant="secondary">
            Booking ID: {booking.id}
          </Badge>
        </div>

        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">Trip Information</h2>
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  <span>
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{booking.numberOfPeople} Travelers</span>
                </div>
                {tripPlan && (
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{tripPlan.selectedDestinations.length} Destinations</span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div className="flex items-center justify-between mb-2">
                  <span>Total Cost:</span>
                  <span className="font-bold">{formatPrice(booking.totalCost)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span>Payment Status:</span>
                  <span className="font-bold">{booking.paymentStatus}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span>Payment Method:</span>
                  <span className="font-bold">{booking.paymentMethod}</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end">
              {booking.status === "confirmed" ? (
                <Button
                  variant="destructive"
                  onClick={handleCancelBooking}
                  className="h-10"
                >
                  Cancel Booking
                </Button>
              ) : (
                <AlertTriangle className="mr-2 h-4 w-4" />
              )}
            </div>
          </CardContent>
        </Card>

        {tripPlan && (
          <>
            <h2 className="text-2xl font-bold mb-4">Trip Itinerary</h2>
            <TripItinerary itinerary={tripPlan.itinerary} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingDetails;
