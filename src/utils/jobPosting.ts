import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface JobPostingData {
  title: string;
  description: string;
  job_type: string;
  category: string;
  location_city: string;
  location_state: string;
  location_address: string;
  salary_min: number;
  salary_max: number;
  salary_period: string;
  company_name: string;
  company_description?: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  work_days: string[];
  shift_start: string;
  shift_end: string;
  min_experience_months: number;
  min_education: string;
  languages_required: string[];
  is_urgent?: boolean;
  is_highlighted?: boolean;
}

export const createJob = async (jobData: JobPostingData) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        ...jobData,
        employer_id: session.user.id,
        status: 'active',
        is_verified: false
      })
      .select()
      .single();

    if (error) throw error;

    // Add notification using the global function
    if ((window as any).addNotification) {
      (window as any).addNotification({
        type: 'job_posted',
        title: 'Job Posted Successfully',
        message: `Your job "${jobData.title}" has been posted and is now live.`,
        data: { job_id: data.id }
      });
    }

    toast({
      title: "Job posted successfully!",
      description: "Your job is now live and accepting applications.",
    });

    return data;
  } catch (error: any) {
    console.error('Error creating job:', error);
    toast({
      title: "Failed to post job",
      description: error.message || "Something went wrong",
      variant: "destructive"
    });
    throw error;
  }
};

export const sendApplicationNotification = async (
  employerId: string, 
  jobTitle: string, 
  applicantName: string,
  applicantPhone: string = '9096946604'
) => {
  try {
    // Add notification using the global function
    if ((window as any).addNotification) {
      (window as any).addNotification({
        type: 'new_application',
        title: 'New Job Application',
        message: `${applicantName} has applied for "${jobTitle}". Contact: ${applicantPhone}`,
        data: { 
          applicant_name: applicantName,
          applicant_phone: applicantPhone,
          job_title: jobTitle
        }
      });
    }
    // TODO: Implement backend notification for production (e.g. send email/SMS)
    console.log(`New application for ${jobTitle} from ${applicantName} (${applicantPhone})`);
  } catch (error) {
    console.error('Error sending application notification:', error);
  }
};

/**
 * Checks if a value is a valid UUID.
 */
export function isValidUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}
