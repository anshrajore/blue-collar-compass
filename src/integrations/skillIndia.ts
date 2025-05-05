import { skillIndiaMockApi } from './skillIndiaMock';

export interface SkillIndiaCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  students: number;
  imageUrl: string;
  isFree: boolean;
  isCertified: boolean;
  provider: string;
  rating: number;
  startDate: string;
  endDate: string;
  location: string;
  prerequisites: string[];
  skills: string[];
}

export interface SkillIndiaResponse {
  courses: SkillIndiaCourse[];
  total: number;
  page: number;
  limit: number;
}

export const skillIndiaApi = skillIndiaMockApi; 