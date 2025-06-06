
import React, { useState } from 'react';
import { Search, Play, ExternalLink, Youtube, Globe, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from '@/components/Navigation';

const VideoSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const platforms = [
    {
      name: 'Invidious',
      description: 'Privacy-friendly YouTube frontend',
      url: 'https://invidious.io',
      features: ['No tracking', 'No ads', 'RSS feeds', 'Download videos'],
      type: 'YouTube Frontend'
    },
    {
      name: 'Piped',
      description: 'Alternative YouTube frontend focused on privacy',
      url: 'https://piped.kavin.rocks',
      features: ['Proxy videos', 'No Google APIs', 'Playlists', 'Sponsorblock'],
      type: 'YouTube Frontend'
    },
    {
      name: 'PeerTube',
      description: 'Decentralized video hosting network',
      url: 'https://joinpeertube.org',
      features: ['Federated', 'P2P streaming', 'No algorithms', 'Community owned'],
      type: 'Decentralized'
    },
    {
      name: 'Odysee',
      description: 'Blockchain-based video platform',
      url: 'https://odysee.com',
      features: ['Censorship resistant', 'Creator rewards', 'No ads', 'LBRY protocol'],
      type: 'Alternative Platform'
    }
  ];

  const handleSearch = (platform: string, searchQuery: string) => {
    setIsSearching(true);
    
    const searchUrls = {
      'Invidious': `https://invidious.io/search?q=${encodeURIComponent(searchQuery)}`,
      'Piped': `https://piped.kavin.rocks/results?search_query=${encodeURIComponent(searchQuery)}`,
      'PeerTube': `https://sepia-search.org/search?search=${encodeURIComponent(searchQuery)}`,
      'Odysee': `https://odysee.com/$/search?q=${encodeURIComponent(searchQuery)}`
    };

    setTimeout(() => {
      window.open(searchUrls[platform as keyof typeof searchUrls], '_blank');
      setIsSearching(false);
    }, 500);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'YouTube Frontend': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Decentralized': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Alternative Platform': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold">Privacy-First Video Search</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Search and watch videos without being tracked. Access YouTube content through 
            privacy-focused frontends and discover decentralized video platforms.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="max-w-4xl mx-auto mb-12 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Search Videos Privately</h2>
            <p className="text-muted-foreground">
              Enter your search query and choose a platform to search on
            </p>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for videos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 py-3 text-base"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    handleSearch('Invidious', query);
                  }
                }}
              />
            </div>
          </div>

          {query.trim() && (
            <div className="grid md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-start text-left"
                  onClick={() => handleSearch(platform.name, query)}
                  disabled={isSearching}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{platform.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Search "{query}" on {platform.name}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </Card>

        {/* Platform Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why These Platforms?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.name} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{platform.name}</h3>
                  <Badge variant="outline" className={getTypeColor(platform.type)}>
                    {platform.type}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {platform.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {platform.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Platform
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Avoid YouTube Directly?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              While YouTube hosts valuable content, the platform extensively tracks users, 
              manipulates recommendations, and serves intrusive advertisements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-sm text-muted-foreground">
                Tracks viewing habits, builds behavioral profiles, and shares data with advertisers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Privacy Frontends</h3>
              <p className="text-sm text-muted-foreground">
                Access the same content without tracking, ads, or algorithmic manipulation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Decentralized</h3>
              <p className="text-sm text-muted-foreground">
                Support creator-owned platforms that can't be censored or controlled
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VideoSearch;
