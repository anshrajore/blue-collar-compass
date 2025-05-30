
import { supabase } from '@/integrations/supabase/client';

export const addSampleJobs = async (employerId: string) => {
  try {
    // Check if sample jobs already exist for this employer
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('id')
      .eq('employer_id', employerId)
      .limit(1);

    if (existingJobs && existingJobs.length > 0) {
      return; // Sample jobs already exist
    }

    const sampleJobs = [
      {
        employer_id: employerId,
        title: 'Senior Electrician - Commercial Projects',
        description: 'We are looking for an experienced electrician to handle commercial electrical installations and maintenance. Must have experience with industrial wiring, motor controls, and electrical troubleshooting.',
        job_type: 'Full-time',
        category: 'Electrical',
        location_city: 'Mumbai',
        location_state: 'Maharashtra',
        location_address: 'Andheri East, Mumbai',
        salary_min: 35000,
        salary_max: 50000,
        salary_period: 'month',
        is_urgent: true,
        is_verified: true,
        is_highlighted: true,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '09:00',
        shift_end: '18:00',
        min_experience_months: 36,
        min_education: 'ITI',
        languages_required: ['Hindi', 'English'],
        company_name: 'ElectroTech Solutions',
        company_description: 'Leading electrical contractor in Mumbai',
        contact_name: 'Rajesh Kumar',
        contact_phone: '+91 98765 43210',
        contact_email: 'hiring@electrotech.com'
      },
      {
        employer_id: employerId,
        title: 'Construction Worker - High-rise Building',
        description: 'Immediate requirement for skilled construction workers for a 25-story residential complex. Experience in concrete work, steel fixing, and safety protocols required.',
        job_type: 'Full-time',
        category: 'Construction',
        location_city: 'Pune',
        location_state: 'Maharashtra',
        location_address: 'Hinjewadi, Pune',
        salary_min: 25000,
        salary_max: 35000,
        salary_period: 'month',
        is_urgent: true,
        is_verified: false,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '07:00',
        shift_end: '16:00',
        min_experience_months: 12,
        min_education: '10th',
        languages_required: ['Hindi', 'Marathi'],
        company_name: 'Skyline Builders',
        company_description: 'Premium construction company',
        contact_name: 'Amit Patil',
        contact_phone: '+91 98765 43211',
        contact_email: 'jobs@skylinebuilders.com'
      },
      {
        employer_id: employerId,
        title: 'Delivery Driver - E-commerce',
        description: 'Join our growing delivery team! We need reliable drivers with their own two-wheeler for last-mile delivery. Flexible timing and good incentives.',
        job_type: 'Part-time',
        category: 'Delivery',
        location_city: 'Bangalore',
        location_state: 'Karnataka',
        location_address: 'Koramangala, Bangalore',
        salary_min: 15000,
        salary_max: 25000,
        salary_period: 'month',
        is_urgent: false,
        is_verified: true,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        shift_start: '10:00',
        shift_end: '22:00',
        min_experience_months: 6,
        min_education: '8th',
        languages_required: ['English', 'Kannada'],
        company_name: 'QuickDelivery Services',
        company_description: 'Fast-growing delivery startup',
        contact_name: 'Priya Sharma',
        contact_phone: '+91 98765 43212',
        contact_email: 'careers@quickdelivery.com'
      },
      {
        employer_id: employerId,
        title: 'Factory Worker - Manufacturing Unit',
        description: 'Opportunity in our state-of-the-art manufacturing facility. Training provided for operating machinery, quality control, and production processes.',
        job_type: 'Full-time',
        category: 'Manufacturing',
        location_city: 'Chennai',
        location_state: 'Tamil Nadu',
        location_address: 'Sriperumbudur, Chennai',
        salary_min: 20000,
        salary_max: 30000,
        salary_period: 'month',
        is_urgent: false,
        is_verified: true,
        is_highlighted: true,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri'],
        shift_start: '08:00',
        shift_end: '17:00',
        min_experience_months: 0,
        min_education: '12th',
        languages_required: ['Tamil', 'English'],
        company_name: 'TechManufacturing Co.',
        company_description: 'Modern manufacturing facility',
        contact_name: 'Suresh Kumar',
        contact_phone: '+91 98765 43213',
        contact_email: 'hr@techmanufacturing.com'
      },
      {
        employer_id: employerId,
        title: 'Plumber - Residential & Commercial',
        description: 'Experienced plumber needed for residential and commercial plumbing work. Must be skilled in pipe installation, repair, and maintenance.',
        job_type: 'Full-time',
        category: 'Plumbing',
        location_city: 'Delhi',
        location_state: 'Delhi',
        location_address: 'Lajpat Nagar, New Delhi',
        salary_min: 30000,
        salary_max: 45000,
        salary_period: 'month',
        is_urgent: true,
        is_verified: true,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '08:00',
        shift_end: '17:00',
        min_experience_months: 24,
        min_education: 'ITI',
        languages_required: ['Hindi', 'English'],
        company_name: 'Capital Plumbing Services',
        company_description: 'Trusted plumbing services provider',
        contact_name: 'Vikram Singh',
        contact_phone: '+91 98765 43214',
        contact_email: 'jobs@capitalplumbing.com'
      },
      {
        employer_id: employerId,
        title: 'Security Guard - Night Shift',
        description: 'Security guard required for night shift at corporate office. Must be physically fit and have experience in security operations.',
        job_type: 'Full-time',
        category: 'Security',
        location_city: 'Gurgaon',
        location_state: 'Haryana',
        location_address: 'Cyber City, Gurgaon',
        salary_min: 18000,
        salary_max: 25000,
        salary_period: 'month',
        is_urgent: false,
        is_verified: false,
        status: 'active',
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        shift_start: '22:00',
        shift_end: '06:00',
        min_experience_months: 12,
        min_education: '10th',
        languages_required: ['Hindi', 'English'],
        company_name: 'SecureGuard Services',
        company_description: 'Professional security services',
        contact_name: 'Ramesh Gupta',
        contact_phone: '+91 98765 43215',
        contact_email: 'hiring@secureguard.com'
      }
    ];

    const { data, error } = await supabase
      .from('jobs')
      .insert(sampleJobs)
      .select();

    if (error) {
      console.error('Error adding sample jobs:', error);
      return;
    }

    console.log('Sample jobs added successfully:', data);
  } catch (error) {
    console.error('Error in addSampleJobs:', error);
  }
};
