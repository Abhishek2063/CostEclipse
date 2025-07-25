import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Users, DollarSign, Target, TrendingUp } from 'lucide-react';

export function SocialProofSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      avatar: 'SC',
      content: 'CostEclipse transformed how I manage client expenses and personal finances. The receipt scanning feature alone saves me hours every week.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Small Business Owner',
      avatar: 'MR',
      content: 'Finally, a tool that makes group expenses simple. Our team trips and shared office costs are now completely transparent and fair.',
      rating: 5
    },
    {
      name: 'Emily Zhang',
      role: 'Graduate Student',
      avatar: 'EZ',
      content: 'The savings goals feature motivated me to save $5,000 for my Europe trip. The progress tracking kept me accountable every day.',
      rating: 5
    }
  ];

  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Users',
      subtext: 'Growing by 20% monthly'
    },
    {
      icon: DollarSign,
      value: '$2.1M',
      label: 'Tracked Monthly',
      subtext: 'Across all users'
    },
    {
      icon: Target,
      value: '89%',
      label: 'Goal Achievement',
      subtext: 'Users reaching targets'
    },
    {
      icon: TrendingUp,
      value: '4.8★',
      label: 'User Rating',
      subtext: 'From 12,000+ reviews'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Loved by Thousands of Users
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of people taking control of their financial future.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.subtext}</div>
              </Card>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60">
            <div className="bg-muted px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              Y Combinator
            </div>
            <div className="bg-muted px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              TechCrunch
            </div>
            <div className="bg-muted px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              Product Hunt
            </div>
            <div className="bg-muted px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              Forbes
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}