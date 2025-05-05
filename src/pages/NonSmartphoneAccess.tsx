
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare, Headset, Users, MicOff } from "lucide-react";
import IVRJobSearch from '@/components/non-smartphone/IVRJobSearch';
import WhatsappJobAlerts from '@/components/non-smartphone/WhatsappJobAlerts';
import HumanHelpline from '@/components/non-smartphone/HumanHelpline';
import SMSUpdates from '@/components/non-smartphone/SMSUpdates';

const NonSmartphoneAccess = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Jobs Without a Smartphone</h1>
          <p className="text-lg text-muted-foreground">
            Find and apply for jobs using basic feature phones, voice calls, SMS, and more
          </p>
        </div>

        <Card className="mb-8 border border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle>Why We Created This</CardTitle>
            <CardDescription>
              Making job opportunities accessible for everyone, regardless of technology access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-1">70%</h3>
                <p className="text-sm text-muted-foreground">
                  of blue-collar workers use feature phones rather than smartphones
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <Headset className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-1">8 Languages</h3>
                <p className="text-sm text-muted-foreground">
                  Support across major regional languages for voice and text
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-1">500+ Centers</h3>
                <p className="text-sm text-muted-foreground">
                  Community centers providing in-person assistance nationwide
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ivr" className="mb-10">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="ivr" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">IVR Job Search</span>
                <span className="inline sm:hidden">IVR</span>
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp Alerts</span>
                <span className="inline sm:hidden">WhatsApp</span>
              </TabsTrigger>
              <TabsTrigger value="helpline" className="flex items-center gap-2">
                <Headset className="h-4 w-4" />
                <span className="hidden sm:inline">Human Helpline</span>
                <span className="inline sm:hidden">Helpline</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MicOff className="h-4 w-4" />
                <span className="hidden sm:inline">SMS Updates</span>
                <span className="inline sm:hidden">SMS</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="ivr">
            <IVRJobSearch />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <WhatsappJobAlerts />
          </TabsContent>
          
          <TabsContent value="helpline">
            <HumanHelpline />
          </TabsContent>
          
          <TabsContent value="sms">
            <SMSUpdates />
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted/20 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">Missed Call Job Alerts</CardTitle>
                  <Badge>June 2025</Badge>
                </div>
                <CardDescription>Give a missed call to receive job matches</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">Field Agent Network</CardTitle>
                  <Badge>July 2025</Badge>
                </div>
                <CardDescription>Local agents to help with job applications</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">Voice Resume Builder</CardTitle>
                  <Badge>August 2025</Badge>
                </div>
                <CardDescription>Create audio profiles for employers</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NonSmartphoneAccess;
