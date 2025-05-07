
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Calendar, AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Job title is required' }),
  job_type: z.string().min(1, { message: 'Job type is required' }),
  work_shift: z.string().min(1, { message: 'Work shift is required' }),
  number_of_positions: z.coerce.number().int().positive(),
  category: z.string().min(1, { message: 'Category is required' }),
  location_city: z.string().min(1, { message: 'City is required' }),
  location_state: z.string().min(1, { message: 'State is required' }),
  location_pincode: z.string().min(6, { message: 'Valid pincode is required' }).max(6),
  location_address: z.string().optional(),
  salary_min: z.coerce.number().int().positive(),
  salary_max: z.coerce.number().int().positive(),
  salary_period: z.string().min(1, { message: 'Salary period is required' }),
  has_overtime_pay: z.boolean().optional(),
  incentives: z.string().optional(),
  min_education: z.string().optional(),
  min_experience_months: z.coerce.number().int().min(0),
  languages_required: z.string().optional(),
  certifications_required: z.string().optional(),
  age_min: z.coerce.number().int().positive().optional(),
  age_max: z.coerce.number().int().positive().optional(),
  physical_requirements: z.string().optional(),
  provides_accommodation: z.boolean().optional(),
  provides_food: z.boolean().optional(),
  provides_transportation: z.boolean().optional(),
  provides_insurance: z.boolean().optional(),
  provides_pf_esi: z.boolean().optional(),
  description: z.string().min(20, { message: 'Please provide a detailed job description' }),
  is_urgent: z.boolean().optional(),
});

const jobCategories = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Masonry',
  'Driving',
  'Housekeeping',
  'Security',
  'Cooking',
  'Tailoring',
  'Factory Work',
  'Construction',
  'Painting',
  'Gardening',
  'Delivery',
  'Warehouse',
  'Retail',
  'Hospitality',
  'Farming',
  'Other'
];

const indiaStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

// Add city-state relationship for districts
const stateDistricts: { [key: string]: string[] } = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli', 'Satara'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Bharuch'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Shimoga', 'Tumkur', 'Bijapur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'North West Delhi', 'South West Delhi'],
  // Add more states and districts as needed
};

const PostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<null | any>(null);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      job_type: 'Full-time',
      work_shift: 'Day',
      number_of_positions: 1,
      category: '',
      location_city: '',
      location_state: '',
      location_pincode: '',
      location_address: '',
      salary_min: 0,
      salary_max: 0,
      salary_period: 'month',
      has_overtime_pay: false,
      incentives: '',
      min_education: 'None',
      min_experience_months: 0,
      languages_required: '',
      certifications_required: '',
      physical_requirements: '',
      provides_accommodation: false,
      provides_food: false,
      provides_transportation: false,
      provides_insurance: false,
      provides_pf_esi: false,
      description: '',
      is_urgent: false,
    },
  });

  // Watch the selected state to update districts
  const selectedState = form.watch('location_state');

  useEffect(() => {
    if (selectedState && stateDistricts[selectedState]) {
      setAvailableDistricts(stateDistricts[selectedState]);
      
      // If current city is not in the new state's districts, reset it
      const currentCity = form.getValues('location_city');
      if (currentCity && !stateDistricts[selectedState].includes(currentCity)) {
        form.setValue('location_city', '');
      }
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedState, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a job",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    try {
      // Format languages and certifications as arrays
      const languagesArray = data.languages_required 
        ? data.languages_required.split(',').map(lang => lang.trim())
        : [];
      
      const certificationsArray = data.certifications_required
        ? data.certifications_required.split(',').map(cert => cert.trim())
        : [];

      // Prepare job post data
      const jobData = {
        employer_id: user.id,
        title: data.title,
        description: data.description,
        job_type: data.job_type,
        category: data.category,
        location_city: data.location_city,
        location_state: data.location_state,
        location_pincode: data.location_pincode,
        location_address: data.location_address,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        salary_period: data.salary_period,
        incentives: data.incentives,
        min_education: data.min_education,
        min_experience_months: data.min_experience_months,
        languages_required: languagesArray,
        certifications_required: certificationsArray,
        physical_requirements: data.physical_requirements,
        is_urgent: data.is_urgent,
        status: 'active'
      };

      // Insert job post into database
      const { data: newJob, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted and is now live."
      });

      // Navigate directly to job listing page
      navigate('/jobs');
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Error Posting Job",
        description: error.message || "An error occurred while posting your job",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewData(form.getValues());
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-6 text-center">
                You need to be signed in to post a job. Please sign in or create an account.
              </p>
              <Button onClick={() => navigate('/auth')}>
                Sign In / Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a Blue Collar Job</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to create your job listing and find qualified workers
          </p>
        </div>

        {previewData ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Job Preview</h2>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => setPreviewData(null)}>
                  Edit Job
                </Button>
                <Button onClick={() => form.handleSubmit(onSubmit)()}>
                  Post Job
                </Button>
              </div>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold">{previewData.title}</h3>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{previewData.job_type} • {previewData.category}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {previewData.location_city}, {previewData.location_state}, {previewData.location_pincode}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Posted today</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-lg mb-2">Salary</h4>
                    <p className="text-lg font-medium">
                      ₹{previewData.salary_min.toLocaleString()} - ₹{previewData.salary_max.toLocaleString()} per {previewData.salary_period}
                    </p>
                    {previewData.has_overtime_pay && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Overtime pay available
                      </p>
                    )}
                    {previewData.incentives && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Additional incentives: {previewData.incentives}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-lg mb-2">Job Description</h4>
                    <p className="whitespace-pre-wrap">{previewData.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-lg mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {previewData.min_education && (
                        <li>Education: {previewData.min_education}</li>
                      )}
                      {previewData.min_experience_months > 0 && (
                        <li>
                          Experience: {
                            previewData.min_experience_months >= 12 
                              ? `${Math.floor(previewData.min_experience_months / 12)} year(s)` 
                              : `${previewData.min_experience_months} month(s)`
                          }
                        </li>
                      )}
                      {previewData.languages_required && (
                        <li>Languages: {previewData.languages_required}</li>
                      )}
                      {previewData.certifications_required && (
                        <li>Certifications: {previewData.certifications_required}</li>
                      )}
                      {previewData.physical_requirements && (
                        <li>Physical Requirements: {previewData.physical_requirements}</li>
                      )}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-lg mb-2">Benefits</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {previewData.provides_accommodation && (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span>Accommodation</span>
                        </div>
                      )}
                      {previewData.provides_food && (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span>Food</span>
                        </div>
                      )}
                      {previewData.provides_transportation && (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span>Transportation</span>
                        </div>
                      )}
                      {previewData.provides_insurance && (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span>Insurance</span>
                        </div>
                      )}
                      {previewData.provides_pf_esi && (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span>PF/ESI</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Job Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Basic Job Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Plumber, Electrician, Warehouse Loader" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobCategories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="job_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Daily Wages">Daily Wages</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="work_shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Shift *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select work shift" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Day">Day</SelectItem>
                            <SelectItem value="Night">Night</SelectItem>
                            <SelectItem value="Rotational">Rotational</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="number_of_positions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Positions *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Job Location */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Job Location</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location_state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indiaStates.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location_city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/District *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedState}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={selectedState ? "Select city" : "First select a state"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableDistricts.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location_pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="6-digit pincode" {...field} maxLength={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Specific address or area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Compensation */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Compensation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="salary_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Salary *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary_max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Salary *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary_period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Period *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hour">Per Hour</SelectItem>
                            <SelectItem value="day">Per Day</SelectItem>
                            <SelectItem value="week">Per Week</SelectItem>
                            <SelectItem value="month">Per Month</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_overtime_pay"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Overtime Pay Available
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="incentives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bonuses or Perks (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g. Meals, Accommodation, Travel Allowance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Requirements */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Job Requirements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="min_education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">No formal education</SelectItem>
                            <SelectItem value="Primary">Primary School</SelectItem>
                            <SelectItem value="Secondary">Secondary School</SelectItem>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="ITI">ITI</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="min_experience_months"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Required (in months)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="languages_required"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages Required (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Hindi, English, Marathi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications_required"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License/Certification (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Driving License, Electrician License" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="physical_requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Physical abilities required for the job" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Facilities & Benefits */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Facilities & Benefits</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="provides_accommodation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Accommodation Provided
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="provides_food"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Food Provided
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="provides_transportation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Transportation Provided
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="provides_insurance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Insurance Provided
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="provides_pf_esi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Provident Fund (PF) / ESI Provided
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_urgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-amber-200 bg-amber-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Mark as Urgent Hiring
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Job Description</h2>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about job duties, expectations, working conditions"
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" onClick={handlePreview}>
                  Preview
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Posting...' : 'Post Job'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </Layout>
  );
};

export default PostJob;
