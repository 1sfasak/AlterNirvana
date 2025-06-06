
import React, { useState } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Main Search Container */}
        <div className="glass-strong rounded-2xl p-1 search-glow">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Find alternatives to any software, app, or service..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-transparent border-0 focus:ring-0 placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 pr-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onOpenWizard}
                className="glass rounded-lg px-4 py-2 hover:neon-glow transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Wizard
              </Button>
              
              <Button
                type="submit"
                className="neon-border bg-primary/10 hover:bg-primary/20 px-6 py-2 rounded-lg transition-all duration-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {['Notion alternatives', 'VSCode alternatives', 'Photoshop alternatives', 'Discord alternatives'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion.replace(' alternatives', ''));
                onSearch(suggestion.replace(' alternatives', ''));
              }}
              className="px-3 py-1 text-sm glass rounded-full hover:neon-glow transition-all duration-300 text-muted-foreground hover:text-foreground"
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
