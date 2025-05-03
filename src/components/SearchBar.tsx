
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get('query') as string;
    const location = formData.get('location') as string;
    if (onSearch) onSearch(query, location);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            name="query"
            className="pl-10 bg-white dark:bg-muted"
            placeholder="Job title, skills, or keywords"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            name="location"
            className="pl-10 bg-white dark:bg-muted"
            placeholder="City, state, or area"
          />
        </div>
        <Button type="submit" className="btn-primary">
          Search Jobs
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
