import React from 'react';
import { SkillIndiaOpportunity } from '@/integrations/skillIndiaDigital';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface SkillIndiaOpportunityCardProps {
  opportunity: SkillIndiaOpportunity;
}

export const SkillIndiaOpportunityCard: React.FC<SkillIndiaOpportunityCardProps> = ({ opportunity }) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{opportunity.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{opportunity.organization}</Badge>
          <Badge variant="outline">{opportunity.location}</Badge>
          {opportunity.sector && <Badge variant="outline">{opportunity.sector}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{opportunity.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {opportunity.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {opportunity.duration && <span>Duration: {opportunity.duration}</span>}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open(opportunity.link, '_blank')}
          >
            View Details
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 