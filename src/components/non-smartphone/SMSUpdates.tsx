
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SMSUpdates = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const smsExamples = [
    { type: 'Application Status', message: 'Your application for Plumber at ABC Construction has been received. Ref: JOB12345', time: '2 May, 10:30 AM' },
    { type: 'Interview Invitation', message: 'You are invited for an interview on 7 May at 11:00 AM for Driver position at XYZ Logistics. Reply YES to confirm.', time: '3 May, 9:15 AM' },
    { type: 'Job Match', message: 'New job matching your skills: Electrician needed in Delhi, ₹18000/month. Call 1800XXXYYYY for details.', time: '4 May, 2:45 PM' },
    { type: 'Selection Update', message: 'Congratulations! You have been selected for the Carpenter position. Call 1800XXXYYYY to accept the offer.', time: '5 May, 11:20 AM' },
  ];
  
  const handleSubscribe = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribed(true);
    toast({
      title: "Subscription Successful",
      description: "You will now receive SMS updates about your job applications",
    });
  };

  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              SMS Job Updates
            </CardTitle>
            <CardDescription>
              Receive job application updates via SMS in your local language
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-auto">Free Service</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {!isSubscribed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your 10-digit mobile number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-gray-900 placeholder-gray-400 border-gray-300"
                />
                <p className="text-xs text-muted-foreground">
                  Standard SMS rates may apply based on your mobile plan
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">Successfully Subscribed!</h3>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                Your phone number {phoneNumber} has been registered for SMS updates.
              </p>
              <div className="text-xs text-muted-foreground">
                To unsubscribe, send "STOP" to the number from which you receive messages.
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-medium mb-3">Sample SMS Updates</h3>
            <div className="space-y-3">
              {smsExamples.map((sms, index) => (
                <div key={index} className="border rounded-md p-3 bg-muted/10">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline">{sms.type}</Badge>
                    <span className="text-xs text-muted-foreground">{sms.time}</span>
                  </div>
                  <p className="text-sm">{sms.message}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-md p-4">
            <h3 className="font-medium mb-2">Benefits:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Stay updated on your job applications without internet access</li>
              <li>Receive messages in your preferred language</li>
              <li>Get timely notifications about interviews and selections</li>
              <li>Reply directly to confirm interviews or accept offers</li>
              <li>Accessible on any basic mobile phone</li>
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/10 border-t pt-4">
        {!isSubscribed ? (
          <Button onClick={handleSubscribe} className="w-full">Subscribe for SMS Updates</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsSubscribed(false)} className="w-full">
            Update Phone Number
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SMSUpdates;
