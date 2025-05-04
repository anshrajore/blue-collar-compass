
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Clock, HelpCircle, Languages, MapPin } from 'lucide-react';

interface HelplineCard {
  region: string;
  languages: string[];
  number: string;
  hours: string;
}

const helplineData: HelplineCard[] = [
  {
    region: 'North India',
    languages: ['Hindi', 'Punjabi', 'Urdu'],
    number: '1800-123-4567',
    hours: '8 AM - 8 PM',
  },
  {
    region: 'South India',
    languages: ['Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    number: '1800-123-4568',
    hours: '8 AM - 8 PM',
  },
  {
    region: 'East India',
    languages: ['Bengali', 'Odia', 'Assamese'],
    number: '1800-123-4569',
    hours: '9 AM - 7 PM',
  },
  {
    region: 'West India',
    languages: ['Marathi', 'Gujarati'],
    number: '1800-123-4570',
    hours: '9 AM - 7 PM',
  },
];

const HumanHelpline = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Phone className="h-6 w-6" /> Human Helpline Support
        </h2>
        <p className="text-muted-foreground">
          Call our toll-free helpline numbers for job assistance in your language
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Regions</TabsTrigger>
            <TabsTrigger value="north">North</TabsTrigger>
            <TabsTrigger value="south">South</TabsTrigger>
            <TabsTrigger value="east">East</TabsTrigger>
            <TabsTrigger value="west">West</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplineData.map((helpline, index) => (
              <HelplineCard key={index} helpline={helpline} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="north" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplineData.filter(h => h.region === 'North India').map((helpline, index) => (
              <HelplineCard key={index} helpline={helpline} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="south" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplineData.filter(h => h.region === 'South India').map((helpline, index) => (
              <HelplineCard key={index} helpline={helpline} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="east" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplineData.filter(h => h.region === 'East India').map((helpline, index) => (
              <HelplineCard key={index} helpline={helpline} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="west" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplineData.filter(h => h.region === 'West India').map((helpline, index) => (
              <HelplineCard key={index} helpline={helpline} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5" /> How Our Helpline Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">
                Dial our toll-free number from any phone - no internet needed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Languages className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Speak Your Language</h3>
              <p className="text-sm text-muted-foreground">
                Our agents speak multiple regional languages to assist you better
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Get Job Help</h3>
              <p className="text-sm text-muted-foreground">
                Find jobs, get application help, or schedule interviews over the phone
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface HelplineCardProps {
  helpline: HelplineCard;
}

const HelplineCard: React.FC<HelplineCardProps> = ({ helpline }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/40 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {helpline.region}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{helpline.hours}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {helpline.languages.map((language, i) => (
            <Badge key={i} variant="secondary" className="font-normal">
              {language}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 pt-3 pb-3">
        <Button asChild variant="default" className="w-full">
          <a href={`tel:${helpline.number}`} className="flex items-center justify-center">
            <Phone className="mr-2 h-4 w-4" />
            {helpline.number}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HumanHelpline;
