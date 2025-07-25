import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function FeaturesPageHeader() {
  const [activeTab, setActiveTab] = useState('personal');

  const categories = [
    {
      id: 'personal',
      label: 'Personal Finance',
      count: 6,
      description: 'Individual money management',
    },
    { id: 'group', label: 'Group Expenses', count: 4, description: 'Shared cost management' },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      count: 5,
      description: 'Data insights & trends',
    },
    {
      id: 'technical',
      label: 'Technical Features',
      count: 8,
      description: 'Platform capabilities',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-background via-accent/30 to-primary/5 border-b backdrop-blur-md bg-background/90">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Project Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-primary to-success text-white border-0">
                ✨ Complete Financial Solution
              </Badge>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-slate-800 via-primary to-success bg-clip-text text-transparent">
                Complete Financial Control
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover how CostEclipse transforms financial management with intelligent tracking,
              seamless collaboration, and actionable insights designed for modern life.
            </p>
          </div>

          {/* Feature Category Tabs */}
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl border p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`p-4 rounded-xl transition-all duration-200 text-left group hover:scale-105 ${
                    activeTab === category.id
                      ? 'bg-gradient-to-br from-primary to-success text-primary-foreground shadow-lg'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm lg:text-base">{category.label}</span>
                    <Badge
                      variant={activeTab === category.id ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {category.count}
                    </Badge>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      activeTab === category.id
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                23+
              </div>
              <div className="text-sm text-muted-foreground">Core Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                75k+
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
