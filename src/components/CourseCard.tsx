
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Award, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: string;
  students: number;
  featured?: boolean;
  free?: boolean;
  trending?: boolean;
  certification?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  category,
  duration,
  level,
  students,
  featured = false,
  free = false,
  trending = false,
  certification = false
}) => {
  return (
    <Card className={cn(
      "overflow-hidden",
      featured && "md:col-span-2"
    )}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {(free || trending || certification) && (
          <div className="absolute top-2 right-2 flex gap-2">
            {free && <Badge className="bg-green-500">Free</Badge>}
            {trending && <Badge className="bg-orange-500">Trending</Badge>}
            {certification && <Badge className="bg-blue-500">Certified</Badge>}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="outline">{level}</Badge>
          <Badge variant="outline">{duration}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span>4.5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Play size={16} className="mr-2" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard; 
