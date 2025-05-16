
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, AlertTriangle, CheckCircle, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

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
  onApply
}: JobProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Check if user has already applied for this job
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
    setIsApplying(true);
    
    try {
      if (onApply) {
        await onApply(id);
        setIsApplied(true);
        toast.success("Application submitted successfully!", {
          description: "You'll be notified when the employer responds.",
        });
      }
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again later.",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <h3 className="text-base sm:text-lg font-medium mb-1 hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3">{company}</p>
          
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
              <span>Posted {postedDate}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 mt-auto flex-wrap gap-2">
            <div className="font-medium text-sm sm:text-base">₹{salary}</div>
            
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
                className="bg-nayidisha-blue hover:bg-nayidisha-blue-600 text-xs sm:text-sm"
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
