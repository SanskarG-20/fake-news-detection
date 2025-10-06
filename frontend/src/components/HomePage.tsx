 
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Shield, 
  Search, 
  Zap, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Brain,
  Eye,
  Clock,
  Lock
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage({ onNavigate }) {

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced neural networks detect patterns invisible to the human eye",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Real-Time Detection",
      description: "Get results in under 2 seconds with our optimized processing",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Global Source Network",
      description: "Cross-verify against 50,000+ trusted sources worldwide",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Zero data retention policy ensures your content stays private",
      color: "from-purple-500 to-pink-500"
    }
  ];




  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-background dark:to-purple-950/30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-200 dark:bg-accent/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-15" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <div>
              <Badge variant="outline" className="mb-6 px-4 py-2 border-2 border-primary/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Powered by Advanced AI Technology
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Truth in the Age of
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Misinformation
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Instantly verify news authenticity with our AI-powered platform. 
                Upload text, paste URLs, or scan images to get real-time fact-checking with explainable results.
              </p>
            </div>

            <div>
              <div className="flex justify-center">
                <Button 
                  onClick={() => onNavigate('analyze')}
                  size="lg"
                  className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-secondary shadow-lg"
                >
                  Start Analyzing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Free to try • No registration required • Instant results
              </p>
            </div>
          </div>

          {/* Interactive Demo Preview */}
          <div className="mt-20">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <Card className="relative overflow-hidden border-2 border-border/50 shadow-2xl">
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-background rounded px-3 py-1 text-sm text-muted-foreground">
                      factcheck.pro/analyze
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Analysis Complete</span>
                      </div>
                      <h3 className="text-2xl font-semibold">Article Verified as Authentic</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Confidence Score</span>
                          <span className="font-semibold">94.7%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-[94.7%]" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cross-referenced with 12 trusted sources • Analysis completed in 1.8s
                      </p>
                    </div>
                    <div className="relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1597888619263-41e68f36c16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMG1pc2luZm9ybWF0aW9uJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzU5NTUzNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Mobile fact-checking"
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>



      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Eye className="h-4 w-4 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Advanced AI Detection Methods
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines multiple AI techniques to provide the most accurate 
              and reliable fact-checking available today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 relative overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Fact-Checking Today
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join millions of users who rely on FactCheck Pro to navigate the modern information landscape with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('analyze')}
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-lg shadow-lg"
            >
              Try It Free Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('about')}
              className="px-8 py-4 text-lg border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white group relative overflow-hidden"
            >
              <span className="flex items-center gap-2 relative z-10">
                Learn More
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-75">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>2-second analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Privacy protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>No signup required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}