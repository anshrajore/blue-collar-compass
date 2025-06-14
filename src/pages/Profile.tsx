import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Check, 
  ChevronRight, 
  Edit, 
  MapPin, 
  Phone, 
  Plus, 
  Upload, 
  User, 
  X,
  Mail,
  Cake,
  Languages,
  Home,
  Smartphone,
  Camera,
  FileText,
  Download
} from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import FileUpload from '@/components/FileUpload';
import ProfileSkillSection from '@/components/profile/ProfileSkillSection';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileJobPreferences from '@/components/profile/ProfileJobPreferences';
import ProfileDocumentWallet from '@/components/profile/ProfileDocumentWallet';

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '',
    phone_number: profile?.phone_number || '',
    email: profile?.email || user?.email || '',
    profile_image: profile?.profile_image || ''
  });
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  
  const handleSaveProfile = async () => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone_number: profileData.phone_number,
          profile_image: profileData.profile_image
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      
      setProfileCompletion(Math.min(profileCompletion + 10, 100));
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const handleProfileImageUpload = (file: { url: string; path: string; name: string }) => {
    setProfileData(prev => ({ ...prev, profile_image: file.url }));
    toast({
      title: "Profile image uploaded",
      description: "Your profile image has been updated successfully.",
    });
  };

  const handleDocumentUpload = (file: { url: string; path: string; name: string }) => {
    setUploadedDocuments(prev => [...prev, file]);
    toast({
      title: "Document uploaded",
      description: `${file.name} has been uploaded to your profile.`,
    });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <ProfileCompletionBadge completion={profileCompletion} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="sticky top-20 border-2 border-muted">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {profileData.profile_image ? (
                      <img 
                        src={profileData.profile_image} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 flex items-center justify-center text-white text-3xl font-bold">
                        {profileData.full_name ? profileData.full_name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <FileUpload
                      onFileUploaded={handleProfileImageUpload}
                      acceptedTypes=".jpg,.jpeg,.png,.webp"
                      folder="profile-images"
                      className="absolute bottom-0 right-0"
                    >
                      <Button size="sm" className="h-6 w-6 p-0 rounded-full bg-nayidisha-blue">
                        <Camera className="h-3 w-3" />
                      </Button>
                    </FileUpload>
                  </div>
                </div>
                <CardTitle className="text-xl">{profileData.full_name || 'Your Name'}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <MapPin size={14} />
                  <span>New Delhi, India</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Profile Completion</p>
                    <div className="flex items-center gap-2">
                      <Progress value={profileCompletion} className="h-2" />
                      <span className="text-sm font-medium">{profileCompletion}%</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <span className="text-sm">{profileData.phone_number || 'Add phone number'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <span className="text-sm">{profile?.is_employer ? 'Employer' : 'Job Seeker'}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Quick Upload</p>
                    <div className="space-y-2">
                      <FileUpload
                        onFileUploaded={handleDocumentUpload}
                        acceptedTypes=".pdf,.doc,.docx"
                        folder="documents"
                      >
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Upload Resume
                        </Button>
                      </FileUpload>
                      
                      <FileUpload
                        onFileUploaded={handleDocumentUpload}
                        acceptedTypes=".pdf,.jpg,.jpeg,.png"
                        folder="certificates"
                      >
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Certificate
                        </Button>
                      </FileUpload>
                    </div>
                  </div>
                  
                  {uploadedDocuments.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recent Uploads</p>
                        {uploadedDocuments.slice(-3).map((doc, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="truncate">{doc.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Quick Links</p>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/saved-jobs">Saved Jobs</Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/applications">My Applications</Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/settings">Account Settings</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/saved-jobs">
                    View Saved Jobs <ChevronRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main profile content */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            <Card className="border-2 border-muted">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input 
                      id="fullName" 
                      value={profileData.full_name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone_number}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone_number: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail size={14} className="text-muted-foreground" />
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      value={profileData.email}
                      disabled={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone" className="flex items-center gap-2">
                      <Smartphone size={14} className="text-muted-foreground" />
                      Alternate Phone (Optional)
                    </Label>
                    <Input 
                      id="alternatePhone" 
                      placeholder="Enter alternate phone number" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Cake size={14} className="text-muted-foreground" />
                      Date of Birth
                    </Label>
                    <Input 
                      id="dob" 
                      type="date"
                      defaultValue="1990-05-15" 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User size={14} className="text-muted-foreground" />
                      Gender
                    </Label>
                    <Select disabled={!isEditing} defaultValue="male">
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Languages size={14} className="text-muted-foreground" />
                      Preferred Language
                    </Label>
                    <Select disabled={!isEditing} defaultValue="hindi">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="punjabi">Punjabi</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="gujarati">Gujarati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <Home size={14} className="text-muted-foreground" />
                    Address
                  </Label>
                  <Textarea 
                    id="address" 
                    defaultValue="123, Karol Bagh, New Delhi - 110005, India" 
                    disabled={!isEditing}
                    className="min-h-20"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Communication Preferences</h3>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">
                      Receive job alerts via SMS
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="emailNotifications" defaultChecked />
                    <Label htmlFor="emailNotifications">
                      Receive email notifications
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="whatsappNotifications" />
                    <Label htmlFor="whatsappNotifications">
                      Receive WhatsApp notifications
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <div className="hidden md:block">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Profile assessment completed",
                      description: "We've updated your job recommendations based on your profile."
                    })
                  }}>
                    <Check className="mr-1 h-4 w-4" /> Assess Profile
                  </Button>
                </div>
              </div>
              
              <TabsContent value="skills" className="mt-0">
                <ProfileSkillSection />
              </TabsContent>
              
              <TabsContent value="education" className="mt-0">
                <ProfileEducation />
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-0">
                <ProfileJobPreferences />
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <ProfileDocumentWallet />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ProfileCompletionBadge = ({ completion }: { completion: number }) => {
  let status = "Incomplete";
  let color = "bg-amber-500";
  
  if (completion >= 100) {
    status = "Complete";
    color = "bg-green-500";
  } else if (completion >= 70) {
    status = "Almost Complete";
    color = "bg-blue-500";
  } else if (completion >= 40) {
    status = "In Progress";
    color = "bg-amber-500";
  }
  
  return (
    <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-sm font-medium">{status}</span>
      <span className="text-sm text-muted-foreground">({completion}%)</span>
    </div>
  );
};

export default Profile;
