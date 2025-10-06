import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Users,
  Globe,
  Brain,
  Zap,
  Clock
} from "lucide-react";

export function ThemeDemo() {
  const [verificationResults, setVerificationResults] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockResults = [
      {
        id: 1,
        title: "Breaking: Scientists Discover New Species",
        status: "verified",
        confidence: 92,
        sources: 8,
        timestamp: "2 minutes ago"
      },
      {
        id: 2,
        title: "Cryptocurrency Market Manipulation Exposed",
        status: "fake",
        confidence: 87,
        sources: 12,
        timestamp: "5 minutes ago"
      },
      {
        id: 3,
        title: "Climate Change Policy Updates",
        status: "uncertain",
        confidence: 65,
        sources: 4,
        timestamp: "8 minutes ago"
      }
    ];
    setVerificationResults(mockResults);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fake':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'uncertain':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'fake':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'uncertain':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'from-green-500 to-emerald-600';
    if (confidence >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FactCheck Pro Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time news verification with AI-powered analysis and dark mode optimized for extended use
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { icon: Brain, label: "AI Accuracy", value: "94.7%", color: "text-primary" },
            { icon: Zap, label: "Avg Speed", value: "1.8s", color: "text-secondary" },
            { icon: Globe, label: "Sources", value: "50K+", color: "text-accent" },
            { icon: Users, label: "Active Users", value: "2.1M", color: "text-green-500" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-muted to-muted/50`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="max-w-7xl mx-auto">
        <Card className="border-border/50 bg-card/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Recent Verifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationResults.map((result) => (
              <div 
                key={result.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(result.status)}
                  <div>
                    <h3 className="font-medium text-foreground">{result.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge className={getStatusColor(result.status)}>
                        {result.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{result.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getConfidenceColor(result.confidence)} transition-all duration-500`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Sources</p>
                    <p className="font-medium">{result.sources}</p>
                  </div>
                  
                  <Button size="sm" variant="outline" className="hover:bg-primary/10">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tools */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Text Analysis",
              description: "Paste or type news content for instant verification",
              icon: Shield,
              gradient: "from-primary to-primary/70"
            },
            {
              title: "URL Scanning",
              description: "Enter any news URL for comprehensive fact-checking",
              icon: Globe,
              gradient: "from-secondary to-secondary/70"
            },
            {
              title: "Image OCR",
              description: "Upload screenshots or images containing news text",
              icon: Brain,
              gradient: "from-accent to-accent/70"
            }
          ].map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card key={index} className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <CardContent className="p-6 relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${tool.gradient} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                  <Button className="mt-4 w-full" variant="outline">
                    Start Analysis
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}