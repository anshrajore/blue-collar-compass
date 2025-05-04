
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Phone, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IVRJobSearch = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would make an API call to register the phone number
    setSubmitted(true);
    toast({
      title: "Phone number registered",
      description: "You'll receive a call soon with job listings",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" /> 
          IVR Job Search System
        </CardTitle>
        <CardDescription>
          Get job listings via phone call in your language. No smartphone needed!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Enter your 10-digit phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">
                You'll receive a call at this number with job listings
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <div className="flex flex-wrap gap-2">
                {['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali'].map((lang) => (
                  <Badge 
                    key={lang}
                    variant={language.toLowerCase() === lang.toLowerCase() ? 'default' : 'outline'}
                    className="cursor-pointer py-1 px-3"
                    onClick={() => setLanguage(lang.toLowerCase())}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-4">
              <Send className="mr-2 h-4 w-4" /> Request Call
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-2">
              Free service. Standard call rates may apply.
            </p>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Call Request Submitted</h3>
            <p className="text-muted-foreground mb-4">
              We'll call you at {phoneNumber} with job listings in {language} soon
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Submit another request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IVRJobSearch;
