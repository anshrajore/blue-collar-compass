
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import IVRJobSearch from '@/components/non-smartphone/IVRJobSearch';
import WhatsAppJobAlerts from '@/components/non-smartphone/WhatsAppJobAlerts';
import HumanHelpline from '@/components/non-smartphone/HumanHelpline';
import SMSUpdates from '@/components/non-smartphone/SMSUpdates';
import { Phone, MessageSquare, HeadphonesIcon, Radio, Users } from 'lucide-react';

const NonSmartphoneAccess = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Blue-Collar Jobs Without Smartphone</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Access job opportunities through phone calls, SMS, and community resources
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-muted rounded-full px-4 py-2">
              <Phone className="h-4 w-4 mr-2" />
              <span>Phone-Based Access</span>
            </div>
            <div className="flex items-center bg-muted rounded-full px-4 py-2">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>SMS Updates</span>
            </div>
            <div className="flex items-center bg-muted rounded-full px-4 py-2">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              <span>Voice Support</span>
            </div>
            <div className="flex items-center bg-muted rounded-full px-4 py-2">
              <Radio className="h-4 w-4 mr-2" />
              <span>Community Outreach</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <Tabs defaultValue="ivr" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="ivr" className="flex flex-col items-center py-3 px-2">
                <Phone className="h-5 w-5 mb-1" />
                <span>IVR Job Search</span>
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex flex-col items-center py-3 px-2">
                <MessageSquare className="h-5 w-5 mb-1" />
                <span>WhatsApp Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="helpline" className="flex flex-col items-center py-3 px-2">
                <HeadphonesIcon className="h-5 w-5 mb-1" />
                <span>Helpline</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex flex-col items-center py-3 px-2">
                <MessageSquare className="h-5 w-5 mb-1" />
                <span>SMS Updates</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="ivr" className="mt-0">
            <div className="py-8">
              <IVRJobSearch />
            </div>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="mt-0">
            <div className="py-8">
              <WhatsAppJobAlerts />
            </div>
          </TabsContent>
          
          <TabsContent value="helpline" className="mt-0">
            <div className="py-8">
              <HumanHelpline />
            </div>
          </TabsContent>
          
          <TabsContent value="sms" className="mt-0">
            <div className="py-8">
              <SMSUpdates />
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Users className="h-6 w-6" />
            Community Support Network
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"></path><path d="M7 14l4-4 4 4 5-5"></path></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Local NGO Partnerships</h3>
              <p className="text-sm text-muted-foreground">
                Visit local NGOs in your area who can help you find and apply for jobs using their resources
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"></path><path d="M8 7h.01"></path><path d="M16 7h.01"></path><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Community Centers</h3>
              <p className="text-sm text-muted-foreground">
                Access kiosks at community centers where volunteers help you register and apply for jobs
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path><path d="M12 11v8"></path><path d="M8 11v8"></path><path d="M16 11v8"></path></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Field Agents</h3>
              <p className="text-sm text-muted-foreground">
                Our verified field agents visit rural areas regularly to help job seekers register and apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NonSmartphoneAccess;
