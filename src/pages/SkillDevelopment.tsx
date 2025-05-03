
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, Clock, Filter, Play, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "Basic Electrical Wiring",
    provider: "NSDC Learning",
    level: "Beginner",
    duration: "20 hours",
    rating: 4.8,
    students: 15420,
    image: "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed",
    tags: ["Electrical", "Popular", "Free"]
  },
  {
    id: 2,
    title: "Advanced Plumbing Techniques",
    provider: "Skill India",
    level: "Intermediate",
    duration: "15 hours",
    rating: 4.7,
    students: 8320,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39",
    tags: ["Plumbing", "Certification"]
  },
  {
    id: 3,
    title: "Carpentry Masterclass",
    provider: "Woodcraft Academy",
    level: "Advanced",
    duration: "25 hours",
    rating: 4.9,
    students: 7150,
    image: "https://images.unsplash.com/photo-1502301103665-0b95a4e17bfd",
    tags: ["Carpentry", "Trending"]
  },
  {
    id: 4,
    title: "Industrial Safety Standards",
    provider: "SafetyFirst Institute",
    level: "All Levels",
    duration: "10 hours",
    rating: 4.6,
    students: 12800,
    image: "https://images.unsplash.com/photo-1531984557360-89184e00f590",
    tags: ["Safety", "Certificate", "Mandatory"]
  },
  {
    id: 5,
    title: "Welding Fundamentals",
    provider: "MetalWorks Training",
    level: "Beginner",
    duration: "18 hours",
    rating: 4.7,
    students: 9240,
    image: "https://images.unsplash.com/photo-1566437936382-c63cc03b6d18",
    tags: ["Welding", "Hands-on"]
  },
  {
    id: 6,
    title: "Solar Panel Installation",
    provider: "GreenTech Academy",
    level: "Intermediate",
    duration: "22 hours",
    rating: 4.9,
    students: 6230,
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d",
    tags: ["Renewable", "Hot", "High Demand"]
  }
];

const certifications = [
  {
    id: 1,
    title: "Certified Electrician - Level 1",
    issuer: "Electrical Safety Council",
    validFor: "3 years",
    requirements: "Online exam + practical assessment",
    tag: "Most Popular"
  },
  {
    id: 2,
    title: "HVAC Technician Certificate",
    issuer: "Climate Control Association",
    validFor: "5 years",
    requirements: "In-person assessment",
    tag: "High Demand"
  },
  {
    id: 3,
    title: "Plumbing Safety Standards",
    issuer: "National Plumbing Board",
    validFor: "4 years",
    requirements: "Online course + exam",
    tag: "Essential"
  },
  {
    id: 4,
    title: "Welding Safety & Standards",
    issuer: "Industrial Welding Institute",
    validFor: "2 years",
    requirements: "Practical test",
    tag: "Required"
  }
];

const SkillDevelopment = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nayidisha-blue mb-2">Skill Development</h1>
          <p className="text-muted-foreground max-w-3xl">
            Enhance your skills and increase your job opportunities with our curated courses, 
            certifications, and training programs. All courses are designed specifically for 
            blue-collar professionals.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-lg opacity-90"></div>
            <div className="relative z-10 flex flex-col items-center text-white text-center py-16 px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Build Skills for Better Opportunities
              </h2>
              <p className="max-w-2xl mb-6 text-white/90">
                Complete courses from top training providers and get certified to improve your job prospects
                and increase your earning potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button className="bg-white text-nayidisha-blue hover:bg-white/90">
                  Explore Free Courses
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-nayidisha-blue">
                  View Certifications
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-2/3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-2 sm:mb-0">Popular Courses</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input placeholder="Search courses" className="pl-8 w-[200px]" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(course => (
                <Card key={course.id} className="overflow-hidden card-hover">
                  <div className="aspect-video relative bg-muted">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" className="rounded-full h-12 w-12 p-0">
                        <Play className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {course.tags.map((tag, i) => (
                        <Badge key={i} className="bg-black/50 text-white border-none">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{course.provider}</p>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <span className="text-xs">•</span>
                      <span>{course.level}</span>
                      <span className="text-xs">•</span>
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Badge variant="outline" className="bg-nayidisha-blue-50">
                      {course.tags[0]}
                    </Badge>
                    <Button size="sm">Start Learning</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline">
                Load More Courses <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Certified</CardTitle>
                <CardDescription>Increase your job prospects with these industry-recognized certifications</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {certifications.map(cert => (
                  <div 
                    key={cert.id} 
                    className="p-3 border rounded-md border-muted hover:border-primary hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          By {cert.issuer}
                        </p>
                      </div>
                      {cert.tag && (
                        <Badge className="bg-nayidisha-orange text-white border-none">
                          {cert.tag}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 text-sm flex flex-wrap gap-y-1 gap-x-3 text-muted-foreground">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Valid:</span> {cert.validFor}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">Requirements:</span> {cert.requirements}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">View All Certifications</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-nayidisha-blue/10 to-nayidisha-blue/5 border-nayidisha-blue/20">
              <CardHeader>
                <CardTitle className="text-nayidisha-blue">Skill Assessment</CardTitle>
                <CardDescription>Evaluate your current skills and get personalized recommendations</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-nayidisha-blue/20 flex items-center justify-center text-nayidisha-blue">
                    1
                  </div>
                  <p className="text-sm">Take a 15-minute assessment</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-nayidisha-blue/20 flex items-center justify-center text-nayidisha-blue">
                    2
                  </div>
                  <p className="text-sm">Get your skill report</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-nayidisha-blue/20 flex items-center justify-center text-nayidisha-blue">
                    3
                  </div>
                  <p className="text-sm">Receive a personalized learning path</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600">
                  Start Assessment
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Top Instructors</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${i+10}`} />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Instructor Name</h4>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? 'Electrical Engineering' : 
                         i === 2 ? 'Plumbing Expert' : 'Safety Specialist'} 
                      </p>
                    </div>
                    <div className="flex items-center ml-auto">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">{4.7 + i/10}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-muted rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need Help Finding the Right Course?</h2>
              <p className="text-muted-foreground max-w-xl">
                Our career advisors can help you create a personalized learning plan based on your goals and current skill level.
              </p>
            </div>
            <Button size="lg" className="whitespace-nowrap">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
