
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Check, ArrowRight, Smartphone } from 'lucide-react';
import Layout from '@/components/Layout';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginStep, setLoginStep] = useState(1);
  const [registerStep, setRegisterStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  
  // For registration
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleSendOTP = () => {
    // In a real app, this would call an API to send OTP
    setOtpSent(true);
    // Simulate OTP sent
    setTimeout(() => {
      console.log("OTP sent to", phoneNumber);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    // In a real app, this would validate OTP via API
    if (otp.length === 6) {
      setOtpVerified(true);
      if (activeTab === 'login') {
        setLoginStep(2);
      } else {
        setRegisterStep(2);
      }
    }
  };

  const handleLogin = () => {
    // In a real app, this would complete login process
    console.log("User logged in");
    // Redirect to profile/dashboard
  };

  const handleRegister = () => {
    // In a real app, this would complete registration
    console.log("User registered:", { name, phoneNumber, gender, age });
    // Redirect to profile setup or dashboard
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to NayiDisha</h1>
            <p className="text-muted-foreground">Find the perfect job for your skills</p>
          </div>

          <Tabs 
            defaultValue="login" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your phone number to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loginStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                          <div className="bg-muted flex items-center px-3 rounded-md">
                            +91
                          </div>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="Enter your 10-digit number" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      {otpSent && (
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input 
                            id="otp" 
                            type="text" 
                            placeholder="Enter 6-digit OTP" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className="letter-spacing-wide"
                          />
                          <div className="text-right">
                            <Button variant="link" size="sm" onClick={handleSendOTP}>
                              Resend OTP
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {!otpSent ? (
                          <Button onClick={handleSendOTP} className="w-full">
                            Send OTP
                          </Button>
                        ) : !otpVerified ? (
                          <Button onClick={handleVerifyOTP} className="w-full">
                            Verify OTP
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5 mr-2" />
                            OTP Verified
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {loginStep === 2 && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Login Successful!</h3>
                      <p className="text-muted-foreground mb-4">
                        Welcome back to NayiDisha
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/profile">Go to Profile</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    {registerStep === 1 ? 
                      "Enter your phone number to get started" :
                      "Tell us a bit about yourself"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {registerStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone-reg">Phone Number</Label>
                        <div className="flex gap-2">
                          <div className="bg-muted flex items-center px-3 rounded-md">
                            +91
                          </div>
                          <Input 
                            id="phone-reg" 
                            type="tel" 
                            placeholder="Enter your 10-digit number" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      {otpSent && (
                        <div className="space-y-2">
                          <Label htmlFor="otp-reg">Enter OTP</Label>
                          <Input 
                            id="otp-reg" 
                            type="text" 
                            placeholder="Enter 6-digit OTP" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className="letter-spacing-wide"
                          />
                          <div className="text-right">
                            <Button variant="link" size="sm" onClick={handleSendOTP}>
                              Resend OTP
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {!otpSent ? (
                          <Button onClick={handleSendOTP} className="w-full">
                            Send OTP
                          </Button>
                        ) : !otpVerified ? (
                          <Button onClick={handleVerifyOTP} className="w-full">
                            Verify OTP
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5 mr-2" />
                            OTP Verified
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {registerStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter your full name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select 
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age" 
                            type="number" 
                            placeholder="Your age" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="18"
                            max="70"
                          />
                        </div>
                      </div>

                      <Button onClick={handleRegister} className="w-full mt-2">
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <div className="text-sm text-muted-foreground text-center">
                    By creating an account, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <div className="text-sm text-muted-foreground">
              Having trouble logging in? <Link to="/help" className="underline">Get help</Link>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>Need help?</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
