
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

const jobCategories = [
  "Plumbing", "Electrical", "Carpentry", "Masonry", 
  "Driving", "Housekeeping", "Security", "Cooking", "Tailoring"
];

const jobTypes = ["Full-time", "Part-time", "Contractual", "Gig work"];

const experienceLevels = ["No experience", "Entry-level", "Experienced", "Advanced"];

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
  className?: string;
  isMobile?: boolean;
}

const FilterSidebar = ({ onFilterChange, className, isMobile = false }: FilterSidebarProps) => {
  const [salaryRange, setSalaryRange] = useState<number[]>([5000, 50000]);

  const handleSalaryChange = (value: number[]) => {
    setSalaryRange(value);
    if (onFilterChange) {
      onFilterChange({ salaryRange: value });
    }
  };

  return (
    <div className={`${className} space-y-6 p-4 rounded-lg bg-white dark:bg-muted border`}>
      <div>
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        <Button 
          size="sm" 
          className="w-full mb-4"
        >
          Reset Filters
        </Button>
      </div>
      
      <Separator />
      
      <Accordion type="multiple" defaultValue={["category", "jobType", "experience", "salary"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Job Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {jobCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="jobType">
          <AccordionTrigger className="font-semibold">Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="experience">
          <AccordionTrigger className="font-semibold">Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={`level-${level}`} />
                  <Label htmlFor={`level-${level}`}>{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="salary">
          <AccordionTrigger className="font-semibold">Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="mt-6 px-2">
              <Slider 
                defaultValue={[5000, 50000]} 
                min={0} 
                max={100000} 
                step={1000}
                onValueChange={handleSalaryChange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>₹{salaryRange[0].toLocaleString()}</span>
                <span>₹{salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {isMobile && (
        <Button className="w-full btn-primary mt-4">Apply Filters</Button>
      )}
    </div>
  );
};

export default FilterSidebar;
