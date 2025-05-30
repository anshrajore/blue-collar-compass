
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import JobPreview from '@/components/JobPreview';

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    jobType: '',
    location_city: '',
    location_state: '',
    location_address: '',
    salary_min: '',
    salary_max: '',
    salary_period: 'month',
    is_urgent: false,
    is_verified: false,
    is_highlighted: false,
    work_days: [] as string[],
    shift_start: '',
    shift_end: '',
    min_experience_months: '',
    min_education: '',
    languages_required: [] as string[],
    company_name: '',
    company_description: '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkDaysChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      work_days: checked 
        ? [...prev.work_days, day]
        : prev.work_days.filter(d => d !== day)
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      languages_required: checked 
        ? [...prev.languages_required, language]
        : prev.languages_required.filter(l => l !== language)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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

      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        job_type: formData.jobType,
        location_city: formData.location_city,
        location_state: formData.location_state,
        location_address: formData.location_address,
        salary_min: parseInt(formData.salary_min) || null,
        salary_max: parseInt(formData.salary_max) || null,
        salary_period: formData.salary_period,
        is_urgent: formData.is_urgent,
        is_verified: formData.is_verified,
        is_highlighted: formData.is_highlighted,
        work_days: formData.work_days,
        shift_start: formData.shift_start || null,
        shift_end: formData.shift_end || null,
        min_experience_months: parseInt(formData.min_experience_months) || 0,
        min_education: formData.min_education || null,
        languages_required: formData.languages_required,
        company_name: formData.company_name,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        employer_id: session.user.id,
        status: 'active'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select();

      if (error) throw error;

      toast({
        title: "Job posted successfully!",
        description: "Your job posting is now live and visible to job seekers.",
      });

      navigate('/jobs');
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Error posting job",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const workDaysOptions = [
    { value: 'mon', label: 'Monday' },
    { value: 'tue', label: 'Tuesday' },
    { value: 'wed', label: 'Wednesday' },
    { value: 'thu', label: 'Thursday' },
    { value: 'fri', label: 'Friday' },
    { value: 'sat', label: 'Saturday' },
    { value: 'sun', label: 'Sunday' }
  ];

  const languageOptions = [
    'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  if (showPreview) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <JobPreview
            jobData={{
              ...formData,
              id: 'preview',
              postedDate: 'Just now',
              applicantsCount: 0
            }}
            onEdit={() => setShowPreview(false)}
            onPost={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Post a New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Job Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Electrician"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Cleaning">Cleaning</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  className="min-h-24"
                  required
                />
              </div>

              {/* Job Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location_city">City *</Label>
                  <Input
                    id="location_city"
                    value={formData.location_city}
                    onChange={(e) => handleInputChange('location_city', e.target.value)}
                    placeholder="e.g., Mumbai"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location_state">State *</Label>
                  <Input
                    id="location_state"
                    value={formData.location_state}
                    onChange={(e) => handleInputChange('location_state', e.target.value)}
                    placeholder="e.g., Maharashtra"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location_address">Full Address</Label>
                  <Input
                    id="location_address"
                    value={formData.location_address}
                    onChange={(e) => handleInputChange('location_address', e.target.value)}
                    placeholder="Complete address"
                  />
                </div>
              </div>

              {/* Salary Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salary_min">Minimum Salary (₹) *</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    value={formData.salary_min}
                    onChange={(e) => handleInputChange('salary_min', e.target.value)}
                    placeholder="15000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary_max">Maximum Salary (₹) *</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    value={formData.salary_max}
                    onChange={(e) => handleInputChange('salary_max', e.target.value)}
                    placeholder="25000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary_period">Salary Period</Label>
                  <Select value={formData.salary_period} onValueChange={(value) => handleInputChange('salary_period', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Per Month</SelectItem>
                      <SelectItem value="week">Per Week</SelectItem>
                      <SelectItem value="day">Per Day</SelectItem>
                      <SelectItem value="hour">Per Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Work Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shift_start">Shift Start Time</Label>
                  <Input
                    id="shift_start"
                    type="time"
                    value={formData.shift_start}
                    onChange={(e) => handleInputChange('shift_start', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="shift_end">Shift End Time</Label>
                  <Input
                    id="shift_end"
                    type="time"
                    value={formData.shift_end}
                    onChange={(e) => handleInputChange('shift_end', e.target.value)}
                  />
                </div>
              </div>

              {/* Work Days */}
              <div>
                <Label>Work Days</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {workDaysOptions.map((day) => (
                    <div key={day.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.value}
                        checked={formData.work_days.includes(day.value)}
                        onCheckedChange={(checked) => handleWorkDaysChange(day.value, checked as boolean)}
                      />
                      <Label htmlFor={day.value} className="text-sm">{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_experience_months">Minimum Experience (months)</Label>
                  <Input
                    id="min_experience_months"
                    type="number"
                    value={formData.min_experience_months}
                    onChange={(e) => handleInputChange('min_experience_months', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="min_education">Minimum Education</Label>
                  <Select value={formData.min_education} onValueChange={(value) => handleInputChange('min_education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8th">8th Grade</SelectItem>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
                      <SelectItem value="ITI">ITI</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Languages */}
              <div>
                <Label>Required Languages</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languages_required.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <Label htmlFor={language} className="text-sm">{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_name">Contact Person *</Label>
                    <Input
                      id="contact_name"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange('contact_name', e.target.value)}
                      placeholder="Contact person name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="contact_phone">Contact Phone *</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_email">Contact Email *</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => handleInputChange('contact_email', e.target.value)}
                      placeholder="contact@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="company_description">Company Description</Label>
                  <Textarea
                    id="company_description"
                    value={formData.company_description}
                    onChange={(e) => handleInputChange('company_description', e.target.value)}
                    placeholder="Brief description about your company..."
                    className="min-h-20"
                  />
                </div>
              </div>

              {/* Job Features */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Job Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_urgent"
                      checked={formData.is_urgent}
                      onCheckedChange={(checked) => handleInputChange('is_urgent', checked)}
                    />
                    <Label htmlFor="is_urgent">Mark as Urgent Hiring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_highlighted"
                      checked={formData.is_highlighted}
                      onCheckedChange={(checked) => handleInputChange('is_highlighted', checked)}
                    />
                    <Label htmlFor="is_highlighted">Highlight this job (Featured)</Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  className="flex-1"
                >
                  Preview Job
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Posting...' : 'Post Job'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostJob;
