import { SkillIndiaCourse, SkillIndiaResponse } from './skillIndia';

const mockCourses: SkillIndiaCourse[] = [
  {
    id: '1',
    title: 'Basic Electrical Wiring',
    description: 'Learn the fundamentals of electrical wiring for residential and commercial settings.',
    category: 'Electrical',
    duration: '4 weeks',
    level: 'Beginner',
    students: 1240,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    isFree: false,
    isCertified: true,
    provider: 'NSDC',
    rating: 4.5,
    startDate: '2024-06-01',
    endDate: '2024-06-28',
    location: 'Online',
    prerequisites: ['Basic Mathematics', 'Safety Awareness'],
    skills: ['Electrical Wiring', 'Circuit Installation', 'Safety Procedures']
  },
  {
    id: '2',
    title: 'Plumbing Installation & Repair',
    description: 'Master the skills needed for residential and commercial plumbing.',
    category: 'Plumbing',
    duration: '3 weeks',
    level: 'Intermediate',
    students: 954,
    imageUrl: 'https://images.unsplash.com/photo-1680857323824-76a033961e19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    isFree: true,
    isCertified: true,
    provider: 'Skill India',
    rating: 4.7,
    startDate: '2024-06-15',
    endDate: '2024-07-05',
    location: 'Hybrid',
    prerequisites: ['Basic Tools Knowledge'],
    skills: ['Pipe Installation', 'Leak Repair', 'Fixture Installation']
  },
  {
    id: '3',
    title: 'Carpentry Basics',
    description: 'Learn fundamental woodworking skills and furniture making techniques.',
    category: 'Carpentry',
    duration: '5 weeks',
    level: 'Beginner',
    students: 763,
    imageUrl: 'https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    isFree: false,
    isCertified: true,
    provider: 'NSDC',
    rating: 4.3,
    startDate: '2024-07-01',
    endDate: '2024-08-05',
    location: 'Offline',
    prerequisites: ['Basic Mathematics', 'Hand Tools Knowledge'],
    skills: ['Woodworking', 'Furniture Making', 'Measurement']
  },
  {
    id: '4',
    title: 'HVAC Maintenance',
    description: 'Comprehensive course on heating, ventilation and air conditioning systems.',
    category: 'HVAC',
    duration: '6 weeks',
    level: 'Intermediate',
    students: 529,
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-1a1a6a0f9394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    isFree: false,
    isCertified: true,
    provider: 'Skill India',
    rating: 4.6,
    startDate: '2024-06-20',
    endDate: '2024-08-01',
    location: 'Hybrid',
    prerequisites: ['Basic Electrical Knowledge'],
    skills: ['HVAC Installation', 'System Maintenance', 'Troubleshooting']
  },
  {
    id: '5',
    title: 'Welding Techniques',
    description: 'Learn MIG, TIG, and stick welding methods for various applications.',
    category: 'Welding',
    duration: '8 weeks',
    level: 'Advanced',
    students: 412,
    imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    isFree: false,
    isCertified: true,
    provider: 'NSDC',
    rating: 4.8,
    startDate: '2024-07-15',
    endDate: '2024-09-09',
    location: 'Offline',
    prerequisites: ['Safety Training', 'Basic Metal Knowledge'],
    skills: ['MIG Welding', 'TIG Welding', 'Stick Welding']
  }
];

export const skillIndiaMockApi = {
  async getPopularCourses(): Promise<SkillIndiaResponse> {
    return {
      courses: mockCourses,
      total: mockCourses.length,
      page: 1,
      limit: 10
    };
  },

  async getFreeCourses(): Promise<SkillIndiaResponse> {
    return {
      courses: mockCourses.filter(course => course.isFree),
      total: mockCourses.filter(course => course.isFree).length,
      page: 1,
      limit: 10
    };
  },

  async getTrendingCourses(): Promise<SkillIndiaResponse> {
    return {
      courses: mockCourses.sort((a, b) => b.students - a.students).slice(0, 4),
      total: 4,
      page: 1,
      limit: 10
    };
  },

  async getCertificationCourses(): Promise<SkillIndiaResponse> {
    return {
      courses: mockCourses.filter(course => course.isCertified),
      total: mockCourses.filter(course => course.isCertified).length,
      page: 1,
      limit: 10
    };
  },

  async searchCourses(query: string): Promise<SkillIndiaResponse> {
    const searchResults = mockCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      courses: searchResults,
      total: searchResults.length,
      page: 1,
      limit: 10
    };
  }
}; 