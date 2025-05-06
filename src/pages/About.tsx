import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HeartHandshake, 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Calendar, 
  Map, 
  Building, 
  GraduationCap, 
  Phone
} from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nayidisha-blue-50 to-nayidisha-blue-100 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-nayidisha-blue">About NayiDisha</h1>
            <p className="text-lg mb-8">
              We're on a mission to transform the blue-collar job market in India by connecting skilled workers 
              with quality employment opportunities through innovative technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
                Our Story
              </Button>
              <Button variant="outline">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-nayidisha-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-nayidisha-blue" />
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              To create a transparent, accessible, and efficient ecosystem that empowers blue-collar workers 
              to find dignified employment while helping businesses find reliable talent.
            </p>
            <ul className="space-y-2 pl-5">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-blue-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-blue" />
                </div>
                <span>Connect skilled workers with quality employment opportunities</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-blue-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-blue" />
                </div>
                <span>Reduce inefficiencies in the traditional hiring processes</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-blue-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-blue" />
                </div>
                <span>Promote skill development and career growth</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-nayidisha-orange-100 rounded-lg">
              <HeartHandshake className="h-6 w-6 text-nayidisha-orange" />
            </div>
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="text-muted-foreground">
              To become India's most trusted platform for blue-collar employment, creating economic opportunities 
              and improving the livelihood of millions of workers across the nation.
            </p>
            <ul className="space-y-2 pl-5">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-orange-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-orange" />
                </div>
                <span>Transform the blue-collar employment landscape in India</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-orange-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-orange" />
                </div>
                <span>Foster dignity and respect for essential workers</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-nayidisha-orange-100 rounded-full p-1">
                  <Lightbulb className="h-3 w-3 text-nayidisha-orange" />
                </div>
                <span>Create a more inclusive and equitable job market</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              NayiDisha was born from a simple observation: despite millions of skilled workers in India,
              both job seekers and employers struggle to connect efficiently.
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-nayidisha-blue-300"></div>
            
            <div className="space-y-12">
              <TimelineItem 
                year="2019"
                title="The Beginning"
                description="NayiDisha started as a small team with a big vision. We began by conducting extensive research on the challenges faced by blue-collar workers in finding stable employment."
                align="left"
              />
              
              <TimelineItem 
                year="2020"
                title="First Prototype"
                description="We launched our first prototype in three cities, connecting electricians and plumbers with local businesses. The response exceeded our expectations."
                align="right"
              />
              
              <TimelineItem 
                year="2021"
                title="Scaling Up"
                description="Secured seed funding to expand our operations. Added more job categories and extended our reach to 10 major cities across India."
                align="left"
              />
              
              <TimelineItem 
                year="2022"
                title="Technology Innovation"
                description="Introduced AI-powered matching algorithms and voice interfaces to make our platform more accessible to workers with varying levels of digital literacy."
                align="right"
              />
              
              <TimelineItem 
                year="2023"
                title="Present Day"
                description="Today, NayiDisha serves over 100,000 workers and 5,000 businesses across India, with a comprehensive platform that includes skill development, job matching, and career support."
                align="left"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals driving our mission to transform blue-collar employment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <TeamMember 
            name="Ansh Rajore"
            role="Founder & CEO"
            bio="Former HR executive with 15+ years of experience in workforce management."
          />
          <TeamMember 
            name="Tanvi Diwakar"
            role="Chief Technology Officer"
            bio="Tech entrepreneur with expertise in AI and mobile platform development."
          />
          <TeamMember 
            name="Nikhil Patil"
            role="Head of Operations"
            bio="Operations expert who previously managed large-scale manufacturing workforce."
          />
          <TeamMember 
            name="Neha Patil"
            role="Chief Impact Officer"
            bio="Social entrepreneur focused on creating sustainable employment opportunities."
          />
          <TeamMember 
            name="Darshan"
            role="Director of Partnerships"
            bio="Building strategic relationships with employers, NGOs and government agencies."
          />
          <TeamMember 
            name="Vedant Lokhande"
            role="Head of Skill Development"
            bio="Education specialist with a passion for vocational training and upskilling."
          />
          <TeamMember 
            name="Ashish Gaikawad"
            role="Chief Financial Officer"
            bio="Financial strategist with experience in scaling social impact ventures."
          />
          <TeamMember 
            name="Pratamesh Tiwari"
            role="Director of Marketing"
            bio="Expert in reaching diverse audiences through innovative marketing strategies."
          />
        </div>
      </div>

      {/* Impact */}
      <div className="bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 py-16">
        <div className="container px-4 md:px-6 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We measure our success by the positive change we create in the lives of workers and businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <ImpactStat number="100,000+" label="Workers Registered" />
            <ImpactStat number="5,000+" label="Businesses Served" />
            <ImpactStat number="75,000+" label="Jobs Filled" />
            <ImpactStat number="20+" label="Cities Covered" />
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We collaborate with organizations that share our vision of creating a better future for blue-collar workers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <PartnerLogo name="National Skill Development Corporation" />
          <PartnerLogo name="Skill India" />
          <PartnerLogo name="Ministry of Labor" />
          <PartnerLogo name="Construction Workers Association" />
          <PartnerLogo name="Industrial Training Institutes" />
          <PartnerLogo name="Chamber of Commerce" />
          <PartnerLogo name="Technical Education Board" />
          <PartnerLogo name="Urban Employment Initiative" />
          <PartnerLogo name="Rural Development Trust" />
          <PartnerLogo name="Vocational Training Centers" />
        </div>
      </div>

      {/* Contact */}
      <div className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about NayiDisha? We'd love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-5 w-5 mr-3 text-nayidisha-blue mt-1" />
                  <div>
                    <h3 className="font-medium">Headquarters</h3>
                    <address className="not-italic text-muted-foreground">
                      123 Innovation Park, Sector 62<br />
                      Noida, Uttar Pradesh 201301<br />
                      India
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-nayidisha-blue mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Map className="h-5 w-5 mr-3 text-nayidisha-blue mt-1" />
                  <div>
                    <h3 className="font-medium">Regional Offices</h3>
                    <p className="text-muted-foreground">Mumbai, Bangalore, Chennai, Delhi</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-muted rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="p-2 bg-muted rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="p-2 bg-muted rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="p-2 bg-muted rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.340781089812!2d77.3656921!3d28.627949099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzQwLjYiTiA3N8KwMjEnNTYuNSJF!5e0!3m2!1sen!2sin!4v1619414443744!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="NayiDisha Office Location"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the NayiDisha Family</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented individuals who are passionate about creating social impact.
            Explore current opportunities to join our team.
          </p>
          <Button className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
            View Career Opportunities
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const TimelineItem = ({ year, title, description, align }) => {
  return (
    <div className={`flex flex-col md:flex-row ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/2">
        <div className={`md:mx-12 ${align === 'right' ? 'md:text-right' : ''}`}>
          <div className="inline-block bg-nayidisha-blue-700 text-white px-4 py-2 rounded mb-2">
            {year}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <div className="w-6 h-6 bg-nayidisha-blue rounded-full border-4 border-nayidisha-blue-100"></div>
      </div>
    </div>
  );
};

const TeamMember = ({ name, role, bio }) => {
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-nayidisha-blue-500 to-nayidisha-blue-700 h-32 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white text-nayidisha-blue flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-nayidisha-blue mb-2">{role}</p>
          <p className="text-sm text-muted-foreground">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ImpactStat = ({ number, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
      <div className="text-sm md:text-base opacity-80">{label}</div>
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
      <div className="w-20 h-20 rounded-full bg-muted/50 border border-muted-foreground/20 flex items-center justify-center mb-2">
        <span className="text-xl font-bold text-muted-foreground">{initials}</span>
      </div>
      <span className="text-xs text-center text-muted-foreground">{name}</span>
    </div>
  );
};

export default About;
