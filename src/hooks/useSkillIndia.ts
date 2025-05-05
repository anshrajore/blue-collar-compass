import { useQuery } from '@tanstack/react-query';
import { skillIndiaApi, SkillIndiaResponse } from '@/integrations/skillIndia';

export const useSkillIndiaCourses = (type: 'popular' | 'free' | 'trending' | 'certification') => {
  return useQuery<SkillIndiaResponse>({
    queryKey: ['skillIndia', type],
    queryFn: async () => {
      switch (type) {
        case 'popular':
          return skillIndiaApi.getPopularCourses();
        case 'free':
          return skillIndiaApi.getFreeCourses();
        case 'trending':
          return skillIndiaApi.getTrendingCourses();
        case 'certification':
          return skillIndiaApi.getCertificationCourses();
        default:
          throw new Error('Invalid course type');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useSkillIndiaSearch = (query: string) => {
  return useQuery<SkillIndiaResponse>({
    queryKey: ['skillIndia', 'search', query],
    queryFn: () => skillIndiaApi.searchCourses(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}; 