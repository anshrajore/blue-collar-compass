
// This file contains sample job data for the application
// In production, this would be replaced with API data

export interface SampleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  jobType: string;
  category: string;
  isUrgent?: boolean;
  isVerified?: boolean;
}

export const sampleJobs: SampleJob[] = [
  {
    id: 'sample1',
    title: 'Experienced Plumber for Residential Projects',
    company: 'HomeFixers Ltd.',
    location: 'Mumbai, Maharashtra',
    salary: '20,000 - 30,000/month',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    category: 'Plumbing',
    isUrgent: true,
    isVerified: true
  },
  {
    id: 'sample2',
    title: 'Electrician for Commercial Building Maintenance',
    company: 'PowerTech Solutions',
    location: 'Pune, Maharashtra',
    salary: '22,000 - 28,000/month',
    postedDate: '1 day ago',
    jobType: 'Full-time',
    category: 'Electrical',
    isVerified: true
  },
  {
    id: 'sample3',
    title: 'Skilled Carpenter for Furniture Workshop',
    company: 'WoodArt Furnishings',
    location: 'Thane, Maharashtra',
    salary: '18,000 - 25,000/month',
    postedDate: '3 days ago',
    jobType: 'Full-time',
    category: 'Carpentry',
    isVerified: true
  },
  {
    id: 'sample4',
    title: 'Delivery Driver with Two-Wheeler (Night Shift)',
    company: 'QuickServe Logistics',
    location: 'Mumbai, Maharashtra',
    salary: '15,000 - 22,000/month',
    postedDate: '5 days ago',
    jobType: 'Full-time',
    category: 'Driving',
    isUrgent: true
  },
  {
    id: 'sample5',
    title: 'Construction Worker for Residential Project',
    company: 'BuildRight Constructions',
    location: 'Navi Mumbai, Maharashtra',
    salary: '500 - 700/day',
    postedDate: '4 days ago',
    jobType: 'Daily Wages',
    category: 'Construction'
  },
  {
    id: 'sample6',
    title: 'Security Guard for Corporate Office',
    company: 'SafeZone Security Services',
    location: 'Bangalore, Karnataka',
    salary: '15,000 - 18,000/month',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    category: 'Security'
  },
  {
    id: 'sample7',
    title: 'Housekeeping Staff for 5-Star Hotel',
    company: 'Grand Luxe Hotels',
    location: 'Delhi, Delhi',
    salary: '14,000 - 16,000/month',
    postedDate: 'Today',
    jobType: 'Full-time',
    category: 'Housekeeping',
    isUrgent: true
  },
  {
    id: 'sample8',
    title: 'Cook for Corporate Canteen',
    company: 'TasteBuds Food Services',
    location: 'Chennai, Tamil Nadu',
    salary: '18,000 - 25,000/month',
    postedDate: '3 days ago',
    jobType: 'Full-time',
    category: 'Cooking',
    isVerified: true
  },
  {
    id: 'sample9',
    title: 'Tailor for Boutique Fashion Store',
    company: 'TrendSetters Fashion',
    location: 'Kolkata, West Bengal',
    salary: '16,000 - 22,000/month',
    postedDate: '6 days ago',
    jobType: 'Full-time',
    category: 'Tailoring'
  },
  {
    id: 'sample10',
    title: 'Factory Worker for Food Processing Unit',
    company: 'Natural Foods Industries',
    location: 'Pune, Maharashtra',
    salary: '14,000 - 18,000/month',
    postedDate: '1 week ago',
    jobType: 'Full-time',
    category: 'Factory Work'
  },
  {
    id: 'sample11',
    title: 'Gardener for Large Corporate Campus',
    company: 'GreenScape Maintenance',
    location: 'Bangalore, Karnataka',
    salary: '15,000 - 20,000/month',
    postedDate: '5 days ago',
    jobType: 'Full-time',
    category: 'Gardening'
  },
  {
    id: 'sample12',
    title: 'Delivery Executive with Own Vehicle',
    company: 'Zip Delivery Services',
    location: 'Hyderabad, Telangana',
    salary: '18,000 - 25,000/month',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    category: 'Delivery',
    isUrgent: true
  }
];
