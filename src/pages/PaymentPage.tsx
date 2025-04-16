
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Payment Successful!",
        description: "Your trip has been booked successfully.",
        variant: "default",
      });
      
      navigate('/bookings');
    }, 2000);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const isComplete = form.checkValidity();
    setFormComplete(isComplete);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-gray-500 mb-6">Complete your payment to confirm your booking</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <Tabs defaultValue="card">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card">
                  <Card className="p-6">
                    <form onChange={handleFormChange} onSubmit={handlePayment}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input 
                            id="cardName" 
                            placeholder="Name as it appears on card" 
                            required 
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            required 
                            minLength={16}
                            maxLength={19}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY" 
                              required 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              type="password" 
                              placeholder="***" 
                              required 
                              minLength={3}
                              maxLength={4}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3">
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            Your payment information is encrypted and secure. We never store your card details.
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={loading || !formComplete}
                        >
                          {loading ? (
                            <>Processing Payment...</>
                          ) : (
                            <>Pay Now</>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Card>
                </TabsContent>
                
                <TabsContent value="netbanking">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-500">Select your bank to continue to secure payment</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'PNB', 'Bank of Baroda'].map((bank) => (
                          <Button key={bank} variant="outline" className="justify-start">
                            {bank}
                          </Button>
                        ))}
                      </div>
                      <Button className="w-full">Continue to Bank</Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="upi">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="name@upi" className="mt-1" />
                      </div>
                      <Button className="w-full">Pay with UPI</Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip Cost:</span>
                    <span>₹12,500</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel (3 nights):</span>
                    <span>₹9,000</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transport:</span>
                    <span>₹3,200</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guide Services:</span>
                    <span>₹2,500</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Discounts:</span>
                    <span>-₹1,500</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₹25,700</span>
                  </div>
                  
                  <div className="pt-4">
                    <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Free cancellation until 48 hours before trip</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
