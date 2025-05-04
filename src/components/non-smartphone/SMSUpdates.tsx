
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, Bell, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SMSExample {
  title: string;
  message: string;
}

const smsExamples: SMSExample[] = [
  {
    title: 'Application Confirmation',
    message: 'Your application for Plumber job at BuildTech is received. Your application ID is JOB123. Call 1234567890 for details.'
  },
  {
    title: 'Interview Invitation',
    message: 'You are invited for interview on 7 May at 10 AM for Driver job at SpeedEx. Address: 123 Main St, Delhi. Reply YES to confirm.'
  },
  {
    title: 'Job Offer',
    message: 'Congratulations! You are selected for Security Guard at SecureTech. Salary: Rs.15000/month. Report on 10 May. Call 1234567890 to accept.'
  },
  {
    title: 'Application Status',
    message: 'Your application for Cook at FoodJoy is under review. We will contact you within 3 days. SMS HELP to 12345 for assistance.'
  },
];

const SMSUpdates = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    toast({
      title: "SMS updates activated",
      description: "You'll receive job application updates via SMS",
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS-Based Job Updates
          </CardTitle>
          <CardDescription>
            Receive job application updates via SMS in your local language
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    className="text-lg rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Standard SMS rates may apply. No additional charges.
                </p>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mr-4">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">SMS Updates Activated</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive job application updates at +91 {phoneNumber}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Example SMS Updates You'll Receive
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smsExamples.map((example, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-muted/40 pb-2">
                <CardTitle className="text-base font-medium">{example.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-sm">{example.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SMSUpdates;
