
import React from 'react';
import { Brain, ArrowRight, Eye, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const PsychologyPreview = () => {
  const techniques = [
    {
      title: 'Infinite Scroll Addiction',
      description: 'How social media hijacks your brain using gambling psychology',
      severity: 'Critical',
      icon: Eye
    },
    {
      title: 'Retail Anchoring Tricks',
      description: 'Why the first price you see controls all your buying decisions',
      severity: 'High',
      icon: Target
    },
    {
      title: 'Power Dynamics in Daily Life',
      description: 'How bosses, family, and friends manipulate you without you knowing',
      severity: 'Critical',
      icon: Brain
    }
  ];

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-500" />
            <h2 className="text-4xl font-bold">The Puppet Masters</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uncover the psychological tricks controlling your decisions. From social media to shopping - see the invisible strings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {techniques.map((technique, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={technique.severity === 'Critical' ? "destructive" : "default"}>
                  {technique.severity}
                </Badge>
                <technique.icon className="w-5 h-5 text-purple-500" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                {technique.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {technique.description}
              </p>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                Understand This →
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-8 bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold">Break Free from Mental Manipulation</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Big Tech uses dark patterns to control you. Linux and FOSS respect your mental space - no ads, no tracking, no manipulation.
          </p>
          <Button size="sm" variant="outline">Discover Mental Freedom Tools</Button>
        </Card>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/psychology" className="flex items-center gap-2">
              See the Matrix
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychologyPreview;
