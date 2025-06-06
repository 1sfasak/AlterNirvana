
import React from 'react';
import { Star, Download, ExternalLink, Heart, GitCompare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Alternative {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  platforms: string[];
  license: string;
  githubStars?: number;
  lastUpdated: string;
}

interface AlternativeCardProps {
  alternative: Alternative;
  onCompare: (id: string) => void;
  onViewDetails: (id: string) => void;
  isComparing?: boolean;
}

const AlternativeCard = ({ alternative, onCompare, onViewDetails, isComparing = false }: AlternativeCardProps) => {
  return (
    <div className="clean-card cursor-pointer" onClick={() => onViewDetails(alternative.id)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg font-medium">
            {alternative.logo || alternative.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {alternative.name}
            </h3>
            <p className="text-sm text-muted-foreground">{alternative.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onCompare(alternative.id);
            }}
            className={`p-2 ${isComparing ? 'bg-primary/10 text-primary' : ''}`}
          >
            <GitCompare className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="p-2">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {alternative.description}
      </p>
      
      {/* Metrics */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="font-medium">{alternative.rating}</span>
          <span className="text-muted-foreground">({alternative.reviews})</span>
        </div>
        
        {alternative.githubStars && (
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4 text-muted-foreground" />
            <span>{alternative.githubStars.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex-1" />
        
        <Badge variant="secondary" className="text-xs">
          {alternative.price}
        </Badge>
      </div>
      
      {/* Platforms & License */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {alternative.platforms.slice(0, 3).map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
          {alternative.platforms.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{alternative.platforms.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant={alternative.license.includes('Open') ? 'default' : 'secondary'} 
            className="text-xs"
          >
            {alternative.license}
          </Badge>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

export default AlternativeCard;
