
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
  isVerified = true
}: JobProps) => {
  return (
    <Card className={cn(
      "overflow-hidden border transition-all card-hover", 
      isUrgent ? "border-nayidisha-orange/40 bg-nayidisha-orange/5" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {title}
          </CardTitle>
          {isUrgent && (
            <Badge variant="outline" className="bg-nayidisha-orange/10 text-nayidisha-orange border-nayidisha-orange">
              Urgent
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1">
          {company}
          {isVerified && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nayidisha-blue"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary" className="font-normal">
            {jobType}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin size={16} className="mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-1" />
            <span>Posted {postedDate}</span>
          </div>
          <span className="font-medium text-nayidisha-blue">₹{salary}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full btn-primary">
          <Link to={`/jobs/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
