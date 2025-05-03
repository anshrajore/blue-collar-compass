import { useQuery } from '@tanstack/react-query';
import { skillIndiaDigitalApi, SkillIndiaOpportunity } from '@/integrations/skillIndiaDigital';

export const useSkillIndiaOpportunities = () => {
  return useQuery<SkillIndiaOpportunity[]>({
    queryKey: ['skillIndiaDigital', 'opportunities'],
    queryFn: () => skillIndiaDigitalApi.getOpportunities(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useSkillIndiaOpportunity = (id: string) => {
  return useQuery<SkillIndiaOpportunity | null>({
    queryKey: ['skillIndiaDigital', 'opportunity', id],
    queryFn: () => skillIndiaDigitalApi.getOpportunityById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useSkillIndiaSearch = (query: string) => {
  return useQuery<SkillIndiaOpportunity[]>({
    queryKey: ['skillIndiaDigital', 'search', query],
    queryFn: () => skillIndiaDigitalApi.searchOpportunities(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}; 