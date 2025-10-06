import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Shield, 
  Brain, 
  Globe, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Target,
  Zap,
  Lock,
  ArrowLeft,
  Calendar,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Detection",
      description: "Our proprietary algorithms analyze linguistic patterns, source credibility, and content structure to identify potential misinformation."
    },
    {
      icon: Globe,
      title: "Multi-Source Verification",
      description: "Cross-reference claims with trusted news outlets, fact-checkers, and authoritative sources worldwide."
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Get instant results with our optimized processing pipeline that analyzes content in under 3 seconds."
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your content is analyzed securely and not stored permanently. We prioritize user privacy and data protection."
    }
  ];

  const team = [
    {
      name: "Parshv Shah"
    },
    {
      name: "Harsh Prabhu"
    },
    {
      name: "Sanskar Gotad",
    },
    {
      name: "Kavya Satra",
    }
  ];

  const methodology = [
    {
      step: "1",
      title: "Content Ingestion",
      description: "Text extraction, URL parsing, or OCR processing for images"
    },
    {
      step: "2", 
      title: "Multi-Layer Analysis",
      description: "Linguistic analysis, source verification, and pattern recognition"
    },
    {
      step: "3",
      title: "Cross-Referencing",
      description: "Comparison with verified sources and fact-checking databases"
    },
    {
      step: "4",
      title: "Confidence Scoring",
      description: "AI-powered confidence calculation with explainable reasoning"
    }
  ];

  const sampleArticles = [
    {
      title: "Breaking: Scientists Discover New Climate Solution",
      source: "Reuters",
      time: "2 hours ago",
      status: "verified",
      confidence: 94
    },
    {
      title: "Local Election Results Show Unexpected Turnout",
      source: "Associated Press",
      time: "5 hours ago", 
      status: "verified",
      confidence: 98
    },
    {
      title: "Technology Breakthrough in Renewable Energy",
      source: "BBC News",
      time: "8 hours ago",
      status: "verified",
      confidence: 91
    },
    {
      title: "Economic Policy Changes Affect Global Markets",
      source: "Financial Times",
      time: "12 hours ago",
      status: "suspicious",
      confidence: 67
    },
    {
      title: "Health Study Reveals Important Findings",
      source: "The Guardian",
      time: "1 day ago",
      status: "verified",
      confidence: 89
    },
    {
      title: "Space Mission Achieves Milestone",
      source: "NASA News",
      time: "2 days ago",
      status: "verified",
      confidence: 96
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              About FactCheck Pro
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering informed decisions through AI-powered fact verification
            </p>
          </div>
        </div>

        {/* About FactCheck Pro Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      What is FactCheck Pro?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      FactCheck Pro is a comprehensive fake news detection platform that harnesses the power 
                      of artificial intelligence to combat misinformation in the digital age. Our platform 
                      provides users with the tools they need to verify news articles, analyze content 
                      authenticity, and make informed decisions about the information they consume and share.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Multi-Input Support</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyze content through text input, URL submission, or image uploads with OCR processing
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary">
                        <Brain className="h-5 w-5" />
                        <span className="font-semibold">AI-Powered Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Advanced machine learning algorithms provide accurate verdicts with confidence scoring
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary">
                        <Globe className="h-5 w-5" />
                        <span className="font-semibold">External Evidence</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cross-reference with Twitter/X, Reddit, and trusted news sources for comprehensive verification
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary">
                        <Target className="h-5 w-5" />
                        <span className="font-semibold">Explainable Results</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Detailed explanations highlight key signals and reasoning behind each analysis
                      </p>
                    </div>
                  </div>

                  <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Our Commitment</span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built with a sophisticated dark theme and responsive design, FactCheck Pro ensures 
                      accessibility across all devices. We prioritize user privacy, maintain transparency 
                      in our analysis methods, and continuously improve our algorithms to stay ahead of 
                      evolving misinformation tactics.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Platform Statistics</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                        <span className="font-semibold text-green-500">94.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Response Time</span>
                        <span className="font-semibold text-accent">2.3s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Supported Languages</span>
                        <span className="font-semibold text-secondary">25+</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-accent" />
                      <span>Key Features</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Real-time analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Interactive dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Confidence visualization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Source verification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Hover explanations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Feedback submission</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 text-primary mb-4">
                  <Shield className="h-6 w-6" />
                  <span className="font-medium">Our Mission</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Combating Misinformation with Cutting-Edge AI
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  In an era of information overload, FactCheck Pro serves as your trusted companion 
                  for navigating the complex media landscape. We combine advanced artificial intelligence 
                  with human expertise to provide transparent, accurate, and actionable insights about 
                  news content authenticity.
                </p>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGllbGQlMjBzZWN1cml0eSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzU5NDY4NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI-powered fact checking"
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Features */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              How We Detect Misinformation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform employs multiple layers of analysis to ensure comprehensive 
              and accurate fact-checking results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Methodology */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Analysis Process
            </h2>
            <p className="text-lg text-muted-foreground">
              A transparent, step-by-step approach to content verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mx-auto mb-3">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border transform -translate-y-1/2" />
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Expert Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Leading researchers and technologists dedicated to fighting misinformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{member.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnerships & Trust */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Trusted by Leading Organizations</CardTitle>
            <CardDescription>
              We partner with news organizations, fact-checkers, and educational institutions worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2">Reuters</Badge>
              <Badge variant="outline" className="px-4 py-2">Associated Press</Badge>
              <Badge variant="outline" className="px-4 py-2">Snopes</Badge>
              <Badge variant="outline" className="px-4 py-2">PolitiFact</Badge>
              <Badge variant="outline" className="px-4 py-2">BBC Verify</Badge>
              <Badge variant="outline" className="px-4 py-2">MIT Media Lab</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Ethics & Responsibility */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Ethics & Responsibility</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Transparency</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  We provide clear explanations for our AI decisions and maintain open documentation 
                  of our methodologies.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Bias Mitigation</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our diverse training data and continuous bias testing help ensure fair and 
                  balanced analysis across different perspectives.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Human Oversight</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Expert fact-checkers and journalists regularly review and validate our AI models 
                  to ensure accuracy and reliability.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Privacy First</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  User content is processed securely and not permanently stored. We prioritize 
                  privacy protection in all our operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Articles Display */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Sample Analysis Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Examples of our AI analysis in action
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles.slice(0, 6).map((article, index) => (
              <Card key={index} className="border rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{article.source}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{article.time}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-4 leading-tight">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        article.status === 'verified' ? 'bg-green-500' : 
                        article.status === 'suspicious' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm font-medium capitalize text-foreground">
                        {article.status}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {article.confidence}% confidence
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${
                        article.status === 'verified' ? 'bg-green-500' : 
                        article.status === 'suspicious' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${article.confidence}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Start Fact-Checking?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the fight against misinformation with our AI-powered platform
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={() => onNavigate('analyze')}
              size="lg"
              className="px-8"
            >
              Start Analysis
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}