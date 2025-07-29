import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Eye, 
  Lightbulb, 
  Shield, 
  Users, 
  Zap,
  Code,
  Palette,
  Brain,
  Target,
  Coffee,
} from 'lucide-react';

export function AboutUsSection() {
  const coreValues = [
    {
      icon: Zap,
      title: 'Simplicity',
      description: 'Finance should feel easy, not overwhelming.',
      detailedDescription: 'We believe that powerful financial tools don\'t have to be complex. Every feature we build is designed with simplicity at its core, making financial management accessible to everyone, regardless of their technical background.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Your data is yours. We protect it and present it clearly.',
      detailedDescription: 'We maintain complete transparency in how we handle your financial data. No hidden fees, no data selling, no surprises. Your information is encrypted, secure, and always under your control.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Shared finances shouldn\'t be a headache — we help you split and settle with ease.',
      detailedDescription: 'Financial collaboration should bring people together, not create conflict. Our tools are designed to make group expenses, bill splitting, and financial planning a seamless, stress-free experience.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We blend smart design and cutting-edge technology to solve real-world problems.',
      detailedDescription: 'We continuously push the boundaries of what\'s possible in financial technology, using AI, machine learning, and innovative design to create solutions that truly make a difference in people\'s lives.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const teamSkills = [
    { icon: Code, label: 'Passionate Developers', description: 'Building robust, scalable solutions' },
    { icon: Palette, label: 'Creative Designers', description: 'Crafting beautiful, intuitive experiences' },
    { icon: Brain, label: 'Strategic Thinkers', description: 'Solving complex financial challenges' },
    { icon: Coffee, label: 'Problem Solvers', description: 'Working around the clock for users' }
  ];

  const impactStats = [
    { number: '75k+', label: 'Happy Users', description: 'Trust us with their finances' },
    { number: '₹2.5Cr+', label: 'Money Managed', description: 'Through our platform monthly' },
    { number: '95%', label: 'User Satisfaction', description: 'Rate us 4.8/5 stars' },
    { number: '24/7', label: 'Support', description: 'Always here when you need us' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mission Statement */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">

              <Badge className="mb-6 bg-gradient-to-r from-primary to-success text-white text-lg px-6 py-2">
                About CostEclipse
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Simplifying Finance for{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>

              <div className="space-y-6 text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                <p>
                  At <span className="font-semibold text-foreground">CostEclipse</span>, we believe that managing personal and group finances shouldn't be complicated. Born out of a need for a simple yet powerful expense management solution, our mission is to empower individuals, teams, and businesses to track, analyze, and optimize their spending with clarity and confidence.
                </p>
                <p>
                  We're more than just a budgeting tool — we're a <span className="font-semibold text-primary">finance companion</span> built for the modern user. Whether you're planning a trip with friends, splitting household expenses, or keeping tabs on your monthly income, CostEclipse simplifies the process with intuitive features, beautiful analytics, and smart automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5 border-2 border-primary/10">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Our Vision</h2>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                To make financial awareness and planning <span className="font-semibold text-primary">accessible</span>, <span className="font-semibold text-secondary">engaging</span>, and <span className="font-semibold text-success">efficient</span> for everyone — regardless of financial background or experience.
              </p>
              <div className="flex justify-center gap-8 pt-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Accessible</div>
                  <div className="text-sm text-muted-foreground">For everyone</div>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">Engaging</div>
                  <div className="text-sm text-muted-foreground">User-friendly</div>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="font-semibold">Efficient</div>
                  <div className="text-sm text-muted-foreground">Time-saving</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-secondary to-primary text-white">
              Our Core Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              These principles guide every decision we make and every feature we build. 
              They're not just words on a page — they're the foundation of our product and culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative space-y-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                        <p className="text-lg font-medium text-primary mb-3">
                          {value.description}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {value.detailedDescription}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Built with Passion Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
                Built with Passion
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Meet the People Behind CostEclipse
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                CostEclipse is crafted by a team of passionate developers, designers, and thinkers who understand the importance of every rupee. We're continuously improving based on real user feedback and evolving needs.
              </p>
            </div>

            {/* Team Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {teamSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">{skill.label}</h4>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Impact Stats */}
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-accent/30 to-primary/5 border-2">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Impact in Numbers</h3>
                <p className="text-muted-foreground">
                  Real metrics that show the trust our users place in us every day.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="font-semibold text-lg">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Philosophy */}
            <div className="mt-12 text-center">
              <Card className="p-8 bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
                <div className="space-y-4">
                  <Coffee className="h-12 w-12 text-success mx-auto" />
                  <h3 className="text-2xl font-bold">Our Philosophy</h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    We believe that great financial tools are born from understanding real people's challenges. 
                    Every line of code, every design decision, and every feature is crafted with empathy and precision, 
                    because we know that financial stress affects real lives.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
}