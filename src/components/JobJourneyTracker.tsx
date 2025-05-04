
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Calendar, 
  User, 
  Paperclip, 
  Building, 
  CheckCheck,
  ExternalLink
} from 'lucide-react';

type Step = {
  id: string;
  title: string;
  date: string | null;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
  icon: React.ReactNode;
};

type JobJourney = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: string;
  steps: Step[];
};

interface JobJourneyTrackerProps {
  journeys?: JobJourney[];
}

const defaultJourneys: JobJourney[] = [
  {
    id: "1",
    jobTitle: "Senior Electrician",
    company: "ABC Electrical Services",
    location: "Delhi",
    appliedDate: "2023-12-05",
    status: "interview",
    steps: [
      {
        id: "1-1",
        title: "Application Submitted",
        date: "Dec 5, 2023",
        status: "completed",
        description: "Your application was received by the employer.",
        icon: <FileText className="h-5 w-5" />
      },
      {
        id: "1-2",
        title: "Application Reviewed",
        date: "Dec 7, 2023",
        status: "completed",
        description: "Your application was reviewed and shortlisted.",
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        id: "1-3",
        title: "Interview Scheduled",
        date: "Dec 12, 2023",
        status: "current",
        description: "Phone interview scheduled for 2:00 PM.",
        icon: <Calendar className="h-5 w-5" />
      },
      {
        id: "1-4",
        title: "Interview",
        date: null,
        status: "upcoming",
        icon: <User className="h-5 w-5" />
      },
      {
        id: "1-5",
        title: "Decision",
        date: null,
        status: "upcoming",
        icon: <CheckCheck className="h-5 w-5" />
      }
    ]
  },
  {
    id: "2",
    jobTitle: "Maintenance Electrician",
    company: "XYZ Manufacturing Ltd.",
    location: "Gurgaon",
    appliedDate: "2023-11-28",
    status: "rejected",
    steps: [
      {
        id: "2-1",
        title: "Application Submitted",
        date: "Nov 28, 2023",
        status: "completed",
        description: "Your application was received by the employer.",
        icon: <FileText className="h-5 w-5" />
      },
      {
        id: "2-2",
        title: "Application Reviewed",
        date: "Dec 2, 2023",
        status: "completed",
        description: "Your application was reviewed but not selected for the next stage.",
        icon: <CheckCircle className="h-5 w-5" />
      }
    ]
  },
  {
    id: "3",
    jobTitle: "Electrical Supervisor",
    company: "Metro Construction Corp.",
    location: "Noida",
    appliedDate: "2023-12-01",
    status: "applied",
    steps: [
      {
        id: "3-1",
        title: "Application Submitted",
        date: "Dec 1, 2023",
        status: "completed",
        description: "Your application was received by the employer.",
        icon: <FileText className="h-5 w-5" />
      },
      {
        id: "3-2",
        title: "Application Review",
        date: null,
        status: "current",
        description: "Your application is being reviewed by the employer.",
        icon: <Clock className="h-5 w-5" />
      }
    ]
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  let color = '';
  let label = '';
  
  switch(status) {
    case 'applied':
      color = 'bg-blue-100 text-blue-800 border-blue-200';
      label = 'Applied';
      break;
    case 'interview':
      color = 'bg-amber-100 text-amber-800 border-amber-200';
      label = 'Interview';
      break;
    case 'offered':
      color = 'bg-purple-100 text-purple-800 border-purple-200';
      label = 'Offered';
      break;
    case 'hired':
      color = 'bg-green-100 text-green-800 border-green-200';
      label = 'Hired';
      break;
    case 'rejected':
      color = 'bg-red-100 text-red-800 border-red-200';
      label = 'Not Selected';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 border-gray-200';
      label = status;
  }
  
  return <Badge variant="outline" className={`${color}`}>{label}</Badge>;
};

const JobJourneyTracker: React.FC<JobJourneyTrackerProps> = ({ journeys = defaultJourneys }) => {
  const [activeJourney, setActiveJourney] = useState<string>(journeys[0]?.id || '');
  
  const currentJourney = journeys.find(journey => journey.id === activeJourney) || journeys[0];
  
  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted">
        <CardHeader>
          <CardTitle>Job Journey Tracker</CardTitle>
          <CardDescription>Track the status of your job applications</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - job list */}
            <div className="md:w-1/3 space-y-3">
              {journeys.map((journey) => (
                <div
                  key={journey.id}
                  className={`p-3 rounded-md cursor-pointer border transition-all ${
                    journey.id === activeJourney 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted bg-muted/30 hover:border-primary/50'
                  }`}
                  onClick={() => setActiveJourney(journey.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium truncate">{journey.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground">{journey.company}</p>
                    </div>
                    <StatusBadge status={journey.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{journey.location}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">Applied {journey.appliedDate}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right content - journey timeline */}
            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-muted pt-4 md:pt-0 md:pl-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium">{currentJourney.jobTitle}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{currentJourney.company}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{currentJourney.location}</span>
                </div>
              </div>
              
              <div className="relative">
                {/* Timeline stem */}
                <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-muted"></div>
                
                {/* Timeline steps */}
                <div className="space-y-8 relative">
                  {currentJourney.steps.map((step, index) => (
                    <div key={step.id} className="pl-10 relative">
                      {/* Timeline node */}
                      <div 
                        className={`absolute left-0 w-[30px] h-[30px] rounded-full flex items-center justify-center z-10 ${
                          step.status === 'completed' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : step.status === 'current'
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.icon}
                      </div>
                      
                      {/* Step content */}
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">
                            {step.title}
                          </h4>
                          {step.date && (
                            <span className="text-sm text-muted-foreground">{step.date}</span>
                          )}
                        </div>
                        {step.description && (
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        )}
                        
                        {/* Action required indicators */}
                        {step.status === 'current' && step.id === '1-3' && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-sm">
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-amber-600 mt-0.5" />
                              <div>
                                <p className="font-medium text-amber-800">Action required</p>
                                <p className="text-amber-700 text-xs mt-1">
                                  Your interview is scheduled for December 12, 2023 at 2:00 PM.
                                  <a href="#" className="ml-2 text-blue-600 hover:underline flex items-center inline-block">
                                    View details
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Document section - only for interview stage */}
              {currentJourney.status === 'interview' && (
                <div className="mt-8 pt-6 border-t border-muted">
                  <h4 className="font-medium mb-3">Required Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Resume</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">ID Proof</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Experience Certificate</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        Required
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobJourneyTracker;
