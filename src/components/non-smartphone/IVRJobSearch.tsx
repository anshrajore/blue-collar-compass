
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Mic, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IVRJobSearch = () => {
  const { toast } = useToast();
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  
  const tollFreeNumber = "1800-XXX-XXXX";
  
  const ivr = {
    main: {
      title: "Main Menu",
      options: [
        { key: "1", label: "Search Jobs", value: "search" },
        { key: "2", label: "Check Application Status", value: "status" },
        { key: "3", label: "Register as Job Seeker", value: "register" },
        { key: "4", label: "Talk to a Representative", value: "talk" },
        { key: "5", label: "Hear About Latest Jobs", value: "latest" }
      ]
    },
    search: {
      title: "Job Search",
      options: [
        { key: "1", label: "Construction Jobs", value: "construction" },
        { key: "2", label: "Factory Work", value: "factory" },
        { key: "3", label: "Driving Jobs", value: "driving" },
        { key: "4", label: "Domestic Help", value: "domestic" },
        { key: "0", label: "Return to Main Menu", value: "main" }
      ]
    }
  };
  
  const simulateCall = () => {
    setIsCallActive(true);
    setCurrentMenu('main');
    toast({
      title: "Call Connected",
      description: "You're now connected to the IVR system",
    });
  };
  
  const endCall = () => {
    setIsCallActive(false);
    setCurrentMenu(null);
    toast({
      title: "Call Ended",
      description: "Thank you for using our service",
    });
  };
  
  const handleKeyPress = (option: any) => {
    toast({
      title: `Option ${option.key} selected`,
      description: option.label,
    });
    
    if (option.value === 'main') {
      setCurrentMenu('main');
    } else if (currentMenu === 'main' && option.value === 'search') {
      setCurrentMenu('search');
    } else {
      toast({
        title: "Job Details",
        description: `You selected ${option.label}. We'll send details to your registered phone.`,
      });
    }
  };

  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              IVR Job Search System
            </CardTitle>
            <CardDescription>
              Call our toll-free number to search for jobs using your feature phone
            </CardDescription>
          </div>
          <Badge variant="default" className="ml-auto">Free to Call</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-6">
          <div className="text-2xl font-bold mb-2">{tollFreeNumber}</div>
          <p className="text-sm text-muted-foreground text-center">
            Available 24/7 in Hindi, English, Tamil, Telugu, and Bengali
          </p>
        </div>
        
        {isCallActive && currentMenu && (
          <div className="mt-4 border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{ivr[currentMenu as keyof typeof ivr].title}</h3>
              <Badge variant="outline">Active Call</Badge>
            </div>
            
            <div className="grid gap-2 mt-4">
              {ivr[currentMenu as keyof typeof ivr].options.map((option) => (
                <Button 
                  key={option.key} 
                  variant="outline" 
                  className="justify-between"
                  onClick={() => handleKeyPress(option)}
                >
                  <span>{option.label}</span>
                  <Badge variant="secondary" className="ml-2">{option.key}</Badge>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 space-y-4">
          <div className="bg-muted/30 rounded-md p-4">
            <h3 className="font-medium mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Call the toll-free number from any phone</li>
              <li>Select your preferred language</li>
              <li>Follow voice prompts to find jobs</li>
              <li>Press keys (0-9) to navigate through options</li>
              <li>Apply to jobs directly through your phone</li>
            </ol>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/10 border-t pt-4">
        {!isCallActive ? (
          <Button onClick={simulateCall} className="w-full sm:w-auto">
            <Phone className="mr-2 h-4 w-4" /> Simulate Call
          </Button>
        ) : (
          <Button onClick={endCall} variant="destructive" className="w-full sm:w-auto">
            <VolumeX className="mr-2 h-4 w-4" /> End Call
          </Button>
        )}
        <Button variant="outline" className="w-full sm:w-auto">
          <MessageSquare className="mr-2 h-4 w-4" /> Missed Call Alert
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IVRJobSearch;
