
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";

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
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium mb-1 hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <div className="flex space-x-2">
              {isUrgent && (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                </Badge>
              )}
              {isVerified && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{company}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{jobType}</span>
              <span className="mx-2">•</span>
              <span>{category}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Posted {postedDate}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="font-medium">₹{salary}</div>
            <Button 
              size="sm" 
              className="bg-nayidisha-blue hover:bg-nayidisha-blue-600"
              onClick={() => onApply && onApply(id)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
