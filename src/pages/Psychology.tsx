
import React, { useState } from 'react';
import { Brain, Eye, Target, Shield, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Navigation from '@/components/Navigation';

const Psychology = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const techniques = [
    {
      id: '1',
      title: 'The Infinite Scroll Trap: How Social Media Hijacks Your Brain',
      description: 'Variable ratio reinforcement schedule - the same psychology behind gambling addiction. You never know when the next "reward" (interesting post) will come.',
      category: 'digital',
      severity: 'high',
      examples: ['Instagram feeds', 'TikTok videos', 'Twitter timeline'],
      books: ['Hooked by Nir Eyal', 'Digital Minimalism by Cal Newport']
    },
    {
      id: '2',
      title: 'Anchoring Bias in Retail: The First Price You See Controls Everything',
      description: 'Stores place expensive items first to make everything else seem reasonable. The first price becomes your mental anchor.',
      category: 'retail',
      severity: 'medium',
      examples: ['Menu pricing', 'Car dealerships', 'Real estate'],
      books: ['Predictably Irrational by Dan Ariely', 'Thinking Fast and Slow by Daniel Kahneman']
    },
    {
      id: '3',
      title: 'The 48 Laws of Power in Daily Life: How People Control You',
      description: 'Power dynamics exist everywhere - from workplace politics to family relationships. Recognizing these patterns protects you.',
      category: 'power',
      severity: 'critical',
      examples: ['Boss manipulation', 'Relationship dynamics', 'Social pressure'],
      books: ['48 Laws of Power by Robert Greene', 'The Art of Not Being Governed by James Scott']
    },
    {
      id: '4',
      title: 'Scarcity Marketing: Creating Urgency to Bypass Rational Thinking',
      description: 'Limited time offers, countdown timers, and "only X left" messages trigger fear of missing out, making you buy impulsively.',
      category: 'marketing',
      severity: 'high',
      examples: ['Amazon deals', 'Booking.com tactics', 'Email marketing'],
      books: ['Influence by Robert Cialdini', 'Pre-Suasion by Robert Cialdini']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Tricks', icon: Brain },
    { key: 'digital', label: 'Digital Manipulation', icon: Eye },
    { key: 'marketing', label: 'Marketing Tricks', icon: Target },
    { key: 'power', label: 'Power Dynamics', icon: Shield },
    { key: 'retail', label: 'Retail Psychology', icon: BookOpen }
  ];

  const filteredTechniques = selectedCategory === 'all' 
    ? techniques 
    : techniques.filter(technique => technique.category === selectedCategory);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setAiResponse(`This is a classic psychological manipulation technique. Here's what's happening: 1) Your cognitive biases are being exploited, 2) The technique bypasses rational thinking, 3) Awareness is your best defense. Key principle: When you feel pressured to act immediately, step back and analyze why.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            The Puppet Masters
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Uncover the psychological tricks used to control your decisions. From social media algorithms 
            to retail psychology - understand the invisible strings pulling you.
          </p>
        </div>

        {/* FOSS/Linux Advocacy */}
        <Card className="p-6 mb-8 border-purple-500/30 bg-purple-500/5">
          <h3 className="text-lg font-semibold mb-2 text-purple-400">Break Free from Mental Manipulation</h3>
          <p className="text-sm text-muted-foreground">
            Big Tech uses dark patterns to control your behavior - infinite scroll, notification addiction, 
            data harvesting. Linux and FOSS software respect your mental space: no ads, no tracking, 
            no manipulation. Tools like <span className="text-purple-400">Signal, Firefox, Linux</span> 
            prioritize your wellbeing over profit.
          </p>
        </Card>

        {/* AI Assistant */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Decode Manipulation Techniques
          </h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe a situation where you felt manipulated... (e.g., 'Why do I keep scrolling social media?')"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAiQuery} disabled={!aiQuery.trim()}>
              Analyze This
            </Button>
            {aiResponse && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm">{aiResponse}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              size="sm"
              className="flex items-center gap-2"
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredTechniques.map((technique) => (
            <Card key={technique.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={technique.severity === 'critical' ? "destructive" : "default"}>
                  {technique.category}
                </Badge>
                <Badge variant="outline">{technique.severity} impact</Badge>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">
                {technique.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {technique.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-1">
                    {technique.examples.map((example, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Recommended Books:</h4>
                  <div className="space-y-1">
                    {technique.books.map((book, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        📚 {book}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Defense Strategies
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-purple-500/10 to-red-500/10">
          <h2 className="text-2xl font-bold mb-4">Knowledge is Power</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Once you see the matrix, you can't unsee it. Understanding these psychological patterns 
            gives you the power to make conscious choices instead of being unconsciously controlled.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Psychology Books</Button>
            <Button size="lg" variant="outline">Mental Freedom Tools</Button>
            <Button size="lg" variant="outline">FOSS Privacy Apps</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Psychology;
