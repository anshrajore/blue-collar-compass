
import { supabase } from '@/integrations/supabase/client';

export const addSampleJobs = async (employerId: string) => {
  try {
    // Check if sample jobs already exist for this employer
    const { data: existingJobs, error: checkError } = await supabase
      .from('jobs')
      .select('id')
      .eq('employer_id', employerId)
      .limit(1);

    if (checkError) {
      console.error('Error checking existing jobs:', checkError);
      return;
    }

    // If jobs already exist, don't add more samples
    if (existingJobs && existingJobs.length > 0) {
      console.log('Sample jobs already exist for this employer');
      return;
    }

    const sampleJobs = [
      {
        employer_id: employerId,
        title: 'Warehouse Worker',
        description: 'We are looking for a reliable warehouse worker to join our logistics team. Responsibilities include inventory management, order picking, packing, and maintaining warehouse organization. Previous warehouse experience preferred but not required. We provide comprehensive training and opportunities for advancement.',
        category: 'Warehouse & Logistics',
        job_type: 'Full-time',
        location_city: 'Mumbai',
        location_state: 'Maharashtra',
        location_address: 'Andheri Industrial Estate, Mumbai',
        location_pincode: '400053',
        salary_min: 18000,
        salary_max: 25000,
        salary_period: 'month',
        company_name: 'LogiCorp Industries',
        contact_name: 'Rajesh Kumar',
        contact_phone: '+91 98765 43210',
        contact_email: 'hr@logicorp.com',
        min_education: 'High School',
        min_experience_months: 0,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '09:00',
        shift_end: '18:00',
        languages_required: ['Hindi', 'English'],
        physical_requirements: 'Ability to lift up to 25kg, standing for long periods',
        is_urgent: true,
        is_verified: true,
        status: 'active'
      },
      {
        employer_id: employerId,
        title: 'Delivery Executive',
        description: 'Join our growing delivery team! We are seeking dedicated delivery executives for our e-commerce platform. You will be responsible for timely delivery of packages, maintaining customer relationships, and ensuring package safety. Own vehicle preferred. Flexible working hours and performance-based incentives.',
        category: 'Delivery & Transportation',
        job_type: 'Full-time',
        location_city: 'Delhi',
        location_state: 'Delhi',
        location_address: 'Karol Bagh, Central Delhi',
        location_pincode: '110005',
        salary_min: 20000,
        salary_max: 35000,
        salary_period: 'month',
        company_name: 'QuickDeliver Solutions',
        contact_name: 'Priya Sharma',
        contact_phone: '+91 87654 32109',
        contact_email: 'careers@quickdeliver.com',
        min_education: 'High School',
        min_experience_months: 6,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '10:00',
        shift_end: '19:00',
        languages_required: ['Hindi', 'English'],
        physical_requirements: 'Valid driving license, own vehicle preferred',
        certifications_required: ['Driving License'],
        incentives: 'Performance bonus up to ₹5,000/month + fuel allowance',
        is_highlighted: true,
        is_verified: true,
        status: 'active'
      },
      {
        employer_id: employerId,
        title: 'Factory Production Worker',
        description: 'Manufacturing company seeks production workers for our textile factory. Duties include operating machinery, quality control, packaging, and maintaining production schedules. Experience with industrial machines is a plus. We offer job security, skill development programs, and career growth opportunities.',
        category: 'Manufacturing',
        job_type: 'Full-time',
        location_city: 'Bangalore',
        location_state: 'Karnataka',
        location_address: 'Peenya Industrial Area, Bangalore',
        location_pincode: '560058',
        salary_min: 16000,
        salary_max: 22000,
        salary_period: 'month',
        company_name: 'Textile Masters Pvt Ltd',
        contact_name: 'Suresh Reddy',
        contact_phone: '+91 76543 21098',
        contact_email: 'hr@textilemaster.com',
        min_education: 'High School',
        min_experience_months: 12,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri'],
        shift_start: '08:00',
        shift_end: '17:00',
        languages_required: ['Kannada', 'Hindi'],
        physical_requirements: 'Ability to stand for 8+ hours, good hand-eye coordination',
        is_verified: true,
        status: 'active'
      },
      {
        employer_id: employerId,
        title: 'Security Guard',
        description: 'We are hiring security guards for our corporate office complex. Responsibilities include monitoring premises, controlling access, conducting patrols, and maintaining security logs. Previous security experience and certification preferred. Night shift and day shift positions available.',
        category: 'Security',
        job_type: 'Part-time',
        location_city: 'Pune',
        location_state: 'Maharashtra',
        location_address: 'Baner IT Park, Pune',
        location_pincode: '411045',
        salary_min: 15000,
        salary_max: 20000,
        salary_period: 'month',
        company_name: 'SecureGuard Services',
        contact_name: 'Amit Patil',
        contact_phone: '+91 65432 10987',
        contact_email: 'jobs@secureguard.in',
        min_education: 'High School',
        min_experience_months: 6,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        shift_start: '22:00',
        shift_end: '06:00',
        languages_required: ['Marathi', 'Hindi', 'English'],
        physical_requirements: 'Alert and physically fit, good vision',
        certifications_required: ['Security Guard License'],
        status: 'active'
      },
      {
        employer_id: employerId,
        title: 'Kitchen Helper',
        description: 'Restaurant chain looking for kitchen helpers to support our culinary team. Tasks include food preparation, dishwashing, maintaining kitchen cleanliness, and assisting chefs. Great opportunity to learn culinary skills. Free meals provided during shifts.',
        category: 'Food Service',
        job_type: 'Full-time',
        location_city: 'Chennai',
        location_state: 'Tamil Nadu',
        location_address: 'T. Nagar, Chennai',
        location_pincode: '600017',
        salary_min: 14000,
        salary_max: 18000,
        salary_period: 'month',
        company_name: 'Spice Garden Restaurants',
        contact_name: 'Lakshmi Iyer',
        contact_phone: '+91 54321 09876',
        contact_email: 'hr@spicegarden.com',
        min_education: 'Primary School',
        min_experience_months: 0,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '11:00',
        shift_end: '23:00',
        languages_required: ['Tamil', 'English'],
        physical_requirements: 'Ability to work in hot kitchen environment, standing for long hours',
        incentives: 'Free meals + overtime pay',
        is_urgent: true,
        status: 'active'
      },
      {
        employer_id: employerId,
        title: 'Construction Worker',
        description: 'Construction company seeks skilled and unskilled workers for residential and commercial projects. Work includes concrete mixing, brick laying, painting, and general construction support. Safety training provided. PPE equipment supplied by company.',
        category: 'Construction',
        job_type: 'Contract',
        location_city: 'Hyderabad',
        location_state: 'Telangana',
        location_address: 'HITEC City, Hyderabad',
        location_pincode: '500081',
        salary_min: 300,
        salary_max: 500,
        salary_period: 'day',
        company_name: 'BuildRight Construction',
        contact_name: 'Venkat Rao',
        contact_phone: '+91 43210 98765',
        contact_email: 'hiring@buildright.co.in',
        min_education: 'Primary School',
        min_experience_months: 0,
        work_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        shift_start: '07:00',
        shift_end: '16:00',
        languages_required: ['Telugu', 'Hindi'],
        physical_requirements: 'Physically demanding work, ability to work at heights',
        certifications_required: ['Safety Training Certificate'],
        is_highlighted: true,
        status: 'active'
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

    console.log('Sample jobs added successfully:', data?.length);
  } catch (error) {
    console.error('Error in addSampleJobs:', error);
  }
};
