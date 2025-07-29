import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  MessageCircle, 
  Phone,
  MapPin,
  Clock,
  Send,
  Globe,
  Headphones,
  FileText,
  CheckCircle,
  Star
} from 'lucide-react';

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const contactMethods = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      availability: '24/7 Available',
      responseTime: 'Usually within 2 minutes',
      action: 'Start Chat',
      best: 'Quick questions and immediate assistance'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message about your inquiry',
      icon: Mail,
      color: 'from-green-500 to-emerald-500',
      availability: 'Business Hours',
      responseTime: 'Within 2-4 hours',
      action: 'Send Email',
      best: 'Complex issues and detailed explanations'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support specialists',
      icon: Phone,
      color: 'from-purple-500 to-violet-500',
      availability: 'Mon-Fri 9AM-6PM IST',
      responseTime: 'Immediate connection',
      action: 'Call Now',
      best: 'Urgent issues and personal assistance'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Questions' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Requests' },
    { value: 'bug', label: 'Bug Reports' },
    { value: 'security', label: 'Security Concerns' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'other', label: 'Other' }
  ];

  const officeInfo = {
    address: 'CostEclipse Technologies',
    street: '123 Innovation Drive, Tech Park',
    city: 'Bangalore, Karnataka 560001',
    country: 'India',
    phone: '+91 80 1234 5678',
    email: 'support@costeclipse.app',
    hours: {
      weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM IST',
      weekends: 'Saturday - Sunday: 10:00 AM - 4:00 PM IST'
    }
  };

  const supportStats = [
    { metric: '96.8%', label: 'Satisfaction Rate', description: 'Happy customers' },
    { metric: '2.4 hrs', label: 'Avg Response Time', description: 'Quick resolutions' },
    { metric: '15k+', label: 'Issues Resolved', description: 'This year alone' },
    { metric: '24/7', label: 'Chat Available', description: 'Always here for you' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-success text-white">
              <Headphones className="mr-2 h-4 w-4" />
              Contact Support
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Have questions about CostEclipse? Need technical support? Want to share feedback? 
              Our dedicated support team is ready to assist you with any inquiry.
            </p>
            
            {/* Support Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {supportStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    {stat.metric}
                  </div>
                  <div className="font-semibold text-lg">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Preferred Contact Method</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer multiple ways to get in touch. Pick the method that works best for your situation.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card key={method.id} className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center space-y-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                          <p className="text-muted-foreground">{method.description}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4">
                        <div className="bg-accent/30 p-4 rounded-lg space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{method.availability}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">{method.responseTime}</span>
                          </div>
                        </div>
                        
                        <div className="bg-background/60 p-4 rounded-lg">
                          <h5 className="font-medium text-sm mb-2">Best For:</h5>
                          <p className="text-sm text-muted-foreground">{method.best}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white`}>
                        {method.action}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Send Us a Message</h3>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        {supportCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        placeholder="Please describe your inquiry in detail..."
                      />
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>

              {/* Office Information */}
              <div className="space-y-8">
                {/* Office Details */}
                <Card className="p-6 lg:p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold">Office Information</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Address</h4>
                        <div className="text-muted-foreground space-y-1">
                          <p>{officeInfo.address}</p>
                          <p>{officeInfo.street}</p>
                          <p>{officeInfo.city}</p>
                          <p>{officeInfo.country}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Contact</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-primary" />
                              <span>{officeInfo.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              <span>{officeInfo.email}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Hours</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>{officeInfo.hours.weekdays}</p>
                            <p>{officeInfo.hours.weekends}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Links */}
                <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Quick Help</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Visit Help Center
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        View FAQ
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        Check System Status
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Testimonial */}
                <Card className="p-6 lg:p-8 bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-warning" />
                      ))}
                    </div>
                    <blockquote className="text-sm italic">
                      "The CostEclipse support team is incredibly responsive and helpful. 
                      They resolved my issue within minutes of reaching out!"
                    </blockquote>
                    <div className="text-sm">
                      <span className="font-medium">Sarah K.</span>
                      <span className="text-muted-foreground"> - Premium User</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}