import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Award, BookOpen, Check, Calendar, ChevronRight, Video, FileText, Users, Star, Loader2 } from 'lucide-react';
import { useSkillIndiaCourses } from '@/hooks/useSkillIndia';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from '@/components/CourseCard';

const SkillDevelopment = () => {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('popular');
  
  const { data: popularCourses, isLoading: isLoadingPopular } = useSkillIndiaCourses('popular');
  const { data: freeCourses, isLoading: isLoadingFree } = useSkillIndiaCourses('free');
  const { data: trendingCourses, isLoading: isLoadingTrending } = useSkillIndiaCourses('trending');
  const { data: certificationCourses, isLoading: isLoadingCertification } = useSkillIndiaCourses('certification');
  
  // Simulate progress loading
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = {
    popular: isLoadingPopular,
    free: isLoadingFree,
    trending: isLoadingTrending,
    certification: isLoadingCertification
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-nayidisha-blue">Develop Your Skills</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your employability with our free skill development courses designed specifically for blue-collar workers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-full md:col-span-2">
            <Tabs defaultValue="popular" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="free">Free Courses</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="certification">Certification</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="popular" className="space-y-6">
                {isLoading.popular ? (
                  <CourseSkeleton />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {popularCourses?.courses.map((course, index) => (
                      <CourseCard 
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.imageUrl}
                        category={course.category}
                        duration={course.duration}
                        level={course.level}
                        students={course.students}
                        featured={index === 0}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="free" className="space-y-6">
                {isLoading.free ? (
                  <CourseSkeleton />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freeCourses?.courses.map(course => (
                      <CourseCard 
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.imageUrl}
                        category={course.category}
                        duration={course.duration}
                        level={course.level}
                        students={course.students}
                        free={course.isFree}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                {isLoading.trending ? (
                  <CourseSkeleton />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trendingCourses?.courses.map(course => (
                      <CourseCard 
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.imageUrl}
                        category={course.category}
                        duration={course.duration}
                        level={course.level}
                        students={course.students}
                        trending
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="certification" className="space-y-6">
                {isLoading.certification ? (
                  <CourseSkeleton />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificationCourses?.courses.map(course => (
                      <CourseCard 
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.imageUrl}
                        category={course.category}
                        duration={course.duration}
                        level={course.level}
                        students={course.students}
                        certification={course.isCertified}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Path</CardTitle>
                <CardDescription>Track your progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Recommended Courses</h3>
                    {[1, 2, 3].map((_, index) => (
                      <RecommendedCourse
                        key={index}
                        title="Basic Electrical Wiring"
                        duration="4 weeks"
                        progress={progress}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Learning Partners</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <PartnerLogo name="National Skill Development Corporation" />
            <PartnerLogo name="Skill India" />
            <PartnerLogo name="ITI" />
            <PartnerLogo name="EPFO" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CourseSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const RecommendedCourse = ({ title, duration, progress }: { title: string; duration: string; progress: number }) => (
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{duration}</p>
    </div>
    <Progress value={progress} className="w-24 h-2" />
  </div>
);

const Certificate = ({ title, issueDate, organization }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded bg-muted/70 flex items-center justify-center">
        <Award size={18} className="text-nayidisha-blue" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{organization}</span>
          <span>•</span>
          <span>{issueDate}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <FileText size={14} />
      </Button>
    </div>
  );
};

const PartnerLogo = ({ name }) => {
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2">
        <span className="text-xl font-bold">{initials}</span>
      </div>
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
};

export default SkillDevelopment;
