
import React, { useState } from 'react';
import { Leaf, Factory, Car, Trash2, Globe, Fish, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Navigation from '@/components/Navigation';

const Environment = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const articles = [
    {
      id: '1',
      title: 'The Hidden Cost of Fast Fashion: 92 Million Tons of Waste Annually',
      excerpt: 'Fast fashion creates more carbon emissions than international flights and maritime shipping combined. Every second, a garbage truck of textiles is landfilled or burned.',
      category: 'pollution',
      readTime: '8 min',
      severity: 'high',
      actionable: true
    },
    {
      id: '2',
      title: 'Microplastics in Our Bodies: We Consume a Credit Card Worth of Plastic Weekly',
      excerpt: 'Studies reveal microplastics in human blood, lungs, and placenta. The average person ingests 5 grams of plastic weekly - equivalent to a credit card.',
      category: 'health',
      readTime: '6 min',
      severity: 'critical',
      actionable: true
    },
    {
      id: '3',
      title: 'Space Debris: 34,000 Objects Threatening Our Future in Space',
      excerpt: 'Human space activities have created a debris field that threatens satellites, space stations, and future missions. We are polluting space as we did Earth.',
      category: 'space',
      readTime: '10 min',
      severity: 'high',
      actionable: false
    },
    {
      id: '4',
      title: 'Factory Farming: The Hidden Environmental and Ethical Crisis',
      excerpt: 'Livestock farming produces 14.5% of global greenhouse gases. 99% of farm animals in the US live in factory farms, causing immense suffering.',
      category: 'animals',
      readTime: '12 min',
      severity: 'critical',
      actionable: true
    }
  ];

  const categories = [
    { key: 'all', label: 'All Issues', icon: Globe },
    { key: 'pollution', label: 'Pollution', icon: Factory },
    { key: 'animals', label: 'Animal Rights', icon: Fish },
    { key: 'health', label: 'Health Impact', icon: Leaf },
    { key: 'space', label: 'Space Debris', icon: Car }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    // Simulate AI response - replace with actual AI integration
    setAiResponse(`Based on current research, ${aiQuery.toLowerCase()} is indeed a significant environmental concern. Here are key points to consider: 1) The scale of impact is often underestimated, 2) Individual actions do matter when multiplied, 3) Systemic change requires both personal responsibility and policy reform.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-500" />
            Our Planet in Crisis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            The uncomfortable truths about how our daily choices impact Earth and future generations. 
            It's time to face reality and embrace sustainable alternatives.
          </p>
        </div>

        {/* FOSS/Linux Advocacy */}
        <Card className="p-6 mb-8 border-green-500/30 bg-green-500/5">
          <h3 className="text-lg font-semibold mb-2 text-green-400">Digital Freedom = Environmental Freedom</h3>
          <p className="text-sm text-muted-foreground">
            Just as we pollute our planet, tech giants pollute our digital lives. Linux and FOSS software 
            consume less resources, respect your privacy, and don't force planned obsolescence. 
            Choose freedom: <span className="text-green-400">Ubuntu, Fedora, Arch Linux</span> over 
            resource-hungry Windows/macOS that spy on you while wasting energy.
          </p>
        </Card>

        {/* AI Assistant */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask About Environmental Impact
          </h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Ask about any environmental concern... (e.g., 'How does cryptocurrency mining affect the environment?')"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAiQuery} disabled={!aiQuery.trim()}>
              Get Insights
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={article.severity === 'critical' ? "destructive" : "default"}>
                    {article.category}
                  </Badge>
                  {article.actionable && (
                    <Badge variant="secondary">Actionable</Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  Read Full Article
                </Button>
                {article.actionable && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Take Action
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-green-500/10 to-blue-500/10">
          <h2 className="text-2xl font-bold mb-4">Every Choice Matters</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The crisis is real, but so is our power to change. Start with small steps: 
            reduce consumption, choose alternatives, question everything, and spread awareness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Sustainable Alternatives</Button>
            <Button size="lg" variant="outline">Environmental Apps</Button>
            <Button size="lg" variant="outline">FOSS for Green Computing</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Environment;
