
import React from 'react';
import { Shield, Eye, Brain, Lock, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from '@/components/Navigation';

const Privacy = () => {
  const topics = [
    {
      id: 'tracking',
      title: 'How Tech Giants Track You',
      icon: Eye,
      description: 'Understanding the invisible web of data collection',
      articles: [
        {
          title: 'The Surveillance Capitalism Model',
          description: 'How your data becomes their profit',
          readTime: '8 min',
          level: 'Beginner'
        },
        {
          title: 'Browser Fingerprinting Explained',
          description: 'How websites identify you without cookies',
          readTime: '12 min',
          level: 'Intermediate'
        },
        {
          title: 'Social Media Data Mining',
          description: 'What Facebook, Google, and TikTok know about you',
          readTime: '15 min',
          level: 'Beginner'
        }
      ]
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering & Manipulation',
      icon: Brain,
      description: 'How technology exploits psychological vulnerabilities',
      articles: [
        {
          title: 'Infinite Scroll: The Attention Trap',
          description: 'Why you can\'t stop scrolling and how to break free',
          readTime: '10 min',
          level: 'Beginner'
        },
        {
          title: 'Algorithmic Manipulation',
          description: 'How recommendation systems shape your reality',
          readTime: '14 min',
          level: 'Intermediate'
        },
        {
          title: 'Dark Patterns in UX Design',
          description: 'Deceptive design that tricks users',
          readTime: '7 min',
          level: 'Beginner'
        }
      ]
    },
    {
      id: 'foss',
      title: 'Free & Open Source Software',
      icon: Lock,
      description: 'Building a privacy-first digital life',
      articles: [
        {
          title: 'Why FOSS Matters for Privacy',
          description: 'The benefits of transparent software',
          readTime: '6 min',
          level: 'Beginner'
        },
        {
          title: 'Essential Privacy Tools',
          description: 'Must-have applications for digital privacy',
          readTime: '20 min',
          level: 'Intermediate'
        },
        {
          title: 'Degoogling Your Life',
          description: 'Step-by-step guide to Google alternatives',
          readTime: '25 min',
          level: 'Advanced'
        }
      ]
    },
    {
      id: 'digital-wellness',
      title: 'Digital Wellness',
      icon: Shield,
      description: 'Maintaining mental health in the digital age',
      articles: [
        {
          title: 'Breaking the Dopamine Loop',
          description: 'Understanding notification addiction',
          readTime: '9 min',
          level: 'Beginner'
        },
        {
          title: 'Mindful Technology Use',
          description: 'Strategies for intentional digital consumption',
          readTime: '11 min',
          level: 'Beginner'
        },
        {
          title: 'Digital Detox Guide',
          description: 'How to reduce screen time effectively',
          readTime: '16 min',
          level: 'Intermediate'
        }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
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
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold">Privacy Education</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how technology companies track and manipulate users, and discover 
            tools and strategies to protect your privacy and digital well-being.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-500 mb-2">
                You Are The Product
              </h3>
              <p className="text-muted-foreground">
                When a service is free, you're not the customer—you're the product being sold. 
                Your attention, data, and behavior patterns are commodities in the digital economy.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Video */}
        <Card className="mb-8 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-8 bg-primary rounded"></div>
            <h2 className="text-2xl font-bold">Featured: The Social Dilemma</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                This documentary exposes how social media platforms manipulate users through 
                algorithmic feeds, behavioral prediction, and psychological exploitation.
              </p>
              <Button asChild>
                <a 
                  href="https://youtu.be/nnLSWBBQSEU?si=kmbm-PrM-bRfUpRf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary rounded-lg p-8 text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm text-muted-foreground">
                "If you're not paying for the product, you are the product."
              </p>
            </div>
          </div>
        </Card>

        {/* Topics Grid */}
        <div className="space-y-8">
          {topics.map((topic) => (
            <Card key={topic.id} className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <topic.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{topic.title}</h2>
                  <p className="text-muted-foreground">{topic.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topic.articles.map((article, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-sm">{article.title}</h3>
                      <Badge variant="outline" className={getLevelColor(article.level)}>
                        {article.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                      <Button variant="ghost" size="sm">
                        Read Article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Action Section */}
        <Card className="mt-12 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Take Action</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Knowledge is power. Start protecting your privacy today with these practical steps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button>Download Privacy Guide</Button>
            <Button variant="outline">Browse FOSS Alternatives</Button>
            <Button variant="outline">Join Community</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
