
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// India states with corresponding districts
const statesWithDistricts: { [key: string]: string[] } = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Nanded', 'Jalgaon'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Shimoga', 'Dharwad', 'Bijapur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'North West Delhi']
};

// Categories of blue collar jobs
const jobCategories = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Masonry',
  'Driving',
  'Housekeeping',
  'Security',
  'Cooking',
  'Tailoring',
  'Factory Work',
  'Construction',
  'Farming',
  'Delivery'
];

// Job types for blue collar workers
const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Daily Wages',
  'Weekly',
  'Monthly'
];

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  isMobile?: boolean;
}

const FilterSidebar = ({ onFilterChange, isMobile = false }: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 50000]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [experience, setExperience] = useState<number | null>(null);

  // Update available districts when state changes
  useEffect(() => {
    if (selectedState && statesWithDistricts[selectedState]) {
      setAvailableDistricts(statesWithDistricts[selectedState]);
      setSelectedDistrict(''); // Reset district when state changes
    } else {
      setAvailableDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedState]);

  // Apply all filters
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      jobTypes: selectedJobTypes.length > 0 ? selectedJobTypes : undefined,
      salaryRange: salaryRange[0] > 0 || salaryRange[1] < 50000 ? salaryRange : undefined,
      state: selectedState || undefined,
      district: selectedDistrict || undefined,
      experience: experience || undefined
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedJobTypes([]);
    setSalaryRange([0, 50000]);
    setSelectedState('');
    setSelectedDistrict('');
    setExperience(null);
    
    // Inform parent component about the reset
    onFilterChange({});
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(c => c !== category)
        : [...prevSelected, category]
    );
  };

  // Toggle job type selection
  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prevSelected =>
      prevSelected.includes(type)
        ? prevSelected.filter(t => t !== type)
        : [...prevSelected, type]
    );
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'p-6' : ''}`}>
      <div>
        <h3 className="font-semibold mb-3">Job Categories</h3>
        <div className="space-y-2">
          {jobCategories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label 
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map(type => (
            <div key={type} className="flex items-center">
              <Checkbox 
                id={`type-${type}`}
                checked={selectedJobTypes.includes(type)}
                onCheckedChange={() => toggleJobType(type)}
              />
              <label 
                htmlFor={`type-${type}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Select
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(statesWithDistricts).map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="district">District</Label>
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
              disabled={!selectedState || availableDistricts.length === 0}
            >
              <SelectTrigger id="district">
                <SelectValue placeholder={selectedState ? "Select district" : "First select a state"} />
              </SelectTrigger>
              <SelectContent>
                {availableDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Salary Range</h3>
        <div className="space-y-3">
          <Slider
            value={salaryRange}
            min={0}
            max={50000}
            step={1000}
            onValueChange={setSalaryRange}
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">₹{salaryRange[0].toLocaleString()}</span>
            <ArrowRight className="h-4 w-4 mx-2" />
            <span className="text-sm">₹{salaryRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Experience (Years)</h3>
        <div className="space-y-2">
          <Input 
            type="number" 
            placeholder="Years of experience" 
            min="0"
            value={experience || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              setExperience(value);
            }}
          />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col space-y-2">
        <Button onClick={applyFilters} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
