import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  ExternalLink, 
  TrendingUp,
  Shield,
  MessageSquare,
  Share2
} from "lucide-react";

interface ResultsDashboardProps {
  analysisData: any;
  onNavigate: (page: string) => void;
}

export function ResultsDashboard({ analysisData, onNavigate }: ResultsDashboardProps) {
  const [highlightedText, setHighlightedText] = useState<string[]>([]);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Analysis Data</h2>
          <Button onClick={() => onNavigate('analyze')}>Start New Analysis</Button>
        </div>
      </div>
    );
  }

  const getVerdictIcon = () => {
    switch (analysisData.verdict) {
      case 'authentic':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'fake':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getVerdictColor = () => {
    switch (analysisData.verdict) {
      case 'authentic':
        return 'bg-green-500';
      case 'fake':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getVerdictText = () => {
    switch (analysisData.verdict) {
      case 'authentic':
        return 'Likely Authentic';
      case 'fake':
        return 'Likely Fake';
      default:
        return 'Uncertain';
    }
  };

  const keySignals = [
    { signal: "Source credibility", score: 85, status: "positive" },
    { signal: "Language patterns", score: 72, status: "neutral" },
    { signal: "Fact verification", score: 91, status: "positive" },
    { signal: "Bias detection", score: 45, status: "negative" }
  ];

  const externalSources = analysisData?.externalSources || [];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Analysis Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive fact-checking analysis with evidence and confidence scoring
          </p>
        </div>

        {/* Main Verdict Card */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getVerdictIcon()}
                <div>
                  <CardTitle className="text-2xl">{getVerdictText()}</CardTitle>
                  <CardDescription>
                    Based on {analysisData.type} analysis
                  </CardDescription>
                </div>
              </div>
              <Badge 
                variant={analysisData.verdict === 'authentic' ? 'default' : 'destructive'}
                className="text-lg px-4 py-2"
              >
                {analysisData.confidence}% Confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Confidence Score</span>
                  <span>{analysisData.confidence}%</span>
                </div>
                <Progress 
                  value={analysisData.confidence} 
                  className="h-3"
                />
              </div>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  This analysis is based on AI algorithms and should be used alongside human judgment. 
                  Consider multiple sources before making final conclusions.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Content Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="signals">Key Signals</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Original Content</h4>
                      <div className="bg-muted p-4 rounded-lg text-sm">
                        <p className="font-medium mb-2">{analysisData.title}</p>
                        <p className="text-muted-foreground line-clamp-4">
                          {analysisData.content || analysisData.extractedText || "Content preview..."}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Highlighted Concerns</h4>
                      <div className="space-y-2">
                        <Badge variant="destructive" className="mr-2">
                          Unverified claims
                        </Badge>
                        <Badge variant="secondary" className="mr-2">
                          Emotional language
                        </Badge>
                        <Badge variant="outline" className="mr-2">
                          Missing context
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="signals" className="space-y-4">
                    {keySignals.map((signal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">{signal.signal}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={signal.score} className="w-20 h-2" />
                          <span className="text-sm font-medium">{signal.score}%</span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="metadata" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Analysis Type</p>
                        <p className="font-medium capitalize">{analysisData.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Processing Time</p>
                        <p className="font-medium">2.3 seconds</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Model Version</p>
                        <p className="font-medium">Sharingan v2.1</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Timestamp</p>
                        <p className="font-medium">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Provide Feedback
                </Button>
                <Button 
                  className="w-full justify-start"
                  onClick={() => onNavigate('analyze')}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  New Analysis
                </Button>
              </CardContent>
            </Card>

            {/* External Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5" />
                  <span>External Sources</span>
                </CardTitle>
                <CardDescription>
                  Cross-referenced information from trusted sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {externalSources.length > 0 ? (
                  externalSources.map((source, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{source.platform}</span>
                        <Badge 
                          variant={
                            source.status === 'confirms' ? 'default' : 
                            source.status === 'contradicts' ? 'destructive' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {source.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {source.snippet}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 h-8 px-2 text-xs"
                        onClick={() => window.open(source.url, '_blank')}
                      >
                        Read More <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ExternalLink className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      No external sources available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sources will appear after content analysis
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('analyze')}
            className=""
          >
            Analyze Another
          </Button>
          <Button 
            onClick={() => onNavigate('evidence')}
            className=""
          >
            View Detailed Evidence
          </Button>
        </div>
      </div>
    </div>
  );
}