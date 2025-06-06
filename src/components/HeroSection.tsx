
import React from 'react';
import { ArrowRight, Github, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SearchBar from './SearchBar';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onOpenWizard: () => void;
}

const HeroSection = ({ onSearch, onOpenWizard }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        {/* Clean Heading */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Find Better
            <br />
            <span className="text-primary-soft">Alternatives</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover open-source and better alternatives to any software or service
          </p>
        </div>
        
        {/* Search Section */}
        <div className="mb-16">
          <SearchBar onSearch={onSearch} onOpenWizard={onOpenWizard} />
        </div>
        
        {/* Simple Feature List */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-muted-foreground">
          <span>AI-Powered</span>
          <span>•</span>
          <span>Open Source</span>
          <span>•</span>
          <span>Community Driven</span>
          <span>•</span>
          <span>Always Free</span>
        </div>
        
        {/* Clean CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="px-8 py-3 text-base group"
          >
            Start Exploring
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-3 text-base"
          >
            <Github className="mr-2 w-4 h-4" />
            View on GitHub
            <Star className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        {/* Clean Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {[
            { number: '10K+', label: 'Alternatives' },
            { number: '500+', label: 'Categories' },
            { number: '50K+', label: 'Users' },
            { number: '100%', label: 'Open Source' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold text-primary-soft">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
