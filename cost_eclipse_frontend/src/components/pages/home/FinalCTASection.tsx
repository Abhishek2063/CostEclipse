import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Download, Smartphone, Globe, Shield, Zap, Users } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-800 via-primary to-success relative overflow-hidden">
      {/* Background Pattern - Simplified */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Eclipse Your Financial Chaos?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who've transformed their financial lives with CostEclipse. 
            Start your journey from financial obscurity to complete clarity today.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-slate-800 hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Begin Your Financial Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto border-2 font-medium"
            >
              Explore Features
            </Button>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="opacity-80 text-lg">Free to Start</div>
              <div className="text-sm opacity-70">No credit card required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2 min</div>
              <div className="opacity-80 text-lg">Quick Setup</div>
              <div className="text-sm opacity-70">Get started instantly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="opacity-80 text-lg">Always Available</div>
              <div className="text-sm opacity-70">Your financial companion</div>
            </div>
          </div>

          {/* Platform Features */}
          <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
            <h3 className="text-2xl font-semibold mb-6">Available Everywhere You Are</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">Progressive Web App</div>
                  <div className="text-sm opacity-80">Install on any device</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">Web Browser</div>
                  <div className="text-sm opacity-80">Works anywhere</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Download className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">Offline Ready</div>
                  <div className="text-sm opacity-80">Track without internet</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Security & Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Bank-Level Security</div>
              <div className="text-sm opacity-80">Your data is protected with enterprise-grade encryption</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <Zap className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Lightning Fast</div>
              <div className="text-sm opacity-80">Optimized performance for instant financial insights</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <Users className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Trusted Community</div>
              <div className="text-sm opacity-80">Join 75,000+ users managing their finances smarter</div>
            </Card>
          </div>

          {/* Final Motivation */}
          <div className="space-y-4 opacity-90">
            <p className="text-lg font-medium">
              Your financial clarity is just one click away.
            </p>
            <p className="text-base">
              Don't let another month pass in financial uncertainty. Take control today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}