
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Clock, MapPin } from "lucide-react";
import { JobProps } from "./JobCard";

interface JobRecommendationsProps {
  jobs: JobProps[];
  onJobSelect: (jobId: string) => void;
}

const JobRecommendations = ({ jobs, onJobSelect }: JobRecommendationsProps) => {
  // Get featured/highlighted jobs
  const featuredJobs = jobs.filter(job => job.isHighlighted).slice(0, 3);
  
  // Get urgent jobs
  const urgentJobs = jobs.filter(job => job.isUrgent && !job.isHighlighted).slice(0, 3);
  
  // Get recently posted jobs
  const recentJobs = jobs
    .filter(job => job.postedDate.includes('Today') || job.postedDate.includes('Yesterday'))
    .slice(0, 3);

  const RecommendationCard = ({ job, type }: { job: JobProps; type: string }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onJobSelect(job.id)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-medium text-sm hover:text-blue-600 transition-colors">
              {job.title}
            </h4>
            <p className="text-xs text-muted-foreground">{job.company}</p>
          </div>
          {type === 'featured' && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          {type === 'urgent' && <Clock className="h-4 w-4 text-red-500" />}
          {type === 'recent' && <TrendingUp className="h-4 w-4 text-green-500" />}
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-green-600">₹{job.salary}</span>
          <Badge variant="outline" className="text-xs">{job.jobType}</Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (featuredJobs.length === 0 && urgentJobs.length === 0 && recentJobs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Featured Jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {featuredJobs.map((job) => (
              <RecommendationCard key={job.id} job={job} type="featured" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Urgent Jobs */}
      {urgentJobs.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              Urgent Hiring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentJobs.map((job) => (
              <RecommendationCard key={job.id} job={job} type="urgent" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Jobs */}
      {recentJobs.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Just Posted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentJobs.map((job) => (
              <RecommendationCard key={job.id} job={job} type="recent" />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobRecommendations;
