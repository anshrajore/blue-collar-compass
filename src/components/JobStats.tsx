
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, MapPin, Briefcase, Clock, IndianRupee } from "lucide-react";
import { JobProps } from "./JobCard";

interface JobStatsProps {
  jobs: JobProps[];
  filteredJobs: JobProps[];
}

const JobStats = ({ jobs, filteredJobs }: JobStatsProps) => {
  // Calculate stats
  const totalJobs = jobs.length;
  const filteredCount = filteredJobs.length;
  const newJobsToday = jobs.filter(job => job.postedDate.includes('Today')).length;
  const urgentJobs = jobs.filter(job => job.isUrgent).length;
  const verifiedJobs = jobs.filter(job => job.isVerified).length;

  // Calculate top categories
  const categoryStats = jobs.reduce((acc, job) => {
    acc[job.category] = (acc[job.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Calculate top locations
  const locationStats = jobs.reduce((acc, job) => {
    const city = job.location.split(',')[0];
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(locationStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Calculate salary ranges
  const salaryRanges = {
    'Under ₹20k': 0,
    '₹20k - ₹30k': 0,
    'Above ₹30k': 0
  };

  jobs.forEach(job => {
    const minSalary = parseInt(job.salary.split(' - ')[0].replace(/[₹,]/g, ''));
    if (minSalary < 20000) salaryRanges['Under ₹20k']++;
    else if (minSalary <= 30000) salaryRanges['₹20k - ₹30k']++;
    else salaryRanges['Above ₹30k']++;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Jobs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
              <p className="text-2xl font-bold text-blue-600">{totalJobs}</p>
              <p className="text-xs text-green-600">
                {filteredCount} showing
              </p>
            </div>
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* New Today */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Today</p>
              <p className="text-2xl font-bold text-green-600">{newJobsToday}</p>
              <p className="text-xs text-muted-foreground">
                Fresh opportunities
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Urgent Jobs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Urgent Hiring</p>
              <p className="text-2xl font-bold text-red-600">{urgentJobs}</p>
              <p className="text-xs text-muted-foreground">
                Quick hiring
              </p>
            </div>
            <Clock className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      {/* Verified Companies */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-bold text-purple-600">{verifiedJobs}</p>
              <p className="text-xs text-muted-foreground">
                Trusted employers
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Top Categories</h3>
          </div>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <Badge variant="outline">{count} jobs</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Locations */}
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Top Locations</h3>
          </div>
          <div className="space-y-2">
            {topLocations.map(([location, count]) => (
              <div key={location} className="flex items-center justify-between">
                <span className="text-sm">{location}</span>
                <Badge variant="outline">{count} jobs</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Distribution */}
      <Card className="lg:col-span-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <IndianRupee className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Salary Distribution</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(salaryRanges).map(([range, count]) => (
              <div key={range} className="text-center">
                <p className="text-lg font-bold text-orange-600">{count}</p>
                <p className="text-sm text-muted-foreground">{range}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobStats;
