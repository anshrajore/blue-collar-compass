
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Star, Play, Users, Award, Target, TrendingUp } from 'lucide-react';

const SkillDevelopment = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const skillCategories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      description: 'Programming, software tools, and technical expertise',
      courses: [
        {
          id: '1',
          title: 'Basic Computer Skills',
          description: 'Learn essential computer operations, MS Office, and internet usage',
          duration: '2 weeks',
          level: 'Beginner',
          rating: 4.8,
          students: 1250,
          price: 'Free',
          thumbnail: '/placeholder.svg'
        },
        {
          id: '2',
          title: 'Digital Marketing Fundamentals',
          description: 'Master social media marketing, SEO, and online advertising',
          duration: '4 weeks',
          level: 'Intermediate',
          rating: 4.6,
          students: 890,
          price: '₹999',
          thumbnail: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'vocational',
      name: 'Vocational Training',
      description: 'Hands-on skills for specific trades and professions',
      courses: [
        {
          id: '3',
          title: 'Electrical Work Basics',
          description: 'Fundamental electrical safety, wiring, and repair skills',
          duration: '6 weeks',
          level: 'Beginner',
          rating: 4.7,
          students: 567,
          price: '₹1,999',
          thumbnail: '/placeholder.svg'
        },
        {
          id: '4',
          title: 'Plumbing Fundamentals',
          description: 'Basic plumbing repairs, pipe fitting, and maintenance',
          duration: '4 weeks',
          level: 'Beginner',
          rating: 4.5,
          students: 432,
          price: '₹1,499',
          thumbnail: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'soft-skills',
      name: 'Soft Skills',
      description: 'Communication, leadership, and interpersonal skills',
      courses: [
        {
          id: '5',
          title: 'English Communication',
          description: 'Improve spoken and written English for workplace success',
          duration: '8 weeks',
          level: 'All Levels',
          rating: 4.9,
          students: 2340,
          price: 'Free',
          thumbnail: '/placeholder.svg'
        },
        {
          id: '6',
          title: 'Interview Skills & Resume Building',
          description: 'Master job interviews and create compelling resumes',
          duration: '2 weeks',
          level: 'All Levels',
          rating: 4.8,
          students: 1876,
          price: 'Free',
          thumbnail: '/placeholder.svg'
        }
      ]
    }
  ];

  const learningPaths = [
    {
      id: 'construction',
      title: 'Construction Worker Path',
      description: 'Complete training program for construction industry',
      courses: ['Electrical Work Basics', 'Plumbing Fundamentals', 'Basic Computer Skills'],
      duration: '12 weeks',
      certification: true
    },
    {
      id: 'service',
      title: 'Service Industry Path',
      description: 'Customer service and hospitality skills',
      courses: ['English Communication', 'Interview Skills', 'Digital Marketing Fundamentals'],
      duration: '14 weeks',
      certification: true
    }
  ];

  const achievements = [
    { name: 'First Course Completed', icon: Award, earned: true },
    { name: 'Skills Expert', icon: Star, earned: false },
    { name: 'Fast Learner', icon: TrendingUp, earned: true },
    { name: 'Mentor Helper', icon: Users, earned: false }
  ];

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses(prev => [...prev, courseId]);
  };

  const isEnrolled = (courseId: string) => enrolledCourses.includes(courseId);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skill Development Center</h1>
          <p className="text-muted-foreground">
            Enhance your skills and boost your career prospects with our comprehensive training programs
          </p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            {skillCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-blue-600" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {course.rating}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {course.students}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{course.level}</Badge>
                          <span className="font-semibold text-green-600">{course.price}</span>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={() => handleEnroll(course.id)}
                          disabled={isEnrolled(course.id)}
                        >
                          {isEnrolled(course.id) ? (
                            <>Enrolled <Award className="ml-2 h-4 w-4" /></>
                          ) : (
                            <>Enroll Now <Play className="ml-2 h-4 w-4" /></>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      {path.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{path.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium">Included Courses:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {path.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Duration: {path.duration}</span>
                      {path.certification && (
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    
                    <Button className="w-full">Start Learning Path</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
                    <p className="text-muted-foreground mb-4">Start learning by enrolling in courses from the All Courses tab</p>
                    <Button>Browse Courses</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((courseId) => {
                      const course = skillCategories
                        .flatMap(cat => cat.courses)
                        .find(c => c.id === courseId);
                      if (!course) return null;
                      
                      const progress = Math.floor(Math.random() * 80) + 10;
                      
                      return (
                        <div key={courseId} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{course.title}</h4>
                            <span className="text-sm text-muted-foreground">{progress}% complete</span>
                          </div>
                          <Progress value={progress} className="mb-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Last accessed: 2 days ago</span>
                            <Button size="sm" variant="outline">Continue Learning</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`text-center ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <CardContent className="p-6">
                    <achievement.icon className={`h-12 w-12 mx-auto mb-4 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                    <h3 className="font-medium mb-2">{achievement.name}</h3>
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800">Earned</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
