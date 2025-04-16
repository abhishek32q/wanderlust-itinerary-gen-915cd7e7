
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Pre-defined responses for the chatbot
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! Welcome to ZenWay Travels. How may I assist you today?",
    "Hi there! I'm your ZenWay Travels assistant. What can I help you with?",
  ],
  booking: [
    "To book a trip, you can browse our destinations and use our trip planner. Would you like me to guide you through the process?",
    "Booking is easy! Just select your destinations, plan your itinerary, and proceed to checkout. Can I help you find a destination?",
  ],
  payment: [
    "We accept credit/debit cards, net banking, and UPI payments. All transactions are secure and encrypted.",
    "Our payment gateway is completely secure. You can pay via cards, net banking, or UPI. Need help with payment?",
  ],
  destinations: [
    "We offer trips to various destinations across India including Taj Mahal, Jaipur, Goa, and many more. Would you like recommendations based on your interests?",
    "ZenWay specializes in curated trips to India's most beautiful destinations. Are you looking for beaches, mountains, cultural sites, or wildlife sanctuaries?",
  ],
  cancellation: [
    "Our cancellation policy allows free cancellation up to 48 hours before your trip starts. After that, cancellation fees may apply.",
    "You can cancel your booking without charges up to 48 hours before departure. Would you like to know more about our policies?",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase your question?",
    "I'm still learning! Could you ask that in a different way?",
    "I don't have information about that yet. Would you like to speak with a human agent?",
  ]
};

// Function to find the best matching response category
const findResponseCategory = (input: string): string => {
  input = input.toLowerCase();
  
  if (input.match(/hello|hi|hey|greetings/)) return 'greeting';
  if (input.match(/book|booking|reserve|reservation|plan trip/)) return 'booking';
  if (input.match(/pay|payment|transaction|card|upi|bank/)) return 'payment';
  if (input.match(/destination|place|location|where|taj|goa|jaipur/)) return 'destinations';
  if (input.match(/cancel|refund|money back/)) return 'cancellation';
  
  return 'fallback';
};

// Function to pick a random response from the category
const getRandomResponse = (category: string): string => {
  const responses = botResponses[category] || botResponses.fallback;
  return responses[Math.floor(Math.random() * responses.length)];
};

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      const initialMessage = {
        id: Date.now().toString(),
        text: "Hi there! I'm Zen, your AI travel assistant. How can I help you plan your perfect trip?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const category = findResponseCategory(userMessage.text);
      const botReply = getRandomResponse(category);
      
      const botMessage = {
        id: Date.now().toString(),
        text: botReply,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Chat Window */}
      {isOpen && (
        <Card 
          className={cn(
            "fixed right-6 shadow-lg flex flex-col transition-all duration-300",
            isMinimized 
              ? "bottom-6 h-14 w-64" 
              : "bottom-6 h-[450px] w-80 md:w-96"
          )}
        >
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-medium">Zen AI Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              {!isMinimized ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsMinimized(true)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              ) : null}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div 
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        msg.isBot 
                          ? "bg-muted text-muted-foreground rounded-tl-none" 
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {msg.isBot ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs">
                          {msg.isBot ? "Zen" : "You"}
                        </span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs">Zen</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {isMinimized && (
            <div 
              className="flex-1 flex items-center px-3 cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <span className="text-sm">Chat with Zen AI Assistant</span>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
