
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Code, Layers, LayoutDashboard } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-violet-500" />
            <span className="font-bold text-xl">WebCraft</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create stunning web apps with <span className="hero-gradient">simple prompts</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 md:mb-12">
              Transform your ideas into fully functional web applications using AI.
              Just describe what you want, and WebCraft builds it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start building for free
                </Button>
              </Link>
              <Link to="/#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful features to bring your ideas to life</h2>
            <p className="text-muted-foreground">
              Our platform provides everything you need to create, customize, and deploy web applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8 mb-4 text-violet-500" />,
                title: "AI-Powered Generation",
                description: "Describe your vision in plain language and watch as our AI transforms it into clean, functional code."
              },
              {
                icon: <Layers className="h-8 w-8 mb-4 text-violet-500" />,
                title: "Multiple LLM Support",
                description: "Connect to OpenAI, Google Gemini, Anthropic Claude, and more to power your app generation."
              },
              {
                icon: <LayoutDashboard className="h-8 w-8 mb-4 text-violet-500" />,
                title: "Visual Editor",
                description: "Fine-tune your created apps with an intuitive visual editor - no coding experience required."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">
              Whether you're an indie creator or an enterprise team, we have plans that scale with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for trying out the platform",
                features: [
                  "5 app generations per month",
                  "Basic templates",
                  "Community support"
                ],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                description: "Everything you need for serious projects",
                features: [
                  "100 app generations per month",
                  "Premium templates",
                  "Custom domains",
                  "Priority support"
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Team",
                price: "$49",
                period: "/month",
                description: "For teams working on multiple projects",
                features: [
                  "Unlimited app generations",
                  "Team collaboration",
                  "API access",
                  "Dedicated support"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`
                  border rounded-lg p-6 relative flex flex-col
                  ${plan.popular ? 'border-violet-500 shadow-md' : 'border-border'}
                `}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                </div>
                <div className="flex-grow mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className={`w-full ${plan.popular ? '' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary/50 border-t border-border mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-violet-500" />
              <span className="font-bold text-lg">WebCraft</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span className="text-sm text-muted-foreground">© 2025 WebCraft. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
