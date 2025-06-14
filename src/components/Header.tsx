
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, Settings, LogOut, Plus, Briefcase, Bell } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import NotificationSystem from '@/components/NotificationSystem';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-nayidisha-blue text-white px-3 py-2 rounded-lg font-bold text-xl">
              NayiDisha
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-nayidisha-blue transition-colors">
              Find Jobs
            </Link>
            <Link to="/employers" className="text-gray-700 hover:text-nayidisha-blue transition-colors">
              For Employers
            </Link>
            <Link to="/skill-development" className="text-gray-700 hover:text-nayidisha-blue transition-colors">
              Skill Development
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-nayidisha-blue transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <NotificationSystem />
                
                {profile?.is_employer && (
                  <Button variant="outline" asChild>
                    <Link to="/post-job">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Link>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.profile_image} alt={profile?.full_name} />
                        <AvatarFallback>
                          {profile?.full_name 
                            ? profile.full_name.charAt(0).toUpperCase() 
                            : user.email?.charAt(0).toUpperCase()
                          }
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && <NotificationSystem />}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-nayidisha-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-nayidisha-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/employers"
                className="text-gray-700 hover:text-nayidisha-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Employers
              </Link>
              <Link
                to="/skill-development"
                className="text-gray-700 hover:text-nayidisha-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Skill Development
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-nayidisha-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-3 border-t">
                {user ? (
                  <div className="space-y-3">
                    {profile?.is_employer && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/post-job" onClick={() => setIsMenuOpen(false)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Post Job
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full bg-nayidisha-blue hover:bg-nayidisha-blue-600" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="pt-3 border-t">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
