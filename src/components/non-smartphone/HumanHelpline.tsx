
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headset, Phone, MapPin, MessageSquare, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HelplineCenter {
  id: string;
  name: string;
  location: string;
  languages: string[];
  phone: string;
  hours: string;
  services: string[];
}

const HumanHelpline = () => {
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hindi');
  
  const handleCallHelpline = (language: string) => {
    toast({
      title: `Calling ${language} Helpline`,
      description: "Our representatives will assist you with your job search",
    });
  };
  
  const helplineCenters: HelplineCenter[] = [
    {
      id: '1',
      name: 'Delhi Job Helpline Center',
      location: 'Connaught Place, New Delhi',
      languages: ['Hindi', 'English', 'Punjabi'],
      phone: '1800-425-1234',
      hours: '8:00 AM - 8:00 PM',
      services: ['Job Search', 'Application Help', 'Interview Guidance']
    },
    {
      id: '2',
      name: 'Mumbai Job Support Center',
      location: 'Andheri East, Mumbai',
      languages: ['Hindi', 'English', 'Marathi'],
      phone: '1800-425-5678',
      hours: '9:00 AM - 7:00 PM',
      services: ['Job Matching', 'Document Verification', 'Employer Connections']
    },
    {
      id: '3',
      name: 'Chennai Career Assistance',
      location: 'T. Nagar, Chennai',
      languages: ['Tamil', 'English', 'Telugu'],
      phone: '1800-425-9012',
      hours: '8:30 AM - 6:30 PM',
      services: ['Skill Assessment', 'Local Job Information', 'Training Resources']
    },
    {
      id: '4',
      name: 'Kolkata Employment Center',
      location: 'Salt Lake, Kolkata',
      languages: ['Bengali', 'Hindi', 'English'],
      phone: '1800-425-3456',
      hours: '9:00 AM - 6:00 PM',
      services: ['Job Registration', 'Resume Building', 'Job Alerts']
    }
  ];

  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Headset className="h-5 w-5" />
              Human Helpline Support
            </CardTitle>
            <CardDescription>
              Speak with job counselors in your regional language
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">Toll-Free</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="hindi" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-6">
            <TabsTrigger value="hindi">Hindi</TabsTrigger>
            <TabsTrigger value="tamil">Tamil</TabsTrigger>
            <TabsTrigger value="telugu">Telugu</TabsTrigger>
            <TabsTrigger value="bengali">Bengali</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>
          
          {['hindi', 'tamil', 'telugu', 'bengali', 'english'].map((language) => (
            <TabsContent value={language} key={language} className="space-y-4">
              <div className="text-center p-4 border rounded-md bg-muted/10">
                <div className="text-2xl font-bold mb-2">
                  1800-XXX-{language === 'hindi' ? '1111' : 
                           language === 'tamil' ? '2222' : 
                           language === 'telugu' ? '3333' : 
                           language === 'bengali' ? '4444' : '5555'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Available Monday to Saturday, 9:00 AM to 6:00 PM
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => handleCallHelpline(language)}
                >
                  <Phone className="mr-2 h-4 w-4" /> 
                  Call {language.charAt(0).toUpperCase() + language.slice(1)} Helpline
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Our {language.charAt(0).toUpperCase() + language.slice(1)} helpline provides:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                  <li>Job search assistance based on your skills and location</li>
                  <li>Guidance on creating voice profiles for employers</li>
                  <li>Information about training programs and skill development</li>
                  <li>Application status updates and interview scheduling</li>
                  <li>Support for resolving issues with employers or payments</li>
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="border-t pt-6 mt-6">
          <h3 className="font-medium mb-4">Visit Our Support Centers</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {helplineCenters.map((center) => (
              <div key={center.id} className="border rounded-md p-3 text-sm">
                <div className="flex justify-between">
                  <h4 className="font-medium">{center.name}</h4>
                  <Badge variant="outline" className="text-xs">{center.hours}</Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" /> {center.location}
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> <span className="font-medium">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MessageSquare className="h-3 w-3" /> Languages: {center.languages.join(', ')}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {center.services.map((service, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{service}</Badge>
                  ))}
                </div>
                <Button 
                  asChild 
                  variant="link" 
                  className="text-xs p-0 h-auto mt-2"
                >
                  <a href="#" target="_blank">View on map</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/10 border-t pt-4">
        <Button variant="outline" className="w-full sm:w-auto">
          <Users className="mr-2 h-4 w-4" /> Find Nearby Center
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <MessageSquare className="mr-2 h-4 w-4" /> Request Callback
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HumanHelpline;
