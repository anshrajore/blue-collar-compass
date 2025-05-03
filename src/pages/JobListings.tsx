
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import JobCard, { JobProps } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, MapPin } from 'lucide-react';

// Mock data for job listings
const allJobs: JobProps[] = [
  {
    id: '1',
    title: 'Plumber for Residential Project',
    company: 'BrightBuild Construction',
    location: 'Delhi, India',
    salary: '15,000 - 20,000/month',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    category: 'Plumbing',
    isUrgent: true,
    isVerified: true
  },
  {
    id: '2',
    title: 'Experienced Electrician',
    company: 'PowerTech Solutions',
    location: 'Mumbai, Maharashtra',
    salary: '18,000 - 25,000/month',
    postedDate: '1 day ago',
    jobType: 'Full-time',
    category: 'Electrical',
    isVerified: true
  },
  {
    id: '3',
    title: 'Carpenter for Furniture Workshop',
    company: 'WoodCraft Interiors',
    location: 'Bengaluru, Karnataka',
    salary: '16,000 - 22,000/month',
    postedDate: '3 days ago',
    jobType: 'Full-time',
    category: 'Carpentry',
    isVerified: true
  },
  {
    id: '4',
    title: 'Driver for Delivery Services',
    company: 'SpeedEx Logistics',
    location: 'Hyderabad, Telangana',
    salary: '14,000 - 18,000/month',
    postedDate: '5 days ago',
    jobType: 'Full-time',
    category: 'Driving',
    isUrgent: true,
    isVerified: true
  },
  {
    id: '5',
    title: 'Security Guard for Corporate Office',
    company: 'SecureForce Services',
    location: 'Pune, Maharashtra',
    salary: '12,000 - 15,000/month',
    postedDate: '4 days ago',
    jobType: 'Full-time',
    category: 'Security',
    isVerified: true
  },
  {
    id: '6',
    title: 'Tailor for Fashion Studio',
    company: 'TrendyThreads Fashion',
    location: 'Jaipur, Rajasthan',
    salary: '14,000 - 18,000/month',
    postedDate: '3 days ago',
    jobType: 'Full-time',
    category: 'Tailoring',
    isVerified: true
  },
  {
    id: '7',
    title: 'Part-time House Cleaner',
    company: 'CleanHome Services',
    location: 'Delhi, India',
    salary: '8,000 - 10,000/month',
    postedDate: '1 day ago',
    jobType: 'Part-time',
    category: 'Housekeeping',
    isUrgent: true,
    isVerified: true
  },
  {
    id: '8',
    title: 'Cook for Restaurant',
    company: 'Spice Junction',
    location: 'Kolkata, West Bengal',
    salary: '15,000 - 20,000/month',
    postedDate: '6 days ago',
    jobType: 'Full-time',
    category: 'Cooking',
    isVerified: true
  },
];

const JobListings = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobProps[]>(allJobs);
  const [sortBy, setSortBy] = useState('recent');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Extract query parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      const filtered = allJobs.filter(job => 
        job.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [location]);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    
    let filtered = [...allJobs];
    
    if (query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredJobs];
    
    switch (value) {
      case 'recent':
        // This is just a mock sorting - in a real app, we'd use actual timestamps
        sorted = sorted.sort((a, b) => 
          parseInt(a.postedDate) - parseInt(b.postedDate)
        );
        break;
      case 'salary-high':
        // In a real app, we'd parse the salary values properly
        sorted = sorted.sort((a, b) => 
          parseInt(b.salary) - parseInt(a.salary)
        );
        break;
      case 'salary-low':
        sorted = sorted.sort((a, b) => 
          parseInt(a.salary) - parseInt(b.salary)
        );
        break;
    }
    
    setFilteredJobs(sorted);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
    // In a real app, this would filter the jobs based on the selected filters
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
          <SearchBar onSearch={handleSearch} className="max-w-4xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {!isMobile && (
            <div className="md:w-1/4 lg:w-1/5">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
              <div className="flex items-center">
                <h2 className="font-semibold text-lg">
                  {filteredJobs.length} Jobs Found
                </h2>
                {searchQuery && (
                  <span className="ml-2 text-muted-foreground">
                    for "{searchQuery}"
                  </span>
                )}
                {searchLocation && (
                  <span className="flex items-center text-muted-foreground ml-1">
                    <MapPin className="h-4 w-4 mr-1" /> {searchLocation}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" /> Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 max-w-sm">
                      <FilterSidebar onFilterChange={handleFilterChange} isMobile={true} />
                    </DialogContent>
                  </Dialog>
                )}
                
                <div className="flex items-center">
                  <span className="mr-2 text-sm whitespace-nowrap">Sort by:</span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Most Recent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                      <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find more jobs</p>
                <Button onClick={() => handleSearch('', '')}>
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More Jobs</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobListings;
