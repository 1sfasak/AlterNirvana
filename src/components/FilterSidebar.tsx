
import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onClose, onFiltersChange }: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    platform: true,
    license: true,
    category: true,
    features: false
  });

  const [filters, setFilters] = useState({
    price: [],
    platform: [],
    license: [],
    category: [],
    rating: [0],
    lastUpdated: 'any'
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterSections = [
    {
      key: 'price',
      title: 'Price',
      options: ['Free', 'Freemium', 'Paid', 'Open Source', 'Enterprise']
    },
    {
      key: 'platform',
      title: 'Platform',
      options: ['Windows', 'macOS', 'Linux', 'Web', 'Mobile', 'CLI']
    },
    {
      key: 'license',
      title: 'License',
      options: ['MIT', 'Apache 2.0', 'GPL', 'BSD', 'Proprietary', 'Creative Commons']
    },
    {
      key: 'category',
      title: 'Category',
      options: ['Development', 'Design', 'Productivity', 'Communication', 'Media', 'Security']
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 z-50 lg:z-0
        glass-strong border-r border-border/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neon" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="lg:hidden glass p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Quick Filters */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Filters</h3>
            <div className="flex flex-wrap gap-2">
              {['Popular', 'Recently Updated', 'Open Source', 'Free'].map((filter) => (
                <Badge
                  key={filter}
                  variant="outline"
                  className="cursor-pointer hover:neon-glow transition-all duration-300 glass"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Rating Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
            <div className="space-y-3">
              <Slider
                value={filters.rating}
                onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 stars</span>
                <span className="text-neon">{filters.rating[0]} stars</span>
                <span>5 stars</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic Filter Sections */}
          {filterSections.map((section) => (
            <div key={section.key} className="space-y-3">
              <button
                onClick={() => toggleSection(section.key)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-medium">{section.title}</h3>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    expandedSections[section.key] ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections[section.key] && (
                <div className="space-y-2 ml-2">
                  {section.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${section.key}-${option}`}
                        className="border-border/50"
                      />
                      <Label 
                        htmlFor={`${section.key}-${option}`}
                        className="text-sm cursor-pointer hover:text-neon transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Actions */}
          <div className="pt-4 space-y-3 border-t border-border/20">
            <Button className="w-full neon-border bg-primary/10 hover:bg-primary/20">
              Apply Filters
            </Button>
            <Button variant="ghost" className="w-full glass">
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
