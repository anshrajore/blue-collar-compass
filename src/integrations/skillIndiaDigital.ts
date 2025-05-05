import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SkillIndiaOpportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'job' | 'training' | 'internship';
  category: string;
  skills: string[];
  url: string;
  imageUrl?: string;
  sector?: string;
  duration?: string;
  link: string;
}

export const skillIndiaDigitalApi = {
  async getOpportunities(): Promise<SkillIndiaOpportunity[]> {
    try {
      const response = await axios.get('https://www.skillindiadigital.gov.in/opportunities');
      const $ = cheerio.load(response.data);
      const opportunities: SkillIndiaOpportunity[] = [];

      // Scrape opportunities from the page
      $('.opportunity-card').each((index, element) => {
        const $card = $(element);
        const opportunity: SkillIndiaOpportunity = {
          id: $card.attr('data-id') || `opp-${index}`,
          title: $card.find('.opportunity-title').text().trim(),
          description: $card.find('.opportunity-description').text().trim(),
          organization: $card.find('.organization-name').text().trim(),
          location: $card.find('.location').text().trim(),
          startDate: $card.find('.start-date').text().trim(),
          endDate: $card.find('.end-date').text().trim(),
          type: $card.find('.opportunity-type').text().trim().toLowerCase() as 'job' | 'training' | 'internship',
          category: $card.find('.category').text().trim(),
          skills: $card.find('.skills').text().trim().split(',').map(s => s.trim()),
          url: $card.find('a').attr('href') || '',
          imageUrl: $card.find('img').attr('src'),
          sector: $card.find('.sector').text().trim(),
          duration: $card.find('.duration').text().trim(),
          link: $card.find('a').attr('href') || ''
        };
        opportunities.push(opportunity);
      });

      return opportunities;
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      throw error;
    }
  },

  async getOpportunityById(id: string): Promise<SkillIndiaOpportunity | null> {
    try {
      const opportunities = await this.getOpportunities();
      return opportunities.find(opp => opp.id === id) || null;
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      throw error;
    }
  },

  async searchOpportunities(query: string): Promise<SkillIndiaOpportunity[]> {
    try {
      const opportunities = await this.getOpportunities();
      return opportunities.filter(opp => 
        opp.title.toLowerCase().includes(query.toLowerCase()) ||
        opp.description.toLowerCase().includes(query.toLowerCase()) ||
        opp.category.toLowerCase().includes(query.toLowerCase()) ||
        opp.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      );
    } catch (error) {
      console.error('Error searching opportunities:', error);
      throw error;
    }
  }
}; 