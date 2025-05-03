
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { cn } from '@/lib/utils';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-nayidisha-blue to-nayidisha-blue-700 rounded-md p-1 mr-1">
              <span className="text-white font-bold text-lg">ND</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">NayiDisha</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/jobs" active={isActive('/jobs')}>Job Listings</NavLink>
          <NavLink to="/skills" active={isActive('/skills')}>Skill Development</NavLink>
          <NavLink to="/employers" active={isActive('/employers')}>For Employers</NavLink>
          <NavLink to="/about" active={isActive('/about')}>About Us</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-nayidisha-orange rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User size={20} />
            </Link>
          </Button>
          <Button asChild className="hidden md:inline-flex btn-primary">
            <Link to="/auth">Login / Register</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-x-0 top-16 p-4 bg-background border-b md:hidden transition-all duration-300 ease-in-out",
        menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col space-y-2">
          <MobileNavLink to="/jobs" active={isActive('/jobs')} onClick={() => setMenuOpen(false)}>Job Listings</MobileNavLink>
          <MobileNavLink to="/skills" active={isActive('/skills')} onClick={() => setMenuOpen(false)}>Skill Development</MobileNavLink>
          <MobileNavLink to="/employers" active={isActive('/employers')} onClick={() => setMenuOpen(false)}>For Employers</MobileNavLink>
          <MobileNavLink to="/about" active={isActive('/about')} onClick={() => setMenuOpen(false)}>About Us</MobileNavLink>
          <Button asChild className="mt-2 w-full btn-primary">
            <Link to="/auth" onClick={() => setMenuOpen(false)}>Login / Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, active, onClick, children }: { to: string; active: boolean; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "px-4 py-3 rounded-md text-lg font-medium transition-colors block",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
};

export default Header;
