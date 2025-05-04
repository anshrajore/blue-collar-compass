
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Check, 
  Briefcase,
  MapPin,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertPreference {
  id: string;
  label: string;
  selected: boolean;
}

const WhatsAppJobAlerts = () => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<AlertPreference[]>([
    { id: 'voice', label: 'Voice Messages', selected: true },
    { id: 'text', label: 'Text Messages', selected: false },
    { id: 'daily', label: 'Daily Updates', selected: true },
    { id: 'immediate', label: 'Immediate Alerts', selected: false },
  ]);
  
  const handleNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreferences(true);
  };
  
  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, selected: !pref.selected } : pref
    ));
  };
  
  const handlePreferencesSubmit = () => {
    toast({
      title: "WhatsApp alerts activated",
      description: "You'll start receiving job alerts via WhatsApp",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> 
          WhatsApp Job Alerts
        </CardTitle>
        <CardDescription>
          Receive job updates via WhatsApp in your language
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showPreferences ? (
          <form onSubmit={handleNumberSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input 
                id="whatsapp" 
                type="tel" 
                placeholder="Enter your WhatsApp number" 
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="text-lg"
              />
            </div>
            
            <Button type="submit" className="w-full">Continue</Button>
            
            <div className="border-t pt-3 mt-6">
              <h4 className="text-sm font-medium mb-2">Example WhatsApp Alert:</h4>
              <div className="bg-muted p-3 rounded-lg text-sm">
                <div className="flex items-center gap-1 mb-2 font-medium">
                  <Briefcase className="h-3 w-3" /> New Job Alert
                </div>
                <p className="mb-2">Plumber needed for residential project in Delhi</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Delhi, India
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Posted 2 days ago
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-2">
                  Dial *1234# to apply or visit our center
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Customize how you receive job alerts on +91 {whatsappNumber}:
            </p>
            
            <div className="space-y-3">
              {preferences.map(pref => (
                <div 
                  key={pref.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${pref.selected ? 'border-primary bg-primary/5' : ''} cursor-pointer`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <span>{pref.label}</span>
                  {pref.selected && <Check className="h-4 w-4 text-primary" />}
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-2" 
              onClick={handlePreferencesSubmit}
            >
              Activate WhatsApp Alerts
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              You can stop receiving alerts by texting "STOP" to our WhatsApp number
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppJobAlerts;
