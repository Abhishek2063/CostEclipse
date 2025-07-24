import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export function FeaturesPageHeader() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Features', count: 12 },
    { id: 'personal', label: 'Personal Finance', count: 6 },
    { id: 'group', label: 'Group Expenses', count: 3 },
    { id: 'analytics', label: 'Analytics', count: 2 },
    { id: 'technical', label: 'Technical', count: 4 }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-accent/30 to-primary/5 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Complete Financial Control
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover how CostEclipse transforms financial management with intelligent tracking, 
              seamless collaboration, and actionable insights designed for modern life.
            </p>
          </div>

          {/* Feature Category Tabs */}
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl border p-2 inline-block">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full bg-transparent gap-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                  >
                    <span className="font-medium">{category.label}</span>
                    <Badge 
                      variant={activeTab === category.id ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}