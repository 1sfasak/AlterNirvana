
import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, User, Bookmark, Heart, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  image_url: string;
  source: string;
  author: string;
  published_at: string;
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  is_hot: boolean;
  view_count: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const News = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, [selectedCategory, user]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('news_articles')
        .select(`
          *,
          category:categories(name, slug)
        `)
        .order('published_at', { ascending: false })
        .limit(20);

      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.slug === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInteraction = async (articleId: string, type: string) => {
    if (!user) return;

    try {
      await supabase
        .from('user_article_interactions')
        .upsert({
          user_id: user.id,
          article_id: articleId,
          interaction_type: type
        });
    } catch (error) {
      console.error('Error saving interaction:', error);
    }
  };

  // Mock articles for demo (replace with real data)
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'OpenAI Releases GPT-5: The Next Evolution in AI Language Models',
      excerpt: 'The latest iteration promises unprecedented reasoning capabilities and multimodal understanding.',
      url: 'https://example.com/article1',
      image_url: '',
      source: 'TechCrunch',
      author: 'Jane Smith',
      published_at: '2024-01-15T10:00:00Z',
      category: { name: 'Artificial Intelligence', slug: 'ai' },
      tags: ['AI', 'OpenAI', 'LLM'],
      is_hot: true,
      view_count: 15420
    },
    {
      id: '2',
      title: 'SpaceX Successfully Launches Revolutionary Starship Mission',
      excerpt: 'Historic flight demonstrates new capabilities for Mars colonization efforts.',
      url: 'https://example.com/article2',
      image_url: '',
      source: 'Space News',
      author: 'John Doe',
      published_at: '2024-01-14T15:30:00Z',
      category: { name: 'Space Technology', slug: 'space' },
      tags: ['SpaceX', 'Starship', 'Mars'],
      is_hot: true,
      view_count: 12350
    },
    {
      id: '3',
      title: 'CRISPR Gene Editing Breakthrough: Reversing Genetic Blindness',
      excerpt: 'Clinical trials show promising results for inherited retinal diseases.',
      url: 'https://example.com/article3',
      image_url: '',
      source: 'Nature Medicine',
      author: 'Dr. Sarah Wilson',
      published_at: '2024-01-13T08:45:00Z',
      category: { name: 'Gene Editing', slug: 'gene-editing' },
      tags: ['CRISPR', 'Gene Therapy', 'Medical'],
      is_hot: false,
      view_count: 8900
    }
  ];

  const displayArticles = articles.length > 0 ? articles : mockArticles;

  const categoryButtons = [
    { key: 'all', label: 'All News' },
    { key: 'ai', label: 'AI' },
    { key: 'space', label: 'Space' },
    { key: 'quantum', label: 'Quantum' },
    { key: 'biotech', label: 'Biotech' },
    { key: 'privacy-foss', label: 'Privacy & FOSS' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-primary" />
            Tech News
          </h1>
          <p className="text-xl text-muted-foreground">
            {user 
              ? 'Personalized news based on your interests'
              : 'Latest hot topics in technology and innovation'
            }
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryButtons.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              size="sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading articles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={article.is_hot ? "default" : "secondary"}>
                      {article.is_hot && <TrendingUp className="w-3 h-3 mr-1" />}
                      {article.category.name}
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
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{article.source}</span>
                    <span>{article.view_count.toLocaleString()} views</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </Button>
                    
                    {user && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleInteraction(article.id, 'like')}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleInteraction(article.id, 'bookmark')}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleInteraction(article.id, 'share')}
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
