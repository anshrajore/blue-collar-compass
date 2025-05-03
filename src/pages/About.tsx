
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight, ExternalLink, MapPin, PhoneCall, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="flex-1">
              <Badge className="mb-4 bg-nayidisha-blue/10 text-nayidisha-blue border-none">About Us</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Connecting Blue Collar Workers with Better Opportunities
              </h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                NayiDisha is on a mission to transform the blue-collar job market in India by connecting skilled workers 
                with quality employment opportunities. We're bridging the gap between job seekers and employers using 
                technology, making the hiring process efficient, transparent, and accessible to all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Our Story
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                    alt="Workers discussing at construction site" 
                    className="w-full rounded-lg object-cover h-64 md:h-80"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-nayidisha-orange-100 rounded-lg -z-10"></div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-nayidisha-blue-100 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Mission & Vision */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-2">Our Purpose</Badge>
            <h2 className="text-3xl font-bold mb-4">Mission & Vision</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              We're focused on creating a more equitable job market for blue-collar workers across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-nayidisha-blue-50/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="mb-4 p-2 bg-white rounded-md inline-block">
                  <svg className="h-8 w-8 text-nayidisha-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To empower blue-collar workers with access to better job opportunities, fair wages,
                  and skill development resources while providing employers with a reliable source of verified talent.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-blue" />
                    <span>Connect workers to dignified employment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-blue" />
                    <span>Ensure fair wages and safe working conditions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-blue" />
                    <span>Promote skill development and career growth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-nayidisha-orange-50/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="mb-4 p-2 bg-white rounded-md inline-block">
                  <svg className="h-8 w-8 text-nayidisha-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground mb-6">
                  To create a future where every blue-collar worker in India has access to dignified employment,
                  growth opportunities, and social security through a transparent and accessible digital platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-orange" />
                    <span>Build India's largest blue-collar work marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-orange" />
                    <span>Create economic opportunities for 10 million workers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-nayidisha-orange" />
                    <span>Formalize the informal labor market through technology</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Key Stats */}
        <div className="mb-20 bg-muted/30 py-12 px-6 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="text-muted-foreground mt-2">
              Growing steadily to serve blue-collar workers across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "50,000+", label: "Registered Workers" },
              { value: "2,500+", label: "Partner Employers" },
              { value: "30,000+", label: "Jobs Filled" },
              { value: "25+", label: "Cities Covered" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-nayidisha-blue mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-2">Leadership</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              We're a dedicated team of professionals who are passionate about creating economic 
              opportunities for blue-collar workers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Anita Sharma", 
                title: "Co-founder & CEO",
                bio: "Former Head of Operations at Urban Company with 12+ years of experience in workforce management.",
                image: "https://i.pravatar.cc/300?img=25"
              },
              { 
                name: "Rajesh Mehta", 
                title: "Co-founder & CTO",
                bio: "Ex-Amazon tech leader with deep expertise in building scalable platforms for emerging markets.",
                image: "https://i.pravatar.cc/300?img=53" 
              },
              { 
                name: "Priya Desai", 
                title: "Head of Employer Relations",
                bio: "10+ years in B2B sales and account management for enterprise workforce solutions.",
                image: "https://i.pravatar.cc/300?img=5" 
              }
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden card-hover">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-nayidisha-blue text-sm mb-3">{member.title}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="mt-4">
              View Full Team
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Our Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-2">Collaborators</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              We work with leading organizations across industries to create opportunities for blue-collar workers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center justify-center p-4">
                <div className="bg-muted/30 h-20 w-full rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">Partner Logo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recognition */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-2">Recognition</Badge>
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Our work has been recognized by leading organizations and media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Winner - NASSCOM Social Innovation Award 2022",
              "Featured in Economic Times as 'Top 10 Startups to Watch'", 
              "Ministry of Skill Development & Entrepreneurship Partner"
            ].map((award, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="h-12 w-12 rounded-full bg-nayidisha-blue/10 flex items-center justify-center">
                    <svg className="h-6 w-6 text-nayidisha-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="font-medium">{award}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-lg overflow-hidden">
          <div className="px-6 py-12 md:px-12 md:py-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Join Us in Our Mission
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Whether you're a job seeker looking for opportunities, an employer seeking talent,
                or a partner who shares our vision, we'd love to connect with you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-nayidisha-blue hover:bg-white/90" size="lg" asChild>
                  <Link to="/contact">
                    <Send className="mr-2 h-4 w-4" /> Contact Us
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-nayidisha-blue" size="lg">
                  <PhoneCall className="mr-2 h-4 w-4" /> Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Office Locations */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <Badge className="mb-2">Locations</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Find us across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                city: "Delhi",
                address: "Plot 15, Sector 5, Noida, Delhi NCR - 201301",
                phone: "+91 11 4567 8901"
              },
              {
                city: "Mumbai",
                address: "42 Andheri Industrial Estate, Andheri East, Mumbai - 400069",
                phone: "+91 22 2789 0123"
              },
              {
                city: "Bengaluru",
                address: "91 Residency Road, Richmond Town, Bengaluru - 560025",
                phone: "+91 80 3456 7890"
              }
            ].map((office, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-nayidisha-blue mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-2">{office.city}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{office.address}</p>
                      <p className="flex items-center text-sm">
                        <PhoneCall className="h-4 w-4 mr-2 text-muted-foreground" />
                        {office.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
