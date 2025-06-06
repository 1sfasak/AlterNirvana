
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onOpenWizard: () => void;
}

const SearchBar = ({ onSearch, onOpenWizard }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Clean Search Container */}
        <div className="relative flex items-center gap-3 bg-card border border-border rounded-lg p-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for alternatives to any software..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-transparent border-0 focus:ring-0 subtle-focus"
            />
          </div>
          
          {/* Clean Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onOpenWizard}
              className="px-4 py-2"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Help
            </Button>
            
            <Button
              type="submit"
              size="sm"
              className="px-6 py-2"
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Simple Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {['Notion', 'VSCode', 'Photoshop', 'Discord'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              className="px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
