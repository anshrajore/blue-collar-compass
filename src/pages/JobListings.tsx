
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { Filter, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { sampleJobs } from '@/components/SampleJobs';

const JobListings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobProps[]>([]);
  const [allJobs, setAllJobs] = useState<JobProps[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Extract query parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && allJobs.length > 0) {
      const filtered = allJobs.filter(job => 
        job.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredJobs(filtered);
      setActiveFilters({ ...activeFilters, categories: [category] });
    } else if (allJobs.length > 0) {
      setFilteredJobs(allJobs);
    }
  }, [location, allJobs]);

  const fetchJobs = async (loadMore = false) => {
    setIsLoading(!loadMore);
    if (loadMore) {
      setLoadingMore(true);
    }
    
    try {
      // First try to get real jobs from Supabase
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          job_type,
          category,
          location_city,
          location_state,
          salary_min,
          salary_max,
          salary_period,
          created_at,
          is_urgent,
          is_verified,
          employer_profiles(company_name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .range(loadMore ? page * 10 : 0, (loadMore ? page + 1 : 1) * 10 - 1);

      let jobsData = [];
      
      if (!error && data && data.length > 0) {
        // Use real jobs from database
        jobsData = data.map(job => ({
          id: job.id,
          title: job.title,
          company: job.employer_profiles?.company_name || 'Unknown Company',
          location: `${job.location_city}, ${job.location_state}`,
          salary: `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}/${job.salary_period || 'month'}`,
          postedDate: formatPostedDate(new Date(job.created_at)),
          jobType: job.job_type,
          category: job.category,
          isUrgent: job.is_urgent,
          isVerified: job.is_verified
        }));
      } else {
        // Fallback to sample jobs
        jobsData = sampleJobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          postedDate: job.postedDate,
          jobType: job.jobType,
          category: job.category,
          isUrgent: job.isUrgent,
          isVerified: job.isVerified
        }));
      }
      
      if (loadMore) {
        // If we're loading more jobs, append them to existing jobs
        setAllJobs(prev => [...prev, ...jobsData]);
        setFilteredJobs(prev => [...prev, ...jobsData]);
        setPage(prev => prev + 1);
        setHasMore(jobsData.length === 10);
      } else {
        // First load
        setAllJobs(jobsData);
        setFilteredJobs(jobsData);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error loading jobs",
        description: "Could not load jobs. Using sample data instead.",
        variant: "destructive"
      });
      
      // Fallback to sample jobs if there's an error
      const jobsData = sampleJobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        postedDate: job.postedDate,
        jobType: job.jobType,
        category: job.category,
        isUrgent: job.isUrgent,
        isVerified: job.isVerified
      }));
      
      setAllJobs(jobsData);
      setFilteredJobs(jobsData);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  const formatPostedDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  };

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
    
    applyAllFilters(filtered, { ...activeFilters, searchQuery: query, searchLocation: location });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredJobs];
    
    switch (value) {
      case 'recent':
        sorted = [...allJobs].sort((a, b) => {
          const dateA = parseDatePriority(a.postedDate);
          const dateB = parseDatePriority(b.postedDate);
          return dateA - dateB;
        });
        break;
      case 'salary-high':
        sorted = [...filteredJobs].sort((a, b) => {
          const salaryA = parseSalary(a.salary, 1);
          const salaryB = parseSalary(b.salary, 1);
          return salaryB - salaryA;
        });
        break;
      case 'salary-low':
        sorted = [...filteredJobs].sort((a, b) => {
          const salaryA = parseSalary(a.salary, 0);
          const salaryB = parseSalary(b.salary, 0);
          return salaryA - salaryB;
        });
        break;
    }
    
    setFilteredJobs(sorted);
  };

  // Helper function to parse dates for sorting
  const parseDatePriority = (dateString: string) => {
    if (dateString === 'Today') return 0;
    if (dateString === 'Yesterday') return 1;
    
    if (dateString.includes('day')) {
      return parseInt(dateString) || 2;
    }
    
    if (dateString.includes('week')) {
      return (parseInt(dateString) * 7) || 10;
    }
    
    if (dateString.includes('month')) {
      return (parseInt(dateString) * 30) || 40;
    }
    
    return 100; // For any other format, place at the end
  };
  
  // Helper function to parse salary for sorting
  const parseSalary = (salaryString: string, index: number) => {
    try {
      // Extract the numbers from salary ranges like "20,000 - 30,000/month"
      const numbers = salaryString.split(' - ');
      if (numbers.length >= 2) {
        // Get first or second number based on index
        const targetNumber = numbers[index];
        // Remove commas and anything after "/" if it exists
        const cleanNumber = targetNumber.split('/')[0].replace(/,/g, '');
        return parseInt(cleanNumber);
      }
      return 0;
    } catch (error) {
      console.error('Error parsing salary:', error);
      return 0;
    }
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters({ ...activeFilters, ...filters });
    applyAllFilters(allJobs, { ...activeFilters, ...filters });
  };

  const applyAllFilters = (jobs: JobProps[], filters: any) => {
    let filtered = [...jobs];
    
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(job => 
        filters.categories.includes(job.category)
      );
    }
    
    // Job Type filter
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      filtered = filtered.filter(job => 
        filters.jobTypes.includes(job.jobType)
      );
    }
    
    // Salary Range filter
    if (filters.salaryRange && Array.isArray(filters.salaryRange) && filters.salaryRange.length === 2) {
      filtered = filtered.filter(job => {
        const minSalary = parseSalary(job.salary, 0);
        return minSalary >= filters.salaryRange[0] && minSalary <= filters.salaryRange[1];
      });
    }
    
    // State filter
    if (filters.state) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    
    // District filter
    if (filters.district) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.district.toLowerCase())
      );
    }
    
    // Experience filter
    if (filters.experience) {
      // This would need job experience data to be available
      // For now, we'll just log that this filter was applied
      console.log('Experience filter applied:', filters.experience);
    }
    
    // Search query
    if (filters.searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
        job.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    
    // Search location
    if (filters.searchLocation) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.searchLocation.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  };
  
  const handleApplyJob = async (jobId: string) => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to apply for jobs",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }
      
      // For sample jobs, we'll just show a success message
      if (jobId.startsWith('sample')) {
        toast({
          title: "Application submitted",
          description: "Your job application has been submitted successfully! (Sample job)",
        });
        return;
      }
      
      // Check if the user has already applied
      const { data: existingApplication, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('applicant_id', session.user.id)
        .single();
        
      if (existingApplication) {
        toast({
          title: "Already applied",
          description: "You have already applied for this job",
          variant: "default"
        });
        return;
      }
      
      // Create application
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          applicant_id: session.user.id,
          status: 'applied'
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully!",
      });
      
    } catch (error: any) {
      console.error('Error applying for job:', error);
      toast({
        title: "Application failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setSearchLocation('');
    setFilteredJobs(allJobs);
  };

  const loadMoreJobs = () => {
    fetchJobs(true);
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
            
            {isLoading ? (
              <div className="text-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading jobs...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    {...job} 
                    onApply={() => handleApplyJob(job.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find more jobs</p>
                <Button onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredJobs.length > 0 && hasMore && (
              <div className="mt-8 flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={loadMoreJobs}
                  disabled={loadingMore}
                  className="min-w-[200px]"
                >
                  {loadingMore ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                  ) : (
                    'Load More Jobs'
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobListings;
