import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  Shield, 
  Settings, 
  Smartphone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Book,
  Lock,
  Wrench,
  Globe
} from 'lucide-react';

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>(['general-1']);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          id: 'general-1',
          question: 'What is CostEclipse?',
          answer: 'CostEclipse is a cross-platform personal and event-based expense tracking app designed for individuals and teams to manage income, expenses, and shared finances efficiently. Whether you\'re tracking daily expenses, planning group trips, or managing business finances, CostEclipse provides the tools you need.'
        },
        {
          id: 'general-2',
          question: 'Is CostEclipse free to use?',
          answer: 'Yes! CostEclipse offers a free tier with essential features including expense tracking, basic analytics, and group expense management. Premium plans will be introduced in the future with advanced reporting, unlimited groups, priority support, and collaboration tools.'
        },
        {
          id: 'general-3',
          question: 'How does CostEclipse differ from other expense tracking apps?',
          answer: 'CostEclipse focuses on both individual and group financial management with intelligent categorization, real-time collaboration, and advanced analytics. Our unique eclipse-inspired design philosophy emphasizes bringing clarity to your financial picture.'
        },
        {
          id: 'general-4',
          question: 'Can I import data from other financial apps?',
          answer: 'Yes, we support importing data from CSV files and popular formats. We\'re also working on direct integrations with major expense tracking apps to make migration seamless.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      questions: [
        {
          id: 'security-1',
          question: 'How is my data protected?',
          answer: 'We use industry-grade encryption, JWT authentication, bcrypt password hashing, and secure HTTPS protocols to ensure your financial data is safe. All data is encrypted both in transit and at rest. We also implement rate limiting, secure session management, and regular security audits.'
        },
        {
          id: 'security-2',
          question: 'Does CostEclipse sell my personal data?',
          answer: 'Absolutely not. Your privacy is our top priority. We do not sell, rent, or share your personal data with third parties for marketing purposes. We only share limited data with trusted service providers necessary for app functionality, and they are bound by strict confidentiality agreements.'
        },
        {
          id: 'security-3',
          question: 'Can I delete my account and data?',
          answer: 'Yes, you have complete control over your data. You can request account deletion at any time through your profile settings or by contacting our support team. We will permanently delete all your personal data within 30 days of your request, except where required by law.'
        },
        {
          id: 'security-4',
          question: 'Is two-factor authentication available?',
          answer: 'Two-factor authentication (2FA) is currently in development and will be available in our next major update. We recommend using a strong, unique password until 2FA is available.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Wrench,
      color: 'from-purple-500 to-violet-500',
      questions: [
        {
          id: 'technical-1',
          question: 'I found a bug, how can I report it?',
          answer: 'Please use the Contact Us form, the in-app chat feature, or email us directly at support@costeclipse.app. When reporting bugs, please include your device type, browser version, and steps to reproduce the issue. Our team will investigate promptly and keep you updated on the fix.'
        },
        {
          id: 'technical-2',
          question: 'Can I use CostEclipse offline?',
          answer: 'While real-time features like group expense sync require internet access, certain functionality will be available offline via our Progressive Web App (PWA) and upcoming desktop wrapper (Electron). You can log expenses offline, and they\'ll sync when you reconnect.'
        },
        {
          id: 'technical-3',
          question: 'What browsers are supported?',
          answer: 'CostEclipse works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience. The app is also available as a Progressive Web App (PWA) for a native-like experience.'
        },
        {
          id: 'technical-4',
          question: 'How do I export my data?',
          answer: 'You can export your financial data in multiple formats (PDF, CSV, Excel) through the Analytics section. Go to Reports > Export Data and choose your preferred format. Premium users get access to advanced export options and automated report generation.'
        }
      ]
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      icon: Smartphone,
      color: 'from-orange-500 to-red-500',
      questions: [
        {
          id: 'compatibility-1',
          question: 'Is there a mobile version of CostEclipse?',
          answer: 'A dedicated mobile app is currently in development and will be released for Android and iOS in upcoming updates. Currently, you can use our responsive web app on mobile browsers or install our Progressive Web App (PWA) for a near-native experience.'
        },
        {
          id: 'compatibility-2',
          question: 'Can I use CostEclipse on my desktop?',
          answer: 'Yes! CostEclipse works perfectly in web browsers on desktop. We\'re also developing an Electron-based desktop application that will provide offline functionality and native OS integration.'
        },
        {
          id: 'compatibility-3',
          question: 'Does CostEclipse work on tablets?',
          answer: 'Absolutely! Our responsive design adapts beautifully to tablet screens. You can use all features on iPads, Android tablets, and other tablet devices through your web browser.'
        },
        {
          id: 'compatibility-4',
          question: 'Can I sync data across multiple devices?',
          answer: 'Yes, your data automatically syncs across all your devices in real-time. Whether you\'re on your phone, tablet, or computer, you\'ll always have access to your latest financial information.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/20 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-success text-white">
            <HelpCircle className="mr-2 h-4 w-4" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get Your Questions Answered
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We've gathered answers to the most common questions users have about CostEclipse. 
            Whether you're just getting started or managing complex financial events, we've got you covered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="overflow-hidden">
                {/* Category Header */}
                <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <Badge className="bg-white/20 text-white ml-auto">
                      {category.questions.length} questions
                    </Badge>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-border">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="transition-all duration-200">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:bg-accent/50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6 pt-0">
                          <div className="bg-accent/30 p-4 rounded-lg">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {searchTerm && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any questions matching "{searchTerm}". Try a different search term or browse our categories above.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Have Questions CTA */}
        <Card className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20 text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Still have questions?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help! 
                Use our chat or Contact Us form — we're here to help make your CostEclipse experience amazing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-6 border-t">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Average response: 2 hours</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}