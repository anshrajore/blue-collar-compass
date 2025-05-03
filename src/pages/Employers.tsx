
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, ChevronRight, Phone, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Employers = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-lg opacity-90"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center text-white py-12 px-6 md:px-12">
            <div className="flex-1 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Find the Right Talent for Your Business
              </h1>
              <p className="max-w-xl mb-6 text-white/90 text-lg">
                Connect with qualified blue-collar professionals, streamline your recruitment process,
                and scale your workforce efficiently with NayiDisha's employer platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-nayidisha-blue hover:bg-white/90">
                  Post a Job Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-nayidisha-blue">
                  Contact Our Team
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998" 
                alt="Team of workers" 
                className="rounded-lg w-80 h-60 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Why Choose NayiDisha for Your Hiring Needs?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-muted/30 border-none card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-nayidisha-blue to-nayidisha-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Candidates</h3>
                <p className="text-muted-foreground">
                  Access pre-screened blue-collar professionals with verified skills, qualifications, and work history.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Verified skill assessments",
                    "Background-checked workers",
                    "Availability filters"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30 border-none card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-nayidisha-orange to-nayidisha-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Hiring</h3>
                <p className="text-muted-foreground">
                  Reduce time-to-hire with our AI-powered matching system and responsive candidate pool.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Same-day candidate matches",
                    "Direct messaging & calling",
                    "Bulk hiring capabilities"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30 border-none card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
                <p className="text-muted-foreground">
                  Save on recruiting costs with our transparent pricing and no hidden charges.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Pay per job post or subscription",
                    "No placement fees",
                    "Volume discounts available"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="pricing" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 relative overflow-hidden card-hover">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nayidisha-blue-100 to-nayidisha-blue-300"></div>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For small businesses with occasional hiring needs</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">₹1,499</span>
                    <span className="text-muted-foreground ml-2">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Up to 5 active job postings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Access to candidate database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Basic analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2 border-nayidisha-blue relative overflow-hidden card-hover shadow-lg scale-105">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700"></div>
                <div className="absolute top-5 right-5">
                  <Badge className="bg-nayidisha-blue border-none">Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>For growing businesses with regular hiring needs</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">₹3,999</span>
                    <span className="text-muted-foreground ml-2">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Up to 15 active job postings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Advanced candidate filtering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Priority ranking in search results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Email & phone support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Comprehensive analytics dashboard</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2 relative overflow-hidden card-hover">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nayidisha-orange-300 to-nayidisha-orange"></div>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large businesses with high-volume hiring needs</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Unlimited job postings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>API access for integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Custom branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-nayidisha-blue shrink-0 mt-0.5" />
                      <span>Bulk hiring tools</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Hiring Dashboard Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Job Management",
                      description: "Create, edit, and manage all your job listings from a central dashboard."
                    },
                    {
                      title: "Candidate Tracking",
                      description: "Track applicants through each stage of the recruitment process."
                    },
                    {
                      title: "Applicant Rating",
                      description: "Rate and score candidates based on skills and experience."
                    },
                    {
                      title: "Team Collaboration",
                      description: "Share candidates with team members and collect feedback."
                    },
                    {
                      title: "Interview Scheduling",
                      description: "Schedule and manage interviews with automatic reminders."
                    },
                    {
                      title: "Candidate Communications",
                      description: "Send messages, emails, or SMS directly from the platform."
                    }
                  ].map((feature, index) => (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Recruitment Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "AI-Powered Matching",
                      description: "Our intelligent algorithm matches your job requirements with the most suitable candidates in our database."
                    },
                    {
                      title: "Bulk Hiring Tools",
                      description: "Efficiently manage large-scale recruitment drives with our bulk hiring tools and automated workflows."
                    },
                    {
                      title: "Skill Assessment",
                      description: "Evaluate candidates' skills with our built-in assessment tools or create custom tests."
                    },
                    {
                      title: "Reference Verification",
                      description: "Automated reference checks to verify work history and performance."
                    }
                  ].map((tool, index) => (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">{tool.title}</h4>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How quickly can I expect to receive applications?",
                  answer: "Most employers start receiving applications within 24 hours of posting a job. Our system matches your job requirements with suitable candidates and notifies them immediately."
                },
                {
                  question: "Can I post jobs for multiple locations?",
                  answer: "Yes, you can post jobs for multiple locations under a single employer account. Our platform allows you to specify different locations for each job posting."
                },
                {
                  question: "How do you verify worker skills?",
                  answer: "We use a combination of skill assessments, certification verification, and previous employer references to validate worker skills. Our verification process ensures that candidates possess the skills they claim."
                },
                {
                  question: "Do you offer any guarantees if a hired worker doesn't perform well?",
                  answer: "We offer a 7-day replacement guarantee with our Professional and Enterprise plans. If a hired worker doesn't meet your requirements within the first week, we'll help you find a replacement at no additional cost."
                },
                {
                  question: "Can I upgrade or downgrade my subscription plan?",
                  answer: "Yes, you can upgrade or downgrade your subscription plan at any time. Changes will take effect at the start of your next billing cycle."
                }
              ].map((faq, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-center mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${i+20}`} />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {i === 1 ? "Ananya Buildtech" : i === 2 ? "Reliable Plumbing Co." : "SmartTech Solutions"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? "Construction" : i === 2 ? "Plumbing Services" : "Electronics Manufacturing"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm">
                    {i === 1 
                      ? "NayiDisha has transformed our hiring process. We were able to hire 15 qualified electricians within a week for our new project." 
                      : i === 2 
                        ? "The quality of candidates we receive through NayiDisha is consistently high. We've reduced our time-to-hire by 60%."
                        : "We've been using NayiDisha for all our blue-collar staffing needs. The platform's AI matching has saved us countless hours in screening candidates."}
                  </p>
                  
                  <div className="mt-4 text-sm font-medium">
                    {i === 1 
                      ? "Hired: 15 Electricians" 
                      : i === 2 
                        ? "Hired: 8 Plumbers"
                        : "Hired: 12 Assembly Technicians"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Start Hiring?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of employers who trust NayiDisha for their blue-collar hiring needs.
            Get started today and find qualified workers for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Post a Job Now
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employers;
