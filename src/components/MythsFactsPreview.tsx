
import React from 'react';
import { BookOpen, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const MythsFactsPreview = () => {
  const examples = [
    {
      myth: 'Columbus discovered America',
      fact: 'Indigenous peoples lived there for thousands of years. Columbus committed genocide.',
      category: 'History'
    },
    {
      myth: 'Fluoride is completely safe',
      fact: 'Fluoride is a neurotoxin. Many countries ban water fluoridation.',
      category: 'Health'
    },
    {
      myth: 'Africa is underdeveloped',
      fact: 'Africa is the richest continent. Colonial exploitation maintains artificial poverty.',
      category: 'Geography'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-bold">Truth Unveiled</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Question everything you've been told. From health myths to historical lies - uncover hidden truths.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {examples.map((example, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <Badge variant="outline" className="mb-4">{example.category}</Badge>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400 font-medium">
                    {example.myth}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-400">
                    {example.fact}
                  </p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto mt-4">
                Full Truth →
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-8 bg-blue-500/5 border-blue-500/30">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Information Freedom Through FOSS</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Big Tech controls information through algorithms and censorship. Use DuckDuckGo, Brave, and Linux for unfiltered knowledge access.
          </p>
          <Button size="sm" variant="outline">Access Free Information</Button>
        </Card>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/myths-facts" className="flex items-center gap-2">
              Question Everything
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MythsFactsPreview;
