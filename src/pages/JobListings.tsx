
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
import { Filter, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

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
    } else if (allJobs.length > 0) {
      setFilteredJobs(allJobs);
    }
  }, [location, allJobs]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
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
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedJobs: JobProps[] = data.map(job => ({
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
        setAllJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error loading jobs",
        description: "Could not load jobs. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
    
    setFilteredJobs(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredJobs];
    
    switch (value) {
      case 'recent':
        sorted = [...allJobs].sort((a, b) => {
          const dateA = a.postedDate.includes('day') ? 
            parseInt(a.postedDate) : 
            a.postedDate.includes('week') ? 
              parseInt(a.postedDate) * 7 : 
              parseInt(a.postedDate) * 30;
          
          const dateB = b.postedDate.includes('day') ? 
            parseInt(b.postedDate) : 
            b.postedDate.includes('week') ? 
              parseInt(b.postedDate) * 7 : 
              parseInt(b.postedDate) * 30;
          
          return dateA - dateB;
        });
        break;
      case 'salary-high':
        sorted = [...filteredJobs].sort((a, b) => {
          const salaryA = parseInt(a.salary.split(' - ')[1]);
          const salaryB = parseInt(b.salary.split(' - ')[1]);
          return salaryB - salaryA;
        });
        break;
      case 'salary-low':
        sorted = [...filteredJobs].sort((a, b) => {
          const salaryA = parseInt(a.salary.split(' - ')[0]);
          const salaryB = parseInt(b.salary.split(' - ')[0]);
          return salaryA - salaryB;
        });
        break;
    }
    
    setFilteredJobs(sorted);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
    // In a real app, this would filter the jobs based on the selected filters
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
