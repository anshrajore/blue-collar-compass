
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, AlertTriangle, CheckCircle, Check } from "lucide-react";

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

  const handleApply = async () => {
    setIsApplying(true);
    
    try {
      if (onApply) {
        await onApply(id);
        setIsApplied(true);
      }
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
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
          
          <div className="space-y-2 mb-4 flex-grow">
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
          
          <div className="flex justify-between items-center pt-2 mt-auto">
            <div className="font-medium">₹{salary}</div>
            
            {isApplied ? (
              <Button 
                size="sm" 
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                disabled
              >
                <Check className="h-4 w-4 mr-1" /> Applied
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-nayidisha-blue hover:bg-nayidisha-blue-600"
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
