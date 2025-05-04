
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  FileText, Download, Mic, Send, Plus, CheckCircle, Upload, Copy, FileEdit 
} from 'lucide-react';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: 'Rahul Singh',
      phone: '+91 98765 43210',
      email: 'rahul.singh@example.com',
      address: '123, Karol Bagh, New Delhi - 110005, India',
    },
    workExperience: [
      {
        title: 'Senior Electrician',
        company: 'ABC Electrical Services',
        location: 'New Delhi',
        startDate: '2020-03',
        endDate: 'present',
        description: 'Installing, maintaining, and repairing electrical systems in commercial buildings.'
      },
      {
        title: 'Electrician',
        company: 'XYZ Electrical Company',
        location: 'Gurgaon',
        startDate: '2017-06',
        endDate: '2020-02',
        description: 'Installation and servicing of electrical components and systems.'
      }
    ],
    education: [
      {
        institution: 'Industrial Training Institute',
        location: 'Delhi',
        degree: 'ITI Certification in Electrical',
        date: '2017'
      }
    ],
    skills: ['Electrical Wiring', 'Circuit Repair', 'Industrial Installation', 'Panel Board Installation']
  });

  const [resumeFormat, setResumeFormat] = useState('modern');
  const [resumeLanguage, setResumeLanguage] = useState('english');
  const [generationStatus, setGenerationStatus] = useState('idle'); // idle, generating, complete

  const handleInputChange = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value
      }
    });
  };

  const handleArrayInputChange = (section, index, field, value) => {
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setResumeData({
      ...resumeData,
      [section]: updatedArray
    });
  };

  const addNewItem = (section) => {
    if (section === 'workExperience') {
      setResumeData({
        ...resumeData,
        workExperience: [
          ...resumeData.workExperience,
          {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
          }
        ]
      });
    } else if (section === 'education') {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          {
            institution: '',
            location: '',
            degree: '',
            date: ''
          }
        ]
      });
    }
  };

  const handleSkillsChange = (skillsString) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData({
      ...resumeData,
      skills: skillsArray
    });
  };

  const generateResume = () => {
    setGenerationStatus('generating');
    
    // Simulate PDF generation process
    setTimeout(() => {
      setGenerationStatus('complete');
      toast({
        title: "Resume generated successfully!",
        description: "Your resume is ready to download or share.",
      });
    }, 2000);
  };

  const downloadResume = (format) => {
    toast({
      title: `Downloading resume as ${format.toUpperCase()}`,
      description: "Your file will be ready in a moment.",
    });
  };

  const sendToEmployer = () => {
    toast({
      title: "Resume shared successfully",
      description: "Your resume has been sent to potential employers based on your job preferences.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Smart Resume Builder
          </CardTitle>
          <CardDescription>
            Create professional resumes in multiple languages and formats
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Resume Content</TabsTrigger>
              <TabsTrigger value="format">Format & Language</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={resumeData.personalInfo.fullName} 
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input 
                      value={resumeData.personalInfo.phone} 
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      value={resumeData.personalInfo.email} 
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input 
                      value={resumeData.personalInfo.address} 
                      onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Work Experience */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Work Experience</h3>
                {resumeData.workExperience.map((job, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input 
                            value={job.title} 
                            onChange={(e) => handleArrayInputChange('workExperience', index, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input 
                            value={job.company} 
                            onChange={(e) => handleArrayInputChange('workExperience', index, 'company', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input 
                            value={job.location} 
                            onChange={(e) => handleArrayInputChange('workExperience', index, 'location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input 
                            type="month" 
                            value={job.startDate} 
                            onChange={(e) => handleArrayInputChange('workExperience', index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date (or "present")</Label>
                          <Input 
                            value={job.endDate} 
                            onChange={(e) => handleArrayInputChange('workExperience', index, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea 
                          value={job.description} 
                          onChange={(e) => handleArrayInputChange('workExperience', index, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" onClick={() => addNewItem('workExperience')} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                </Button>
              </div>
              
              {/* Education */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Education</h3>
                {resumeData.education.map((edu, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input 
                            value={edu.institution} 
                            onChange={(e) => handleArrayInputChange('education', index, 'institution', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input 
                            value={edu.location} 
                            onChange={(e) => handleArrayInputChange('education', index, 'location', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree/Certification</Label>
                          <Input 
                            value={edu.degree} 
                            onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input 
                            value={edu.date} 
                            onChange={(e) => handleArrayInputChange('education', index, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" onClick={() => addNewItem('education')} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>
              
              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Skills</h3>
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <div className="flex items-center gap-2">
                    <Textarea 
                      value={resumeData.skills.join(', ')} 
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      rows={2}
                      placeholder="e.g. Electrical Wiring, Circuit Repair, Panel Installation"
                    />
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="format" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Resume Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 transition-all ${resumeFormat === 'modern' ? 'border-primary bg-primary/5' : 'border-muted'}`}
                    onClick={() => setResumeFormat('modern')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-full h-32 flex items-center justify-center bg-primary/10 rounded-md mb-2">
                        <FileEdit className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-medium">Modern</h4>
                      <p className="text-xs text-muted-foreground">Clean, professional design with a sidebar</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 transition-all ${resumeFormat === 'classic' ? 'border-primary bg-primary/5' : 'border-muted'}`}
                    onClick={() => setResumeFormat('classic')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-full h-32 flex items-center justify-center bg-primary/10 rounded-md mb-2">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-medium">Classic</h4>
                      <p className="text-xs text-muted-foreground">Traditional format that employers are familiar with</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 transition-all ${resumeFormat === 'creative' ? 'border-primary bg-primary/5' : 'border-muted'}`}
                    onClick={() => setResumeFormat('creative')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-full h-32 flex items-center justify-center bg-primary/10 rounded-md mb-2">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-medium">Creative</h4>
                      <p className="text-xs text-muted-foreground">Stylish design with color accents</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['english', 'hindi', 'marathi', 'tamil'].map(language => (
                    <Card 
                      key={language}
                      className={`cursor-pointer border-2 transition-all ${resumeLanguage === language ? 'border-primary bg-primary/5' : 'border-muted'}`}
                      onClick={() => setResumeLanguage(language)}
                    >
                      <CardContent className="p-3 text-center">
                        <h4 className="font-medium capitalize">{language}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="rounded-md bg-muted/20 border-2 border-dashed border-muted p-8 flex flex-col items-center justify-center min-h-[500px]">
                {generationStatus === 'idle' ? (
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium mb-2">Generate your resume</h3>
                    <p className="text-muted-foreground mb-4">Click the button below to preview your resume</p>
                    <Button onClick={generateResume}>
                      Generate Resume
                    </Button>
                  </div>
                ) : generationStatus === 'generating' ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <h3 className="text-xl font-medium mb-2">Generating your resume...</h3>
                    <p className="text-muted-foreground">This may take a moment</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-medium mb-2">Resume ready!</h3>
                    <p className="text-muted-foreground mb-6">Your professional resume is generated in {resumeLanguage}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button onClick={() => downloadResume('pdf')} className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={() => downloadResume('docx')}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Word
                      </Button>
                      <Button variant="secondary" onClick={sendToEmployer}>
                        <Send className="h-4 w-4 mr-2" />
                        Send to Employers
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/20 flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Pro Tip:</span> Include your strongest skills near the top for better visibility
          </div>
          {generationStatus !== 'idle' && (
            <Button variant="outline" size="sm" onClick={() => setGenerationStatus('idle')}>
              Reset
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResumeBuilder;
