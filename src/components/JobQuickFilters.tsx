
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, IndianRupee, Filter } from "lucide-react";

interface QuickFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const JobQuickFilters = ({ onFilterChange, activeFilters }: QuickFiltersProps) => {
  const popularCategories = [
    'Warehouse & Logistics',
    'Delivery & Transportation', 
    'Manufacturing',
    'Security',
    'Food Service',
    'Construction'
  ];

  const popularLocations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract'];

  const salaryRanges = [
    { label: 'Under ₹15k', min: 0, max: 15000 },
    { label: '₹15k - ₹25k', min: 15000, max: 25000 },
    { label: '₹25k - ₹35k', min: 25000, max: 35000 },
    { label: 'Above ₹35k', min: 35000, max: 999999 }
  ];

  const handleCategoryFilter = (category: string) => {
    const currentCategories = activeFilters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c: string) => c !== category)
      : [...currentCategories, category];
    
    onFilterChange({ categories: newCategories });
  };

  const handleLocationFilter = (location: string) => {
    onFilterChange({ location: location === activeFilters.location ? '' : location });
  };

  const handleJobTypeFilter = (jobType: string) => {
    const currentJobTypes = activeFilters.jobTypes || [];
    const newJobTypes = currentJobTypes.includes(jobType)
      ? currentJobTypes.filter((jt: string) => jt !== jobType)
      : [...currentJobTypes, jobType];
    
    onFilterChange({ jobTypes: newJobTypes });
  };

  const handleSalaryFilter = (range: { min: number; max: number }) => {
    onFilterChange({ salaryRange: [range.min, range.max] });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Quick Filters</h3>
      </div>
      
      {/* Categories */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilters.categories?.includes(category) ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Popular Locations</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.map((location) => (
            <Button
              key={location}
              variant={activeFilters.location === location ? "default" : "outline"}
              size="sm"
              onClick={() => handleLocationFilter(location)}
              className="text-xs"
            >
              {location}
            </Button>
          ))}
        </div>
      </div>

      {/* Job Types */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Job Type</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((jobType) => (
            <Button
              key={jobType}
              variant={activeFilters.jobTypes?.includes(jobType) ? "default" : "outline"}
              size="sm"
              onClick={() => handleJobTypeFilter(jobType)}
              className="text-xs"
            >
              {jobType}
            </Button>
          ))}
        </div>
      </div>

      {/* Salary Ranges */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Salary Range</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {salaryRanges.map((range) => (
            <Button
              key={range.label}
              variant={
                activeFilters.salaryRange && 
                activeFilters.salaryRange[0] === range.min && 
                activeFilters.salaryRange[1] === range.max 
                  ? "default" : "outline"
              }
              size="sm"
              onClick={() => handleSalaryFilter(range)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilters.categories?.length > 0 || activeFilters.location || activeFilters.jobTypes?.length > 0 || activeFilters.salaryRange) && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilterChange({})}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.categories?.map((category: string) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {activeFilters.location && (
              <Badge variant="secondary" className="text-xs">
                {activeFilters.location}
              </Badge>
            )}
            {activeFilters.jobTypes?.map((jobType: string) => (
              <Badge key={jobType} variant="secondary" className="text-xs">
                {jobType}
              </Badge>
            ))}
            {activeFilters.salaryRange && (
              <Badge variant="secondary" className="text-xs">
                ₹{activeFilters.salaryRange[0].toLocaleString()} - ₹{activeFilters.salaryRange[1].toLocaleString()}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobQuickFilters;
