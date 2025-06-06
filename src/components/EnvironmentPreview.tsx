
import React from 'react';
import { Leaf, ArrowRight, Factory, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const EnvironmentPreview = () => {
  const highlights = [
    {
      title: 'Microplastics in Human Blood',
      impact: 'Critical',
      description: 'We consume a credit card worth of plastic weekly',
      color: 'red'
    },
    {
      title: 'Fast Fashion Waste Crisis',
      impact: 'High',
      description: '92 million tons of textile waste annually',
      color: 'orange'
    },
    {
      title: 'Space Debris Pollution',
      impact: 'High',
      description: '34,000 objects threatening future space missions',
      color: 'yellow'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-500" />
            <h2 className="text-4xl font-bold">Our Planet in Crisis</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The uncomfortable truths about how we're destroying our only home. Time to face reality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={highlight.color === 'red' ? "destructive" : "default"}>
                  {highlight.impact} Impact
                </Badge>
                <Factory className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                {highlight.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {highlight.description}
              </p>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                Learn Impact →
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-8 bg-green-500/5 border-green-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold">Digital Freedom = Environmental Freedom</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Linux and FOSS software consume less resources, last longer, and don't force planned obsolescence. 
            Choose freedom over waste.
          </p>
          <Button size="sm" variant="outline">Explore Green Computing</Button>
        </Card>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/environment" className="flex items-center gap-2">
              Face the Truth
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPreview;
