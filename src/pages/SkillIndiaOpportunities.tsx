import React, { useState } from 'react';
import { useSkillIndiaOpportunities, useSkillIndiaSearch } from '@/hooks/useSkillIndiaDigital';
import { SkillIndiaOpportunityCard } from '@/components/SkillIndiaOpportunityCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const SkillIndiaOpportunities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: opportunities, isLoading: isLoadingOpportunities } = useSkillIndiaOpportunities();
  const { data: searchResults, isLoading: isLoadingSearch } = useSkillIndiaSearch(searchQuery);

  const displayData = searchQuery ? searchResults : opportunities;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingOpportunities;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Skill India Digital Opportunities</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      ) : displayData && displayData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayData.map((opportunity) => (
            <SkillIndiaOpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No opportunities found</p>
        </div>
      )}
    </div>
  );
}; 