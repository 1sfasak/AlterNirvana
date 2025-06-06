
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
    <div className="relative min-h-screen flex items-center justify-center particle-bg overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-neon-purple rounded-full animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse-slow delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-neon-cyan rounded-full animate-pulse-slow delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Heading */}
        <div className="mb-8 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient">Alternative</span>
            <br />
            <span className="text-neon">Discovery</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Powered by AI • Driven by Community • Built on Open Source
            <br />
            <span className="text-neon text-lg">Find the perfect alternative to any software, service, or tool</span>
          </p>
        </div>
        
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearch={onSearch} onOpenWizard={onOpenWizard} />
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: '🤖', text: 'AI-Powered Recommendations' },
            { icon: '🔍', text: 'Semantic Search' },
            { icon: '📊', text: 'Smart Comparisons' },
            { icon: '🚀', text: '100% Open Source' }
          ].map((feature, index) => (
            <div
              key={feature.text}
              className="floating-card px-4 py-2 text-sm"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="neon-border bg-primary/10 hover:bg-primary/20 px-8 py-4 text-lg group"
          >
            Start Exploring
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="ghost"
            className="glass px-8 py-4 text-lg hover:neon-glow"
          >
            <Github className="mr-2 w-5 h-5" />
            View on GitHub
            <Star className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {[
            { number: '10K+', label: 'Alternatives' },
            { number: '500+', label: 'Categories' },
            { number: '50K+', label: 'Community Members' },
            { number: '100%', label: 'Open Source' }
          ].map((stat) => (
            <div key={stat.label} className="floating-card text-center">
              <div className="text-2xl font-bold text-neon">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
