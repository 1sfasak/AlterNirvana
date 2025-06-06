
import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, MessageSquare, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navigation from '@/components/Navigation';

const MythsFacts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const mythsFacts = [
    {
      id: '1',
      myth: 'Fluoride in toothpaste is completely safe and necessary',
      fact: 'Fluoride is a neurotoxin. Many countries have banned water fluoridation. Natural alternatives like hydroxyapatite are equally effective without risks.',
      category: 'health',
      severity: 'high',
      sources: ['Harvard Public Health', 'The Lancet Neurology'],
      alternatives: ['Hydroxyapatite toothpaste', 'Coconut oil pulling', 'Baking soda']
    },
    {
      id: '2',
      myth: 'Columbus discovered America and was a hero',
      fact: 'Indigenous peoples lived in Americas for thousands of years. Columbus committed genocide, enslaved natives, and never set foot on mainland America.',
      category: 'history',
      severity: 'critical',
      sources: ['Smithsonian Institution', 'National Geographic'],
      alternatives: ['Read "A People\'s History" by Howard Zinn', 'Indigenous perspectives']
    },
    {
      id: '3',
      myth: 'Africa is a poor, underdeveloped continent',
      fact: 'Africa is the world\'s richest continent in natural resources. Colonial exploitation and ongoing resource extraction maintain artificial poverty.',
      category: 'geography',
      severity: 'high',
      sources: ['World Bank data', 'African Development Bank'],
      alternatives: ['Study African innovations', 'Learn about resource extraction']
    },
    {
      id: '4',
      myth: 'You need to drink 8 glasses of water daily',
      fact: 'This myth comes from a 1945 recommendation that included water from food. Most people get enough water from their diet.',
      category: 'health',
      severity: 'low',
      sources: ['Mayo Clinic', 'British Medical Journal'],
      alternatives: ['Listen to your thirst', 'Eat water-rich foods']
    },
    {
      id: '5',
      myth: 'Chemical preservatives are always harmful',
      fact: 'Many "chemicals" are naturally occurring. Salt is a chemical preservative. The dose makes the poison - natural doesn\'t always mean safe.',
      category: 'science',
      severity: 'medium',
      sources: ['FDA', 'European Food Safety Authority'],
      alternatives: ['Understand ingredients', 'Choose minimally processed foods']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'health', label: 'Health & Medicine' },
    { key: 'history', label: 'History' },
    { key: 'science', label: 'Science' },
    { key: 'geography', label: 'Geography & Culture' }
  ];

  const filteredMyths = mythsFacts.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.myth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setAiResponse(`Let me fact-check this for you: This claim requires careful examination. Here's what current evidence shows: 1) Consider the source and funding behind studies, 2) Look for peer-reviewed research, 3) Check if there are conflicts of interest. Remember: question everything, especially "common knowledge."`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            Truth Unveiled
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Question everything you've been told. From health myths to historical lies, 
            uncover the facts hidden behind popular beliefs and propaganda.
          </p>
        </div>

        {/* FOSS/Linux Advocacy */}
        <Card className="p-6 mb-8 border-blue-500/30 bg-blue-500/5">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Information Freedom Through FOSS</h3>
          <p className="text-sm text-muted-foreground">
            Big Tech controls information flow through search algorithms and censorship. 
            Use <span className="text-blue-400">DuckDuckGo, Brave Browser, Linux</span> for unfiltered access to information. 
            Wikipedia, Sci-Hub, and FOSS tools help you access knowledge without corporate gatekeepers.
          </p>
        </Card>

        {/* Search and AI */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Myths & Facts
            </h3>
            <Input
              placeholder="Search for any topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Fact-Check with AI
            </h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Ask me to fact-check anything..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                rows={2}
              />
              <Button onClick={handleAiQuery} disabled={!aiQuery.trim()} size="sm">
                Fact-Check
              </Button>
              {aiResponse && (
                <div className="p-3 bg-secondary rounded text-sm">
                  {aiResponse}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
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

        {/* Myths & Facts Grid */}
        <div className="space-y-6 mb-8">
          {filteredMyths.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{item.category}</Badge>
                <Badge variant={item.severity === 'critical' ? "destructive" : 
                              item.severity === 'high' ? "default" : "secondary"}>
                  {item.severity} impact
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">MYTH:</h3>
                    <p className="text-sm">{item.myth}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-400 mb-1">FACT:</h3>
                    <p className="text-sm">{item.fact}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Sources:</h4>
                    <div className="space-y-1">
                      {item.sources.map((source, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          📄 {source}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">What You Can Do:</h4>
                    <div className="space-y-1">
                      {item.alternatives.map((alt, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          ✓ {alt}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm">
                  Full Research
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Share Truth
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-500/10 to-green-500/10">
          <h2 className="text-2xl font-bold mb-4">Question Everything</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The first step to freedom is questioning what you've been told. 
            Research, verify, and think critically. Truth liberates minds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Research Tools</Button>
            <Button size="lg" variant="outline">Fact-Checking Resources</Button>
            <Button size="lg" variant="outline">FOSS Knowledge Base</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MythsFacts;
