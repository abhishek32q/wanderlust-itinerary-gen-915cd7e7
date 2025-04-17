
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, UserRound } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const LiveChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you with your travel plans today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Mock responses for demo
  const mockResponses = [
    "I'd be happy to help you with that! Could you provide more details?",
    "That's a great question about our tour packages. Our most popular package is the Golden Triangle tour.",
    "You can find all our destination options on the Destinations page. We have over 100 locations across India!",
    "Yes, we do provide customized travel plans. You can use our Trip Planner to create your perfect itinerary.",
    "Our customer service team is available 24/7. Feel free to call us at +91 98765 43210 for immediate assistance.",
    "Thank you for your question. Let me check with our experts and get back to you shortly."
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * mockResponses.length);
      const botMessage: Message = {
        text: mockResponses[responseIndex],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleOpen = () => {
    setIsOpen(true);
    toast({
      title: "Live Chat Started",
      description: "Our AI assistant is ready to help you.",
    });
  };
  
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-xl">
          <div className="bg-primary p-3 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">ZenWay Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7 text-white hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3 h-80 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div className={`p-3 rounded-lg max-w-[80%] ${
                  msg.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white border'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <UserRound className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      ) : (
        <Button 
          onClick={handleOpen}
          className="rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default LiveChatButton;
