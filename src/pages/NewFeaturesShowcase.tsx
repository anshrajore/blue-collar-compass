
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResumeBuilder from '@/components/profile/ResumeBuilder';
import VoiceProfile from '@/components/profile/VoiceProfile';
import JobJourneyTracker from '@/components/JobJourneyTracker';
import OfflineAccessMode from '@/components/OfflineAccessMode';
import InputVisibilityFix from '@/components/InputVisibilityFix';

const NewFeaturesShowcase = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Features Showcase</h1>
          <p className="mt-2 text-muted-foreground">
            Explore the latest features added to NayiDisha platform
          </p>
        </div>
        
        <Tabs defaultValue="jobseeker" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="jobseeker">Job Seeker Features</TabsTrigger>
            <TabsTrigger value="employer">Employer Features</TabsTrigger>
            <TabsTrigger value="platform">Platform Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobseeker" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Job Seeker Features</CardTitle>
                <CardDescription>
                  New tools to help job seekers find and apply for opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-8 flex flex-col" onClick={() => document.getElementById('resume-builder')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                      <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12L19 10V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-lg font-medium">Smart Resume Builder</span>
                    <span className="text-sm text-muted-foreground mt-1">Auto-generate professional resumes</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-8 flex flex-col" onClick={() => document.getElementById('voice-profile')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                      <path d="M12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 19H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 8V8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 8V8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 10.5C12.8284 10.5 13.5 9.82843 13.5 9C13.5 8.17157 12.8284 7.5 12 7.5C11.1716 7.5 10.5 8.17157 10.5 9C10.5 9.82843 11.1716 10.5 12 10.5Z" fill="currentColor"/>
                    </svg>
                    <span className="text-lg font-medium">Voice Profile</span>
                    <span className="text-sm text-muted-foreground mt-1">Record an introduction for employers</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-8 flex flex-col" onClick={() => document.getElementById('journey-tracker')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-lg font-medium">Job Journey Tracker</span>
                    <span className="text-sm text-muted-foreground mt-1">Track application progress with timeline</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-8 flex flex-col" onClick={() => document.getElementById('offline-access')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                      <path d="M14.5 17.5L16.5 19.5L21.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 21.5H5C3.89543 21.5 3 20.6046 3 19.5V5.5C3 4.39543 3.89543 3.5 5 3.5H19C20.1046 3.5 21 4.39543 21 5.5V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 9.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-lg font-medium">Offline Access</span>
                    <span className="text-sm text-muted-foreground mt-1">Save jobs for offline viewing</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div id="resume-builder" className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Smart Resume Builder</h2>
              <ResumeBuilder />
            </div>
            
            <div id="voice-profile" className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Voice Profile</h2>
              <VoiceProfile />
            </div>
            
            <div id="journey-tracker" className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Job Journey Tracker</h2>
              <JobJourneyTracker />
            </div>
            
            <div id="offline-access" className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Offline Access Mode</h2>
              <OfflineAccessMode />
            </div>
          </TabsContent>
          
          <TabsContent value="employer" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Employer Features</CardTitle>
                <CardDescription>
                  Enhanced tools for employers posting jobs and managing applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center">
                  <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-muted-foreground">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're currently implementing advanced features for employers, including
                    automated candidate shortlisting, video job descriptions, and smart interview feedback forms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="platform" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Platform Enhancements</CardTitle>
                <CardDescription>
                  UI improvements and accessibility features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="h-auto py-8 flex flex-col" onClick={() => document.getElementById('input-visibility')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M4 9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-lg font-medium">Input Field Visibility Fix</span>
                    <span className="text-sm text-muted-foreground mt-1">Improved input field contrast and styling</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div id="input-visibility" className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Input Field Visibility Fix</h2>
              <InputVisibilityFix />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NewFeaturesShowcase;
