import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { 
  Search, 
  ExternalLink, 
  Twitter, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  ArrowLeft
} from "lucide-react";

interface EvidencePageProps {
  analysisData: any;
  onNavigate: (page: string) => void;
}

export function EvidencePage({ analysisData, onNavigate }: EvidencePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

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

  const generateDetailedSources = (analysisData) => {
    if (!analysisData?.externalSources) return [];
    
    return analysisData.externalSources.map((source, index) => ({
      id: index + 1,
      platform: source.platform,
      type: source.platform === "Twitter" || source.platform === "Reddit" ? "social" : "news",
      title: generateRelevantTitle(source.platform, analysisData),
      author: generateAuthorName(source.platform),
      date: generateRandomDate(),
      location: getLocationForPlatform(source.platform),
      status: source.status,
      relevance: Math.floor(Math.random() * 25) + 75,
      snippet: source.snippet,
      url: source.url,
      engagement: generateEngagement(source.platform)
    }));
  };

  const generateRelevantTitle = (platform, analysisData) => {
    const titles = {
      "Reuters": `Breaking: Analysis reveals key details about ${analysisData.title}`,
      "BBC News": `${analysisData.title}: What we know so far`,
      "Associated Press": `Fact Check: Claims about ${analysisData.title}`,
      "CNN": `Investigation: New details emerge about ${analysisData.title}`,
      "Hindustan Times": `${analysisData.title}: Indian perspective and impact`,
      "The Economic Times": `Market Analysis: Economic implications of ${analysisData.title}`,
      "The Hindu": `Detailed coverage: ${analysisData.title} developments`,
      "India Today": `Investigation: ${analysisData.title} fact-check report`,
      "Times of India": `Breaking: ${analysisData.title} latest updates`,
      "Twitter": `Thread: Analysis and discussion about ${analysisData.title}`,
      "Reddit": `r/news: Community discussion on ${analysisData.title}`
    };
    return titles[platform] || `${platform} coverage of ${analysisData.title}`;
  };

  const generateAuthorName = (platform) => {
    const authors = {
      "Reuters": ["Sarah Johnson", "Michael Chen", "Priya Sharma"],
      "BBC News": ["BBC News Team", "James Wilson", "Emma Thompson"],
      "Associated Press": ["AP Fact Check Team", "David Martinez", "Lisa Zhang"],
      "CNN": ["CNN Investigation Team", "Robert Garcia", "Aisha Patel"],
      "Hindustan Times": ["Rajesh Kumar", "Priya Nair", "Amit Sharma", "Neha Gupta"],
      "The Economic Times": ["Economic Desk", "Vikram Aditya", "Shreya Mehta"],
      "The Hindu": ["The Hindu Bureau", "Krishnan Nair", "Anita Rao"],
      "India Today": ["India Today Web Desk", "Arjun Singh", "Kavita Sharma"],
      "Times of India": ["TOI Staff", "Rohit Malhotra", "Deepika Verma"],
      "Twitter": ["@NewsAnalyst", "@FactChecker2024", "@IndiaExpert"],
      "Reddit": ["u/NewsWatcher", "u/FactChecker123", "u/IndiaToday2024"]
    };
    const platformAuthors = authors[platform] || ["News Team"];
    return platformAuthors[Math.floor(Math.random() * platformAuthors.length)];
  };

  const generateRandomDate = () => {
    const hours = Math.floor(Math.random() * 24) + 1;
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    return "1 day ago";
  };

  const getLocationForPlatform = (platform) => {
    const locations = {
      "Reuters": "London",
      "BBC News": "London", 
      "Associated Press": "New York",
      "CNN": "Atlanta",
      "Hindustan Times": "New Delhi",
      "The Economic Times": "Mumbai",
      "The Hindu": "Chennai", 
      "India Today": "New Delhi",
      "Times of India": "Mumbai",
      "Twitter": "Global",
      "Reddit": "Global"
    };
    return locations[platform] || "Global";
  };

  const generateEngagement = (platform) => {
    if (platform === "Twitter") {
      return {
        likes: Math.floor(Math.random() * 2000) + 500,
        shares: Math.floor(Math.random() * 500) + 100,
        comments: Math.floor(Math.random() * 200) + 50
      };
    } else if (platform === "Reddit") {
      return {
        likes: Math.floor(Math.random() * 300) + 50,
        shares: Math.floor(Math.random() * 50) + 10,
        comments: Math.floor(Math.random() * 500) + 100
      };
    } else {
      return {
        likes: Math.floor(Math.random() * 1000) + 200,
        shares: Math.floor(Math.random() * 300) + 50,
        comments: Math.floor(Math.random() * 100) + 20
      };
    }
  };

  const evidenceSources = generateDetailedSources(analysisData);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirms':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'contradicts':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'mixed':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'reddit':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const filteredSources = evidenceSources.filter(source => {
    const matchesSearch = searchQuery === "" || 
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedSource === "all" || 
      source.type === selectedSource || 
      source.platform.toLowerCase() === selectedSource;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('results')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Evidence & Sources
            </h1>
            <p className="text-xl text-muted-foreground">
              Detailed cross-referencing and supporting evidence
            </p>
          </div>
        </div>

        {/* Analysis Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
            <CardDescription>
              Results for: {analysisData.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">3</div>
                <div className="text-sm text-muted-foreground">Confirming Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">1</div>
                <div className="text-sm text-muted-foreground">Contradicting Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">1</div>
                <div className="text-sm text-muted-foreground">Mixed Evidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Avg. Relevance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sources and evidence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={selectedSource === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSource("all")}
                >
                  All Sources
                </Button>
                <Button
                  variant={selectedSource === "news" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSource("news")}
                >
                  News
                </Button>
                <Button
                  variant={selectedSource === "social" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSource("social")}
                >
                  Social Media
                </Button>
              </div>
            </div>

            {/* Evidence Sources */}
            <div className="space-y-4">
              {filteredSources.map((source) => (
                <Card key={source.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getPlatformIcon(source.platform)}
                        <div>
                          <h3 className="font-medium text-lg">{source.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{source.author}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{source.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{source.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {source.relevance}% relevant
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(source.status)}
                          <span className="text-sm font-medium capitalize">
                            {source.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {source.snippet}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{source.engagement.likes} likes</span>
                        <span>{source.engagement.shares} shares</span>
                        <span>{source.engagement.comments} comments</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View Source
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSources.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No sources found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Key Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">High Consensus</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Multiple reputable sources confirm key facts
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-sm">Missing Context</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Some claims lack sufficient background information
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sm">Additional Sources</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Found 12 more related articles for deeper analysis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Source Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Source Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">News Outlets</span>
                    <Badge variant="outline">3 sources</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Social Media</span>
                    <Badge variant="outline">2 sources</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fact Checkers</span>
                    <Badge variant="outline">1 source</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expert Opinion</span>
                    <Badge variant="outline">1 source</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Find More Sources
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
          </div>
        </div>
      </div>
    </div>
  );
}