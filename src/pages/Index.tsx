import React, { useState } from 'react';
import { Filter, Grid, List, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import AlternativeCard from '@/components/AlternativeCard';
import FilterSidebar from '@/components/FilterSidebar';
import Navigation from '@/components/Navigation';
import NewsPreview from '@/components/NewsPreview';
import EnvironmentPreview from '@/components/EnvironmentPreview';
import PsychologyPreview from '@/components/PsychologyPreview';
import MythsFactsPreview from '@/components/MythsFactsPreview';

// Mock data - in real app this would come from API
const mockAlternatives = [
  {
    id: '1',
    name: 'VS Code',
    description: 'A lightweight but powerful source code editor with built-in Git integration, intelligent code completion, and extensive extension marketplace.',
    logo: '⚡',
    rating: 4.8,
    reviews: 12500,
    price: 'Free',
    category: 'Code Editor',
    platforms: ['Windows', 'macOS', 'Linux'],
    license: 'Open Source',
    githubStars: 145000,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Notion',
    description: 'All-in-one workspace that combines notes, docs, project management, and collaboration tools in a single platform.',
    logo: '📝',
    rating: 4.6,
    reviews: 8900,
    price: 'Freemium',
    category: 'Productivity',
    platforms: ['Web', 'Windows', 'macOS', 'Mobile'],
    license: 'Proprietary',
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    name: 'GIMP',
    description: 'Professional-grade image editing software with advanced features for photo manipulation, digital art, and graphic design.',
    logo: '🎨',
    rating: 4.4,
    reviews: 5600,
    price: 'Free',
    category: 'Image Editor',
    platforms: ['Windows', 'macOS', 'Linux'],
    license: 'GPL',
    githubStars: 4200,
    lastUpdated: '2024-01-08'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
    toast({
      title: "Searching alternatives...",
      description: `Finding the best alternatives to "${query}"`,
    });
  };

  const handleOpenWizard = () => {
    toast({
      title: "AI Switch Wizard",
      description: "Let our AI help you find the perfect alternative based on your specific needs!",
    });
  };

  const handleCompare = (id: string) => {
    setCompareList(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id].slice(0, 4) // Max 4 items
    );
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Details",
      description: `Opening detailed view for alternative ${id}`,
    });
  };

  if (!showResults) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <HeroSection onSearch={handleSearch} onOpenWizard={handleOpenWizard} />
        <NewsPreview />
        <EnvironmentPreview />
        <PsychologyPreview />
        <MythsFactsPreview />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-border/20 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gradient">AlternativeHub</h1>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="glass"
              >
                ← Back to Home
              </Button>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} onOpenWizard={handleOpenWizard} />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFilterSidebarOpen(true)}
                className="glass lg:hidden"
              >
                <Filter className="w-4 h-4" />
              </Button>
              
              <div className="hidden sm:flex items-center gap-1 glass rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={filterSidebarOpen}
          onClose={() => setFilterSidebarOpen(false)}
          onFiltersChange={(filters) => console.log(filters)}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Results Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Alternatives to <span className="text-primary-soft">{searchQuery}</span>
                </h2>
                <p className="text-muted-foreground">
                  Found {mockAlternatives.length} alternatives • Sorted by relevance
                </p>
              </div>
              
              <Button className="glass">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Recommendations
              </Button>
            </div>
            
            {/* Compare Bar */}
            {compareList.length > 0 && (
              <div className="clean-card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {compareList.length} items selected for comparison
                  </span>
                  <Button size="sm">
                    Compare Now
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCompareList([])}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
          
          {/* Results Grid */}
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}>
            {mockAlternatives.map((alternative) => (
              <AlternativeCard
                key={alternative.id}
                alternative={alternative}
                onCompare={handleCompare}
                onViewDetails={handleViewDetails}
                isComparing={compareList.includes(alternative.id)}
              />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="glass px-8 py-3">
              Load More Alternatives
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
