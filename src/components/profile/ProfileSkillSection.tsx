
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Plus, X, Mic, Check, Award, CheckCircle, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const skills = [
  "Electrical Wiring", "Circuit Repair", "Industrial Installation", "Household Wiring", 
  "Panel Board Installation", "Switchgear Maintenance", "Transformer Installation",
  "Motor Control", "Lighting Systems", "Electronic Repairs"
];

const ProfileSkillSection = () => {
  const [userSkills, setUserSkills] = useState(['Electrical Wiring', 'Circuit Repair', 'Industrial Installation']);
  const [newSkill, setNewSkill] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('skills'); // 'skills', 'certifications'
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  
  // Sample certification test data
  const [certifications] = useState([
    { 
      id: 1, 
      name: 'Basic Electrical Safety', 
      provider: 'NSDC', 
      status: 'completed', 
      score: 92,
      date: '2023-12-15',
      badge: 'gold'
    },
    { 
      id: 2, 
      name: 'Wiring Fundamentals', 
      provider: 'Skill India', 
      status: 'completed', 
      score: 78,
      date: '2023-11-02',
      badge: 'silver'
    },
    { 
      id: 3, 
      name: 'Industrial Electrical Applications', 
      provider: 'Skill India', 
      status: 'available', 
      score: null,
      date: null,
      badge: null
    },
  ]);
  
  // Sample test questions
  const [skillTest] = useState({
    skill: "Industrial Electrical Applications",
    questions: [
      {
        question: "Which of the following is NOT a common industrial circuit breaker type?",
        options: ["MCCB", "ACB", "FCB", "ELCB"],
        correctAnswer: 2
      },
      {
        question: "What is the typical voltage range for a medium voltage industrial system?",
        options: ["Less than 1000V", "1000V to 15kV", "15kV to 35kV", "Above 35kV"],
        correctAnswer: 1
      },
      {
        question: "What does VFD stand for in industrial electrical systems?",
        options: ["Variable Frequency Drive", "Voltage Field Detector", "Virtual Function Display", "Verified Flow Device"],
        correctAnswer: 0
      },
      {
        question: "Which motor type is most commonly used in industrial applications requiring precise speed control?",
        options: ["Single-phase induction motors", "Three-phase induction motors", "Synchronous motors", "Servo motors"],
        correctAnswer: 3
      },
      {
        question: "What is the purpose of a soft starter in an industrial electrical system?",
        options: ["To increase motor speed", "To reduce motor starting current", "To convert AC to DC", "To increase voltage stability"],
        correctAnswer: 1
      }
    ]
  });

  const addSkill = () => {
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill('');
      toast({
        description: "Skill added successfully!"
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setUserSkills([...userSkills, "Lighting Systems"]);
      toast({
        title: "Voice input processed",
        description: "Added 'Lighting Systems' to your skills."
      });
    }, 2000);
  };
  
  const startTest = () => {
    setIsTestActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };
  
  const selectAnswer = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    
    // Move to next question or finish test
    if (currentQuestion < skillTest.questions.length - 1) {
      // Small delay to show selection
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 700);
    } else {
      // Complete the test
      setTimeout(() => {
        completeTest();
      }, 1000);
    }
  };
  
  const completeTest = () => {
    // Calculate score
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === skillTest.questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / skillTest.questions.length) * 100);
    
    // Update certification status
    const updatedCertifications = certifications.map(cert => 
      cert.id === 3 
        ? { 
            ...cert, 
            status: 'completed', 
            score, 
            date: new Date().toISOString().split('T')[0],
            badge: score >= 80 ? 'gold' : score >= 70 ? 'silver' : 'bronze'
          }
        : cert
    );
    
    // In a real app, we would save this to the database
    
    toast({
      title: "Test completed!",
      description: `You scored ${score}% on ${skillTest.skill}`,
    });
    
    // Reset test state
    setIsTestActive(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-3">
          <Button 
            variant={activeTab === 'skills' ? "default" : "outline"}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </Button>
          <Button 
            variant={activeTab === 'certifications' ? "default" : "outline"}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </Button>
        </div>
      </div>
      
      {activeTab === 'skills' ? (
        <>
          <Card className="border-2 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Skills</CardTitle>
              <CardDescription>Add your core skills and competencies</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {userSkills.map(skill => (
                    <Badge key={skill} className="px-3 py-1 flex items-center gap-1">
                      {skill}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Type a skill to add"
                      list="skill-suggestions"
                    />
                    <datalist id="skill-suggestions">
                      {skills.filter(skill => !userSkills.includes(skill)).map(skill => (
                        <option key={skill} value={skill} />
                      ))}
                    </datalist>
                  </div>
                  <Button onClick={addSkill}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleVoiceInput}
                    className={isRecording ? "animate-pulse bg-red-50" : ""}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Work Experience</CardTitle>
              <CardDescription>Add your relevant work experience</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md border-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-md">Senior Electrician</h3>
                      <p className="text-sm text-muted-foreground">ABC Electrical Services</p>
                    </div>
                    <Badge variant="outline">Current</Badge>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <span>March 2020 - Present</span>
                    <span className="mx-2">•</span>
                    <span>3 years, 2 months</span>
                  </div>
                  <p className="mt-3 text-sm">
                    Responsible for installing, maintaining, and repairing electrical systems and equipment in both residential and commercial buildings. Led a team of 3 junior electricians.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md border-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-md">Electrician</h3>
                      <p className="text-sm text-muted-foreground">XYZ Electrical Company</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <span>June 2017 - February 2020</span>
                    <span className="mx-2">•</span>
                    <span>2 years, 8 months</span>
                  </div>
                  <p className="mt-3 text-sm">
                    Installed and maintained electrical systems in residential buildings. Ensured all work complied with local electrical codes and safety standards.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Another Experience
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">About Me</CardTitle>
              <CardDescription>Write a brief summary about yourself</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Tell employers about yourself, your skills, and experience."
                  className="min-h-[120px]"
                  defaultValue="Skilled electrician with 5+ years of experience in residential and commercial electrical work. Strong knowledge of electrical codes and safety standards. Experienced in troubleshooting complex electrical issues and leading small teams of electricians."
                />
                
                <div className="flex items-start gap-2 bg-muted/40 rounded-md p-3">
                  <Check className="h-5 w-5 text-nayidisha-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Pro tip:</span> Include your years of experience, key skills, and what makes you stand out as a candidate.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="ml-auto"
                onClick={() => {
                  toast({
                    title: "Summary saved",
                    description: "Your profile summary has been updated."
                  });
                }}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : isTestActive ? (
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              {skillTest.skill} Certification Test
            </CardTitle>
            <CardDescription>Question {currentQuestion + 1} of {skillTest.questions.length}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Progress value={(currentQuestion + 1) / skillTest.questions.length * 100} className="h-2" />
            
            <div className="py-2">
              <h3 className="text-lg font-medium mb-4">{skillTest.questions[currentQuestion].question}</h3>
              
              <div className="space-y-3">
                {skillTest.questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion] === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => selectAnswer(index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                        selectedAnswers[currentQuestion] === index 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20">
            <div className="text-sm text-muted-foreground">
              Answer all questions to complete the certification
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Micro-Certifications
            </CardTitle>
            <CardDescription>Verify your skills to stand out to employers</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {certifications.map(cert => (
                <div key={cert.id} className="p-4 border rounded-md border-muted">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{cert.name}</h3>
                        {cert.badge && (
                          <Badge 
                            variant="outline" 
                            className={`${
                              cert.badge === 'gold' 
                                ? 'bg-amber-100 text-amber-800 border-amber-300' 
                                : cert.badge === 'silver' 
                                  ? 'bg-gray-100 text-gray-800 border-gray-300' 
                                  : 'bg-orange-100 text-orange-800 border-orange-300'
                            }`}
                          >
                            <Award className="h-3 w-3 mr-1" />
                            {cert.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Provider: {cert.provider}
                      </p>
                    </div>
                    
                    {cert.status === 'completed' ? (
                      <div className="text-right">
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Certified</span>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${
                                cert.score && star <= Math.ceil(cert.score / 20) 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" onClick={startTest}>
                        Take Test
                      </Button>
                    )}
                  </div>
                  
                  {cert.status === 'completed' && (
                    <div className="mt-3 text-sm flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Completed on {cert.date}
                      </span>
                      <span className="font-medium">
                        Score: {cert.score}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Why get certified?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>3X more likely to get interview calls</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Prove your skills with recognized credentials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Show up higher in employer searches</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileSkillSection;
