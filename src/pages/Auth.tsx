
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Layout from '@/components/Layout';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Calendar,
  MapPin,
  Briefcase,
  Bookmark,
  AlertCircle
} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional()
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  })
});

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      terms: false,
    },
  });

  const handleLogin = (data) => {
    setLoading(true);

    // Simulating login request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to NayiDisha",
      });
      navigate('/profile');
    }, 1500);
  };

  const handleRegister = (data) => {
    setLoading(true);

    // Simulating registration and OTP verification
    setTimeout(() => {
      setLoading(false);
      // Show OTP verification screen
      setVerifyOTP(true);
    }, 1500);
  };
  
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    // Only allow numbers and limit to 1 character
    if (value.match(/^[0-9]?$/) !== null) {
      const newOtp = [...otpValue];
      newOtp[index] = value;
      setOtpValue(newOtp);
      
      // Auto-focus next input if value is entered
      if (value !== '' && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };
  
  const verifyOtpCode = () => {
    // Check if OTP is complete
    if (otpValue.join('').length === 4) {
      setLoading(true);
      
      // Simulating OTP verification
      setTimeout(() => {
        setLoading(false);
        setVerifyOTP(false);
        setShowRegisterSuccess(true);
        
        // After showing success message, redirect to profile
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }, 1500);
    } else {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the complete 4-digit OTP.",
        variant: "destructive"
      });
    }
  };

  const resendOtp = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone."
    });
  };

  if (showRegisterSuccess) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 md:px-0 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md border-2 border-muted shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">Registration Successful!</CardTitle>
              <CardDescription>Your account has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2 pb-6">
              <p>You will be redirected to your profile in a few seconds.</p>
              <p className="text-muted-foreground">Feel free to complete your profile to get personalized job recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (verifyOTP) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4 md:px-0">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-muted shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-nayidisha-blue">Verify Your Number</CardTitle>
                <CardDescription>We've sent a verification code to your phone</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center mb-2">
                  <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to</p>
                  <p className="font-medium">+91 ••••• •7890</p>
                </div>
                
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <Input
                      key={i}
                      id={`otp-${i}`}
                      className="w-12 h-12 text-center text-lg font-bold"
                      value={otpValue[i]}
                      onChange={(e) => handleOtpChange(e, i)}
                      maxLength={1}
                      inputMode="numeric"
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    className="text-sm"
                    onClick={resendOtp}
                  >
                    Didn't receive the code? Resend
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full"
                  onClick={verifyOtpCode}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setVerifyOTP(false)}
                >
                  Go Back
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 md:px-0">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-muted shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-nayidisha-blue">Welcome to NayiDisha</CardTitle>
              <CardDescription>Your new direction for finding the perfect job</CardDescription>
            </CardHeader>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 mx-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email or Phone</FormLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="Enter your email or phone"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel>Password</FormLabel>
                              <Link to="/forgot-password" className="text-xs text-nayidisha-blue hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter your password"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="remember"
                              />
                            </FormControl>
                            <Label
                              htmlFor="remember"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </Label>
                          </FormItem>
                        )}
                      />
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                      
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 512 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48c27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 488 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 384 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                          </svg>
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  className="pl-10"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="Enter your phone number"
                                  className="pl-10"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <div className="text-xs text-muted-foreground mt-1">
                                We'll send a verification code to this number
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a password"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="text-xs flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${field.value.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span>Min. 8 characters</span>
                              </div>
                              <div className="text-xs flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(field.value) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span>1 uppercase</span>
                              </div>
                              <div className="text-xs flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(field.value) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span>1 number</span>
                              </div>
                              <div className="text-xs flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(field.value) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span>1 special character</span>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-2 mt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="terms"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <Label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none"
                              >
                                I agree to the{" "}
                                <Link to="/terms" className="text-nayidisha-blue hover:underline">
                                  terms and conditions
                                </Link>
                              </Label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                      <div className="text-sm text-center text-muted-foreground px-4">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        By registering, you agree to receive job notifications via SMS and email
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Create Account"}
                      </Button>

                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or register with
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 512 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48c27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 488 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" type="button" className="h-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 384 512"
                            className="h-4 w-4"
                          >
                            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                          </svg>
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>

            <div className="p-6 pt-0 text-center text-sm text-muted-foreground">
              <p>
                Need help? <Link to="/contact" className="text-nayidisha-blue hover:underline">Contact support</Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
