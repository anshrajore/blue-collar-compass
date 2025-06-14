import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, AlertTriangle, CheckCircle, Check, Bookmark, Share2, Eye, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { sendApplicationNotification } from "@/utils/jobPosting";

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  jobType: string;
  category: string;
  isUrgent?: boolean;
  isVerified?: boolean;
  isHighlighted?: boolean;
  applicantsCount?: number;
  employer_id?: string;
  onApply?: (id: string) => void;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  postedDate,
  jobType,
  category,
  isUrgent = false,
  isVerified = false,
  isHighlighted = false,
  applicantsCount = 0,
  employer_id,
  onApply
}: JobProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 500) + 50);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data } = await supabase
            .from('applications')
            .select('id')
            .eq('job_id', id)
            .eq('applicant_id', session.user.id)
            .single();
            
          if (data) {
            setIsApplied(true);
          }
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };
    
    checkIfApplied();
  }, [id]);

  const handleApply = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to apply for jobs",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      setIsApplying(true);

      // Check if user has already applied
      const { data: existingApplication, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', id)
        .eq('applicant_id', user.id)
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
        setIsApplied(true);
        setIsApplying(false);
        return;
      }
      
      // Create application
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: id,
          applicant_id: user.id,
          status: 'applied'
        })
        .select();
        
      if (error) throw error;
      
      setIsApplied(true);
      
      // Send notification to employer with applicant's contact info
      if (employer_id) {
        await sendApplicationNotification(
          employer_id,
          title,
          profile?.full_name || user.email,
          profile?.phone_number || '9096946604'
        );
      }
      
      // Call the onApply callback if provided
      if (onApply) {
        onApply(id);
      }
      
      toast({
        title: "Application submitted successfully!",
        description: "The employer has been notified with your contact details.",
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
        title: `${title} at ${company}`,
        text: `Check out this job opportunity: ${title} at ${company} in ${location}`,
        url: window.location.href
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Job link copied!",
        description: "Share this job with others",
      });
    }
  };

  const getPostedTimeColor = () => {
    if (postedDate.includes('Today') || postedDate.includes('hour')) return 'text-green-600';
    if (postedDate.includes('Yesterday') || postedDate.includes('1 day')) return 'text-blue-600';
    return 'text-muted-foreground';
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 h-full group ${
      isHighlighted ? 'ring-2 ring-yellow-400 shadow-lg' : ''
    }`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-medium mb-1 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
                {title}
              </h3>
              {isHighlighted && (
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-xs text-yellow-700 font-medium">Featured Job</span>
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleSaveJob}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleShareJob}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {isUrgent && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
              </Badge>
            )}
            {isVerified && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center text-xs">
                <CheckCircle className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
            {isHighlighted && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                Featured
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 font-medium">{company}</p>
          
          <div className="space-y-2 mb-4 flex-grow">
            <div className="flex items-center text-xs sm:text-sm flex-wrap">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm flex-wrap">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
              <span className="mr-1">{jobType}</span>
              <span className="mx-1">•</span>
              <span>{category}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
              <span className={getPostedTimeColor()}>Posted {postedDate}</span>
            </div>
            {applicantsCount > 0 && (
              <div className="flex items-center text-xs sm:text-sm">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">{applicantsCount} applicants • {viewCount} views</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2 mt-auto flex-wrap gap-2">
            <div className="font-semibold text-sm sm:text-base text-green-600">₹{salary}</div>
            
            {isApplied ? (
              <Button 
                size="sm" 
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-xs sm:text-sm"
                disabled
              >
                <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Applied
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-nayidisha-blue hover:bg-nayidisha-blue-600 text-xs sm:text-sm transition-all duration-200 hover:scale-105"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
