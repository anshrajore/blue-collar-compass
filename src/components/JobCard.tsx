
// Remove duplicate imports if any and improve date handling:
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

import { isValidUUID, sendApplicationNotification } from "@/utils/jobPosting";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export type JobCardProps = {
  job: {
    id: string;
    title: string;
    company_name: string;
    employer_id?: string;
    is_urgent?: boolean;
    location_city: string;
    location_state: string;
    created_at: string;
    // add more fields here as necessary
  };
};

const JobCard = ({ job }: { job: JobCardProps["job"] }) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApply = async () => {
    // Validate job.id as UUID, block if not.
    if (!job.id || typeof job.id !== "string" || !isValidUUID(job.id)) {
      toast({
        title: "Application Error",
        description: "An error occurred. Please try another job or contact support.",
        variant: "destructive",
      });
      return;
    }
    // Only authenticated users can apply
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "You need to sign in to apply for this job.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    try {
      sendApplicationNotification(
        job.employer_id,
        job.title,
        profile?.full_name || "Applicant",
        profile?.phone_number || "9096946604"
      );
      toast({
        title: "Application Sent!",
        description: "The employer has been notified. Good luck!",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Failed to submit application",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // Robust date handling: If date is missing or invalid, do NOT throw
  let timeAgo = "Date unknown";
  if (job.created_at) {
    const parsedDate = new Date(job.created_at);
    if (!isNaN(parsedDate.getTime())) {
      timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
    }
  }

  return (
    <div className="border rounded-lg shadow p-4 mb-4 bg-white flex flex-col gap-3">
      <div className="flex justify-between">
        <Link to={`/jobs/${job.id}`} className="text-lg font-semibold hover:text-blue-500">
          {job.title}
        </Link>
        {job.is_urgent && (
          <Badge variant="destructive" className="uppercase">
            Urgent
          </Badge>
        )}
      </div>
      <div className="text-gray-600 flex items-center gap-1">
        <Briefcase className="w-4 h-4 mr-1" />
        {job.company_name}
      </div>
      <div className="text-gray-500 text-sm flex items-center gap-1">
        <MapPinIcon className="w-4 h-4 mr-1" />
        {job.location_city}, {job.location_state}
      </div>
      <div className="text-gray-500 text-sm flex items-center gap-1">
        <CalendarIcon className="w-4 h-4 mr-1" />
        Posted {timeAgo}
      </div>
      <div>
        <Button onClick={handleApply} className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

