
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Award, BookOpen, Check, Calendar, ChevronRight, Video, FileText, Users, Star } from 'lucide-react';

const SkillDevelopment = () => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress loading
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

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
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="free">Free Courses</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="certificates">Certification</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="popular" className="space-y-6">
                <CourseCard 
                  title="Basic Electrical Wiring"
                  description="Learn the fundamentals of electrical wiring for residential and commercial settings."
                  image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                  category="Electrical"
                  duration="4 weeks"
                  level="Beginner"
                  students={1240}
                  featured
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CourseCard 
                    title="Plumbing Installation & Repair"
                    description="Master the skills needed for residential and commercial plumbing."
                    image="https://images.unsplash.com/photo-1680857323824-76a033961e19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Plumbing"
                    duration="3 weeks"
                    level="Intermediate"
                    students={954}
                  />
                  
                  <CourseCard 
                    title="Carpentry Basics"
                    description="Learn fundamental woodworking skills and furniture making techniques."
                    image="https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Carpentry"
                    duration="5 weeks"
                    level="Beginner"
                    students={763}
                  />
                  
                  <CourseCard 
                    title="HVAC Maintenance"
                    description="Comprehensive course on heating, ventilation and air conditioning systems."
                    image="https://images.unsplash.com/photo-1621905252507-1a1a6a0f9394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="HVAC"
                    duration="6 weeks"
                    level="Intermediate"
                    students={529}
                  />
                  
                  <CourseCard 
                    title="Welding Techniques"
                    description="Learn MIG, TIG, and stick welding methods for various applications."
                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Welding"
                    duration="8 weeks"
                    level="Advanced"
                    students={412}
                  />
                </div>
              </TabsContent>

              <TabsContent value="free" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Free Courses to Boost Your Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CourseCard 
                    title="Introduction to Electrician Work"
                    description="Get started with the basics of electrical work and safety procedures."
                    image="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Electrical"
                    duration="2 weeks"
                    level="Beginner"
                    students={2150}
                    free
                  />
                  
                  <CourseCard 
                    title="Basic Plumbing Skills"
                    description="Learn essential plumbing skills for common household repairs."
                    image="https://images.unsplash.com/photo-1621905252-f5e18fd20032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Plumbing"
                    duration="2 weeks"
                    level="Beginner"
                    students={1876}
                    free
                  />
                  
                  <CourseCard 
                    title="Home Repair Fundamentals"
                    description="Master the essential skills for common household repairs and maintenance."
                    image="https://images.unsplash.com/photo-1617722694080-f03f378e6fb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Maintenance"
                    duration="3 weeks"
                    level="Beginner"
                    students={1540}
                    free
                  />
                  
                  <CourseCard 
                    title="Construction Safety"
                    description="Essential safety knowledge for working in construction environments."
                    image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Safety"
                    duration="1 week"
                    level="All Levels"
                    students={3240}
                    free
                  />
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Trending Skill Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CourseCard 
                    title="Solar Panel Installation"
                    description="Learn to install and maintain solar panel systems for residential properties."
                    image="https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Renewable Energy"
                    duration="4 weeks"
                    level="Intermediate"
                    students={1876}
                    trending
                  />
                  
                  <CourseCard 
                    title="Smart Home Installation"
                    description="Master the installation and configuration of smart home devices and systems."
                    image="https://images.unsplash.com/photo-1558002038-184e11dc8e87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Electronics"
                    duration="3 weeks"
                    level="Intermediate"
                    students={1342}
                    trending
                  />
                  
                  <CourseCard 
                    title="EV Charging Installation"
                    description="Learn to install and maintain electric vehicle charging stations."
                    image="https://images.unsplash.com/photo-1593941707882-a5bba13bt176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Automotive"
                    duration="2 weeks"
                    level="Intermediate"
                    students={986}
                    trending
                  />
                  
                  <CourseCard 
                    title="Fiber Optic Installation"
                    description="Comprehensive training on fiber optic cable installation and maintenance."
                    image="https://images.unsplash.com/photo-1562436356-11574662e477?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Telecommunications"
                    duration="5 weeks"
                    level="Advanced"
                    students={754}
                    trending
                  />
                </div>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Certification Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CourseCard 
                    title="NSDC Certified Electrician"
                    description="Official certification recognized by the National Skill Development Corporation."
                    image="https://images.unsplash.com/photo-1621905251918-48149f9f7483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Certification"
                    duration="12 weeks"
                    level="All Levels"
                    students={2435}
                    certification
                  />
                  
                  <CourseCard 
                    title="Certified Plumbing Professional"
                    description="Industry-recognized certification for plumbing professionals."
                    image="https://images.unsplash.com/photo-1621905252144-2bd9146903fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Certification"
                    duration="10 weeks"
                    level="Intermediate"
                    students={1768}
                    certification
                  />
                  
                  <CourseCard 
                    title="Construction Safety Certification"
                    description="Comprehensive safety certification for construction site workers."
                    image="https://images.unsplash.com/photo-1508341421810-36b8fc06075b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Certification"
                    duration="8 weeks"
                    level="All Levels"
                    students={3240}
                    certification
                  />
                  
                  <CourseCard 
                    title="HVAC Technician Certification"
                    description="Professional certification for HVAC installation and maintenance."
                    image="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    category="Certification"
                    duration="16 weeks"
                    level="Advanced"
                    students={1245}
                    certification
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Path</CardTitle>
                <CardDescription>Track your progress and recommended courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div>
                  <h3 className="font-medium mb-3">Recommended for You</h3>
                  <div className="space-y-3">
                    <RecommendedCourse 
                      title="Electrical Safety Standards"
                      duration="2hr 30min"
                      progress={45}
                    />
                    <RecommendedCourse 
                      title="Advanced Circuit Design"
                      duration="3hr 15min"
                      progress={0}
                    />
                    <RecommendedCourse 
                      title="Power Distribution Systems"
                      duration="4hr"
                      progress={0}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Your Certificates</h3>
                  <div className="space-y-3">
                    <Certificate 
                      title="Basic Electrical Wiring"
                      issueDate="Jan 2023"
                      organization="NSDC"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Learning Resources <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
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

const CourseCard = ({ 
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
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${featured ? 'col-span-full' : ''}`}>
      <div className={`${featured ? 'md:grid md:grid-cols-2 gap-6' : ''}`}>
        <div className={`relative ${featured ? 'h-full min-h-[200px]' : 'h-48'} bg-muted`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {free && (
            <Badge className="absolute top-2 right-2 bg-nayidisha-blue">
              Free
            </Badge>
          )}
          {trending && (
            <Badge className="absolute top-2 right-2 bg-nayidisha-orange">
              Trending
            </Badge>
          )}
          {certification && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              Certification
            </Badge>
          )}
        </div>
        <div className="p-5">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>{level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{students}+ students</span>
            </div>
          </div>
          <Button>
            <Play size={16} className="mr-2" />
            Start Learning
          </Button>
        </div>
      </div>
    </Card>
  );
};

const RecommendedCourse = ({ title, duration, progress }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded bg-muted/70 flex items-center justify-center">
        <Video size={18} className="text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{duration}</span>
          {progress > 0 && (
            <>
              <span>•</span>
              <span>{progress}% complete</span>
            </>
          )}
        </div>
        {progress > 0 && <Progress value={progress} className="h-1 mt-1" />}
      </div>
    </div>
  );
};

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
