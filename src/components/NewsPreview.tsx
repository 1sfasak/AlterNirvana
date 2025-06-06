
import React, { useEffect, useState } from 'react';
import { Newspaper, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  is_hot: boolean;
}

const NewsPreview = () => {
  const [articles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'OpenAI Releases GPT-5: Revolutionary AI Capabilities',
      excerpt: 'The latest iteration promises unprecedented reasoning and multimodal understanding.',
      category: 'Artificial Intelligence',
      published_at: '2024-01-15T10:00:00Z',
      is_hot: true
    },
    {
      id: '2',
      title: 'SpaceX Starship Makes Historic Mars Mission Progress',
      excerpt: 'Successful orbital refueling test brings Mars colonization one step closer.',
      category: 'Space Technology',
      published_at: '2024-01-14T15:30:00Z',
      is_hot: true
    },
    {
      id: '3',
      title: 'CRISPR Breakthrough: Reversing Genetic Blindness',
      excerpt: 'Clinical trials show 90% success rate in treating inherited retinal diseases.',
      category: 'Biotechnology',
      published_at: '2024-01-13T08:45:00Z',
      is_hot: false
    }
  ]);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">Latest Tech News</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the hottest topics in technology and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={article.is_hot ? "default" : "secondary"}>
                  {article.is_hot && <TrendingUp className="w-3 h-3 mr-1" />}
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                Read More →
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/news" className="flex items-center gap-2">
              View All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsPreview;
