
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatsappJobAlerts = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your WhatsApp number to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribed(true);
    toast({
      title: "Subscription Successful",
      description: "You will now receive job alerts via WhatsApp",
    });
  };

  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              WhatsApp Job Alerts
            </CardTitle>
            <CardDescription>
              Receive job notifications via WhatsApp voice notes and messages
            </CardDescription>
          </div>
          <Badge variant="success" className="ml-auto">Free Service</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          {!isSubscribed ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your 10-digit mobile number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-gray-900 placeholder-gray-400 border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobCategory">Job Category</Label>
                <Select onValueChange={setJobCategory} value={jobCategory}>
                  <SelectTrigger id="jobCategory">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="factory">Factory Work</SelectItem>
                    <SelectItem value="driving">Driving</SelectItem>
                    <SelectItem value="domestic">Domestic Help</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-800">Successfully Subscribed!</h3>
              </div>
              <p className="text-sm text-green-700 mb-4">
                You will now receive job alerts for {jobCategory || 'all categories'} 
                in {location || 'all locations'} on {phoneNumber}.
              </p>
              <div className="text-xs text-muted-foreground">
                To unsubscribe, reply with "STOP" to any message you receive.
              </div>
            </div>
          )}
          
          <div className="bg-muted/30 rounded-md p-4 mt-6">
            <h3 className="font-medium mb-2">How it works:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Subscribe with your WhatsApp number</li>
              <li>Receive voice notes and text alerts about new jobs</li>
              <li>Reply with specific keywords to express interest</li>
              <li>Get application updates right on WhatsApp</li>
              <li>All messages are free to receive</li>
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/10 border-t pt-4">
        {!isSubscribed ? (
          <Button onClick={handleSubscribe} className="w-full">Subscribe for Alerts</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsSubscribed(false)} className="w-full">
            Update Preferences
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WhatsappJobAlerts;
