import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Mic, Save, Eye, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const jobCategories = [
  "Construction", "Transportation", "Hospitality", "Manufacturing", 
  "Security", "Cleaning", "Retail", "Agriculture", "Healthcare"
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Daily-wage"];
const educationLevels = ["None", "Primary (5th)", "Middle (8th)", "High School (10th)", "Higher Secondary (12th)", "ITI", "Diploma"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati"];
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const daysOfWeek = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

const PostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    jobType: '',
    category: '',
    pincode: '',
    state: '',
    city: '',
    address: '',
    salaryPeriod: 'monthly',
    salaryMin: 10000,
    salaryMax: 20000,
    incentives: '',
    shiftStart: '',
    shiftEnd: '',
    workDays: [] as string[],
    startDate: 'immediate',
    specificStartDate: '',
    minEducation: '',
    experienceMonths: 0,
    languages: [] as string[],
    physicalRequirements: '',
    certifications: '',
    description: '',
    companyName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    isHighlighted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name as keyof typeof formData] as string[], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: (formData[name as keyof typeof formData] as string[]).filter(item => item !== value)
      });
    }
  };

  const handleSalaryChange = (values: number[]) => {
    setFormData({
      ...formData,
      salaryMin: values[0],
      salaryMax: values[1]
    });
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (!formData.title || !formData.jobType || !formData.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required job details",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 1) {
      if (!formData.state || !formData.city) {
        toast({
          title: "Missing information",
          description: "Please provide at least the state and city",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // First check if the user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to post a job",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }
      
      // Check if user has an employer profile
      const { data: employerProfile, error: profileError } = await supabase
        .from('employer_profiles')
        .select('id')
        .eq('id', session.user.id)
        .single();
        
      if (profileError || !employerProfile) {
        toast({
          title: "Employer profile required",
          description: "Please complete your employer profile first",
          variant: "destructive"
        });
        navigate('/profile');
        return;
      }

      // Convert any Date objects to strings
      const startDate = formData.startDate === 'immediate' 
        ? new Date().toISOString()
        : formData.specificStartDate;

      // Create job listing - fix: pass a single object instead of an array
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          employer_id: session.user.id,
          title: formData.title,
          job_type: formData.jobType,
          category: formData.category,
          description: formData.description,
          location_pincode: formData.pincode,
          location_state: formData.state,
          location_city: formData.city,
          location_address: formData.address,
          salary_min: formData.salaryMin,
          salary_max: formData.salaryMax,
          salary_period: formData.salaryPeriod,
          incentives: formData.incentives,
          shift_start: formData.shiftStart,
          shift_end: formData.shiftEnd,
          work_days: formData.workDays,
          start_date: startDate,
          min_education: formData.minEducation,
          min_experience_months: formData.experienceMonths,
          languages_required: formData.languages,
          physical_requirements: formData.physicalRequirements,
          certifications_required: formData.certifications?.split(',').map(cert => cert.trim()),
          is_highlighted: formData.isHighlighted,
          status: 'active'
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Job posted successfully!",
        description: "Your job listing is now live",
      });
      
      navigate('/jobs');
      
    } catch (error: any) {
      toast({
        title: "Error posting job",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSaveButton = () => (
    <Button variant="outline" onClick={() => 
      toast({
        title: "Draft saved",
        description: "Your job posting has been saved as a draft",
      })
    }>
      <Save className="w-4 h-4 mr-2" />
      Save Draft
    </Button>
  );

  const stepTitles = [
    "Job Details",
    "Location & Salary",
    "Schedule & Requirements",
    "Company Info"
  ];

  return (
    <Layout>
      <div className="container py-8 px-4 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Post a Job</h1>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {stepTitles.map((title, index) => (
              <div 
                key={index} 
                className={`hidden md:block text-sm ${currentStep >= index ? 'text-primary font-medium' : 'text-muted-foreground'}`}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep + 1) / stepTitles.length * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {stepTitles.length}
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{stepTitles[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Provide basic information about the job opening"}
              {currentStep === 1 && "Where is the job located and what's the compensation?"}
              {currentStep === 2 && "Specify work schedule and job requirements"}
              {currentStep === 3 && "Add your company details and contact information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Job Details */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleTextChange}
                      placeholder="e.g. Experienced Plumber"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobType">Job Type <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.jobType} 
                        onValueChange={(value) => handleSelectChange('jobType', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <div className="flex items-center space-x-2 mb-2">
                      <Button type="button" variant="outline" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Voice Record
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        AI Assistant
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleTextChange}
                      placeholder="Describe the job responsibilities, expectations, and ideal candidate..."
                      rows={5}
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Location & Salary */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input 
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleTextChange}
                        placeholder="e.g. 110001"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.state} 
                        onValueChange={(value) => handleSelectChange('state', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleTextChange}
                        placeholder="e.g. Mumbai"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address/Landmark</Label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleTextChange}
                        placeholder="e.g. Near Railway Station"
                        className="text-gray-900 placeholder-gray-400 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Salary Range</Label>
                    <Tabs value={formData.salaryPeriod} onValueChange={(value) => handleSelectChange('salaryPeriod', value)}>
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="mb-8">
                      <Slider 
                        defaultValue={[formData.salaryMin, formData.salaryMax]}
                        max={100000}
                        step={1000}
                        onValueChange={handleSalaryChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{formData.salaryMin.toLocaleString()}</span>
                        <span>₹{formData.salaryMax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="incentives">Incentives or Bonuses (Optional)</Label>
                    <Input 
                      id="incentives"
                      name="incentives"
                      value={formData.incentives}
                      onChange={handleTextChange}
                      placeholder="e.g. Performance bonus, accommodation provided"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Schedule & Requirements */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shiftStart">Shift Start Time</Label>
                      <Input 
                        id="shiftStart"
                        name="shiftStart"
                        type="time"
                        value={formData.shiftStart}
                        onChange={handleTextChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shiftEnd">Shift End Time</Label>
                      <Input 
                        id="shiftEnd"
                        name="shiftEnd"
                        type="time"
                        value={formData.shiftEnd}
                        onChange={handleTextChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Work Days</Label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {daysOfWeek.map((day) => (
                        <div key={day.id} className="flex items-center justify-center">
                          <Checkbox 
                            id={day.id} 
                            checked={formData.workDays.includes(day.id)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('workDays', day.id, !!checked)
                            }
                            className="mx-auto"
                          />
                          <Label htmlFor={day.id} className="ml-1 text-sm">{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Start Date</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="immediate" 
                          name="startDate" 
                          value="immediate"
                          checked={formData.startDate === 'immediate'}
                          onChange={handleTextChange}
                        />
                        <Label htmlFor="immediate">Immediate Joining</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="specific" 
                          name="startDate" 
                          value="specific"
                          checked={formData.startDate === 'specific'}
                          onChange={handleTextChange}
                        />
                        <Label htmlFor="specific">Specific Date</Label>
                      </div>
                    </div>
                    {formData.startDate === 'specific' && (
                      <Input 
                        id="specificStartDate"
                        name="specificStartDate"
                        type="date"
                        value={formData.specificStartDate}
                        onChange={handleTextChange}
                        className="mt-2 text-gray-900 border-gray-300"
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minEducation">Minimum Education</Label>
                      <Select 
                        value={formData.minEducation} 
                        onValueChange={(value) => handleSelectChange('minEducation', value)}
                      >
                        <SelectTrigger className="text-gray-900">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="experienceMonths">Experience (months)</Label>
                      <Input 
                        id="experienceMonths"
                        name="experienceMonths"
                        type="number"
                        min="0"
                        value={formData.experienceMonths}
                        onChange={handleTextChange}
                        className="text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Languages Required</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center">
                          <Checkbox 
                            id={`lang-${language}`} 
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('languages', language, !!checked)
                            }
                          />
                          <Label htmlFor={`lang-${language}`} className="ml-2 text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="physicalRequirements">Physical Requirements</Label>
                    <Input 
                      id="physicalRequirements"
                      name="physicalRequirements"
                      value={formData.physicalRequirements}
                      onChange={handleTextChange}
                      placeholder="e.g. Ability to lift 20kg"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="certifications">Required Certifications (comma separated)</Label>
                    <Input 
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleTextChange}
                      placeholder="e.g. Electrician License, Safety Certification"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                </div>
              )}
              
              {/* Step 4: Company Info */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company/Organization Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleTextChange}
                      placeholder="e.g. ABC Construction"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactName">Contact Person Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleTextChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleTextChange}
                      placeholder="e.g. 9876543210"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                    <Input 
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleTextChange}
                      placeholder="e.g. contact@abcconstruction.com"
                      className="text-gray-900 placeholder-gray-400 border-gray-300"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="isHighlighted"
                      checked={formData.isHighlighted}
                      onCheckedChange={(checked) => handleCheckboxChange('isHighlighted', !!checked)}
                    />
                    <div>
                      <Label htmlFor="isHighlighted">Highlight This Job (Premium)</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your job stand out and reach more candidates (additional charges apply)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            {currentStep > 0 && (
              <Button 
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            {currentStep === 0 && renderSaveButton()}
            
            {currentStep < stepTitles.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Preview",
                      description: "This feature is coming soon",
                    });
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-nayidisha-blue hover:bg-nayidisha-blue-600"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PostJob;
