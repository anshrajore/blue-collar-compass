
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Clock, BookOpen, Languages, Award, Share2, Bookmark, Eye, Users, Phone, Mail, Globe, Building } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface JobRequirements {
  education?: string;
  experience?: string;
  languages?: string[];
  skills?: string[];
}

interface WorkSchedule {
  days?: string[];
  hours?: string;
}

interface ContactInfo {
  name?: string;
  phone?: string;
  email?: string;
}

interface JobPreviewProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    postedDate: string;
    jobType: string;
    category: string;
    description?: string;
    isUrgent?: boolean;
    isVerified?: boolean;
    isHighlighted?: boolean;
    requirements?: JobRequirements;
    workSchedule?: WorkSchedule;
    contactInfo?: ContactInfo;
    applicantsCount?: number;
    viewCount?: number;
  };
}

const JobPreview: React.FC<JobPreviewProps> = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  // Check if user has already applied for this job
  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && job.id !== 'preview') {
          const { data } = await supabase
            .from('applications')
            .select('id')
            .eq('job_id', job.id)
            .eq('applicant_id', session.user.id)
            .single();
            
          if (data) {
            setHasApplied(true);
          }
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };
    
    checkIfApplied();
  }, [job.id]);

  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      'mon': 'Monday',
      'tue': 'Tuesday',
      'wed': 'Wednesday',
      'thu': 'Thursday',
      'fri': 'Friday',
      'sat': 'Saturday',
      'sun': 'Sunday'
    };
    return days[day.toLowerCase()] || day;
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job removed from saved" : "Job saved successfully!",
      description: isSaved ? "Job removed from your saved list" : "You can find this job in your saved jobs",
    });
  };

  const handleShareJob = async () => {
    try {
      await navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job opportunity: ${job.title} at ${job.company} in ${job.location}`,
        url: window.location.href
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Job link copied!",
        description: "Share this job with others",
      });
    }
  };

  const handleApply = async () => {
    if (job.id === 'preview') {
      toast({
        title: "Preview mode",
        description: "This is a preview. Please post the job first to enable applications.",
        variant: "default"
      });
      return;
    }

    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to apply for jobs",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      setIsApplying(true);

      // Check if the user has already applied
      const { data: existingApplication, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', job.id)
        .eq('applicant_id', session.user.id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      if (existingApplication) {
        toast({
          title: "Already applied",
          description: "You have already applied for this job",
          variant: "default"
        });
        setHasApplied(true);
        setIsApplying(false);
        return;
      }
      
      // Create application
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: job.id,
          applicant_id: session.user.id,
          status: 'applied'
        })
        .select();
        
      if (error) throw error;
      
      setHasApplied(true);
      
      toast({
        title: "Application submitted successfully!",
        description: "You'll be notified when the employer responds.",
      });
      
    } catch (error: any) {
      console.error('Error applying for job:', error);
      toast({
        title: "Failed to submit application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className={`overflow-hidden ${job.isHighlighted ? 'ring-2 ring-yellow-400 shadow-lg' : ''}`}>
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {job.isHighlighted && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  ⭐ Featured
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className="font-normal">
                {job.jobType}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {job.category}
              </Badge>
              {job.isUrgent && (
                <Badge variant="destructive">🚨 Urgent</Badge>
              )}
              {job.isVerified && (
                <Badge className="bg-green-500 hover:bg-green-600">✓ Verified</Badge>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="font-bold text-xl text-green-600">₹{job.salary}</div>
            <div className="text-sm text-muted-foreground">Posted {job.postedDate}</div>
            {(job.applicantsCount || job.viewCount) && (
              <div className="text-xs text-muted-foreground mt-1">
                {job.applicantsCount && `${job.applicantsCount} applicants`}
                {job.applicantsCount && job.viewCount && ' • '}
                {job.viewCount && `${job.viewCount} views`}
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div>
              <h3 className="text-lg font-medium mb-3">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {job.description || "No description provided."}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {job.requirements && (
              <div>
                <h3 className="text-lg font-medium mb-4">Requirements</h3>
                <div className="space-y-4">
                  {job.requirements.education && (
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-3 mt-0.5 text-blue-500" />
                      <div>
                        <div className="font-medium">Education</div>
                        <div className="text-muted-foreground">{job.requirements.education}</div>
                      </div>
                    </div>
                  )}

                  {job.requirements.experience && (
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-3 mt-0.5 text-purple-500" />
                      <div>
                        <div className="font-medium">Experience</div>
                        <div className="text-muted-foreground">{job.requirements.experience}</div>
                      </div>
                    </div>
                  )}

                  {job.requirements.languages && job.requirements.languages.length > 0 && (
                    <div className="flex items-start">
                      <Languages className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
                      <div>
                        <div className="font-medium">Languages</div>
                        <div className="text-muted-foreground">
                          {job.requirements.languages.join(", ")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {job.workSchedule && (
              <div>
                <h3 className="text-lg font-medium mb-4">Work Schedule</h3>
                {job.workSchedule.days && job.workSchedule.days.length > 0 && (
                  <div className="flex items-start mb-4">
                    <Calendar className="h-5 w-5 mr-3 mt-0.5 text-blue-500" />
                    <div>
                      <div className="font-medium">Working Days</div>
                      <div className="text-muted-foreground">
                        {job.workSchedule.days.map(getDayName).join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                {job.workSchedule.hours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 text-orange-500" />
                    <div>
                      <div className="font-medium">Working Hours</div>
                      <div className="text-muted-foreground">{job.workSchedule.hours}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {hasApplied ? (
                <Button 
                  size="lg" 
                  disabled
                  className="w-full bg-green-100 text-green-700 hover:bg-green-100"
                >
                  ✓ Application Submitted
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600"
                >
                  {isApplying ? 'Applying...' : 'Apply Now'}
                </Button>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveJob}
                  className="flex-1"
                >
                  <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShareJob}
                  className="flex-1"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Company Details */}
            <Card className="bg-gradient-to-br from-muted/40 to-muted/60">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-500" />
                  Company Details
                </h3>
                
                <div>
                  <div className="font-semibold text-lg">{job.company}</div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-muted-foreground">{job.location}</span>
                </div>
                
                {job.contactInfo && (
                  <>
                    <Separator className="my-3" />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Contact Information</h4>
                      
                      {job.contactInfo.name && (
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                          <span className="font-medium">Contact:</span>
                          <span className="ml-1">{job.contactInfo.name}</span>
                        </div>
                      )}
                      
                      {job.contactInfo.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-green-500" />
                          <span className="font-medium">Phone:</span>
                          <span className="ml-1">{job.contactInfo.phone}</span>
                        </div>
                      )}
                      
                      {job.contactInfo.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">Email:</span>
                          <span className="ml-1 truncate">{job.contactInfo.email}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                  Job Activity
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Posted:</span>
                    <span className="font-medium">{job.postedDate}</span>
                  </div>
                  {job.applicantsCount !== undefined && (
                    <div className="flex justify-between">
                      <span>Applicants:</span>
                      <span className="font-medium">{job.applicantsCount}</span>
                    </div>
                  )}
                  {job.viewCount && (
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span className="font-medium">{job.viewCount}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreview;
