import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Upload, FileText, Link, Image, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface AnalysisPageProps {
  onNavigate: (page: string) => void;
  onAnalyze: (data: any) => void;
}

export function AnalysisPage({ onNavigate, onAnalyze }: AnalysisPageProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("text");

  const generateExternalSources = (content, type) => {
    // Extract keywords from content for relevance
    const keywords = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const topKeywords = [...new Set(keywords)].slice(0, 3);
    
    // Determine topic/category from content
    const topic = getTopicFromContent(content);
    
    const allSources = [
      // International Sources
      {
        platform: "Reuters",
        baseUrl: "https://reuters.com/world/",
        status: Math.random() > 0.6 ? "confirms" : "neutral",
        snippet: `Reuters investigation reveals ${topKeywords[0] || 'key details'} about the situation, providing additional context.`
      },
      {
        platform: "BBC News", 
        baseUrl: "https://www.bbc.com/news/world-",
        status: Math.random() > 0.5 ? "confirms" : "neutral",
        snippet: `BBC analysis shows similar patterns in ${topKeywords[1] || 'recent reports'}, corroborating main claims.`
      },
      {
        platform: "Associated Press",
        baseUrl: "https://apnews.com/",
        status: Math.random() > 0.7 ? "confirms" : "contradicts",
        snippet: `AP fact-check team examines claims about ${topKeywords[0] || 'the topic'} with mixed findings.`
      },
      {
        platform: "CNN",
        baseUrl: "https://edition.cnn.com/",
        status: Math.random() > 0.6 ? "neutral" : "contradicts",
        snippet: `CNN reports additional details about ${topKeywords[2] || 'the incident'} that provide broader context.`
      },
      // Indian Sources
      {
        platform: "Hindustan Times",
        baseUrl: "https://www.hindustantimes.com/",
        status: Math.random() > 0.6 ? "confirms" : "neutral", 
        snippet: `Hindustan Times coverage includes local perspective on ${topKeywords[0] || 'developments'} with official statements.`
      },
      {
        platform: "The Economic Times",
        baseUrl: "https://economictimes.indiatimes.com/",
        status: Math.random() > 0.5 ? "confirms" : "neutral",
        snippet: `Economic Times analysis focuses on ${topKeywords[1] || 'economic impact'} and market implications.`
      },
      {
        platform: "The Hindu",
        baseUrl: "https://www.thehindu.com/",
        status: Math.random() > 0.7 ? "confirms" : "neutral",
        snippet: `The Hindu provides detailed coverage of ${topKeywords[0] || 'the story'} with expert commentary.`
      },
      {
        platform: "India Today",
        baseUrl: "https://www.indiatoday.in/",
        status: Math.random() > 0.6 ? "neutral" : "confirms",
        snippet: `India Today investigation reveals ${topKeywords[2] || 'additional facts'} related to the claims.`
      },
      {
        platform: "Times of India",
        baseUrl: "https://timesofindia.indiatimes.com/",
        status: Math.random() > 0.5 ? "confirms" : "neutral",
        snippet: `Times of India reports similar findings about ${topKeywords[1] || 'the issue'} from multiple sources.`
      },
      // Social Media & Tech Sources
      {
        platform: "Twitter",
        baseUrl: "https://twitter.com/search?q=",
        status: Math.random() > 0.4 ? "neutral" : "mixed",
        snippet: `Twitter discussions show varied opinions on ${topKeywords[0] || 'the topic'} with trending hashtags.`
      },
      {
        platform: "Reddit",
        baseUrl: "https://reddit.com/r/news/",
        status: Math.random() > 0.3 ? "mixed" : "contradicts",
        snippet: `Reddit community analysis of ${topKeywords[1] || 'the claims'} shows skeptical responses and fact-checking.`
      }
    ];

    // Select 3-4 relevant sources based on content and topic
    const selectedSources = allSources
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 3)
      .map(source => ({
        ...source,
        url: source.baseUrl + generateUrlSlug(topKeywords, topic)
      }));

    return selectedSources;
  };

  const getTopicFromContent = (content) => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('politics') || lowerContent.includes('election') || lowerContent.includes('government')) return 'politics';
    if (lowerContent.includes('economy') || lowerContent.includes('market') || lowerContent.includes('business')) return 'business';
    if (lowerContent.includes('health') || lowerContent.includes('medical') || lowerContent.includes('disease')) return 'health';
    if (lowerContent.includes('technology') || lowerContent.includes('tech') || lowerContent.includes('ai')) return 'technology';
    if (lowerContent.includes('sports') || lowerContent.includes('cricket') || lowerContent.includes('football')) return 'sports';
    return 'general';
  };

  const generateUrlSlug = (keywords, topic) => {
    const timestamp = Date.now().toString().slice(-6);
    const keywordSlug = keywords.slice(0, 2).join('-').replace(/[^a-z0-9-]/g, '');
    return `${topic}/${keywordSlug}-${timestamp}`;
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let analysisData;
    
    if (activeTab === "text") {
      const externalSources = textInput.trim() ? generateExternalSources(textInput, "text") : [];
      analysisData = {
        type: "text",
        title: titleInput || "User Submitted Article",
        content: textInput,
        verdict: Math.random() > 0.5 ? "authentic" : "fake",
        confidence: Math.floor(Math.random() * 30) + 70,
        signals: [
          "Language patterns analysis",
          "Source credibility check",
          "Fact verification",
          "Bias detection"
        ],
        externalSources
      };
    } else if (activeTab === "url") {
      const mockContent = `Article about ${new URL(urlInput).hostname} reporting on current events and developments`;
      const externalSources = generateExternalSources(mockContent, "url");
      analysisData = {
        type: "url",
        url: urlInput,
        title: "Article from " + new URL(urlInput).hostname,
        content: "Article content extracted from URL...",
        verdict: Math.random() > 0.5 ? "authentic" : "fake",
        confidence: Math.floor(Math.random() * 30) + 70,
        signals: [
          "Source domain reputation",
          "Content freshness",
          "Cross-reference verification",
          "Author credibility"
        ],
        externalSources
      };
    } else {
      const mockExtractedText = "Breaking news about recent developments in technology and politics affecting the economy";
      const externalSources = generateExternalSources(mockExtractedText, "image");
      analysisData = {
        type: "image",
        fileName: imageFile?.name || "uploaded-image.jpg",
        extractedText: "Text extracted from image using OCR...",
        verdict: Math.random() > 0.5 ? "authentic" : "fake",
        confidence: Math.floor(Math.random() * 30) + 70,
        signals: [
          "OCR text extraction",
          "Image metadata analysis",
          "Visual tampering detection",
          "Content verification"
        ],
        externalSources
      };
    }
    
    setIsAnalyzing(false);
    onAnalyze(analysisData);
    onNavigate('results');
  };

  const canAnalyze = () => {
    if (activeTab === "text") return textInput.trim().length > 10;
    if (activeTab === "url") return urlInput.trim().length > 0;
    if (activeTab === "image") return imageFile !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Analyze Your Content
          </h1>
          <p className="text-xl text-muted-foreground">
            Submit your news article, URL, or image for comprehensive fact-checking
          </p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Content Analysis</span>
            </CardTitle>
            <CardDescription>
              Choose your input method and provide the content you want to verify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <Link className="h-4 w-4" />
                  <span>URL</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center space-x-2">
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title (Optional)</Label>
                  <Input
                    id="title"
                    placeholder="Enter the article title..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Article Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your article content here..."
                    className="min-h-[200px]"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    {textInput.length} characters
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Article URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/article"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertDescription>
                    We'll automatically extract and analyze the content from the provided URL.
                    Make sure the article is publicly accessible.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {imageFile ? (
                      <div className="space-y-2">
                        <Image className="h-12 w-12 mx-auto text-green-500" />
                        <p className="font-medium">{imageFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setImageFile(null)}
                          className=""
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="font-medium">Click to upload an image</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, or JPEG up to 10MB
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          className="max-w-xs mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Alert>
                  <AlertDescription>
                    We'll use OCR technology to extract text from your image and analyze it for
                    potential misinformation.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => onNavigate('home')}
                className=""
              >
                Back to Home
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze() || isAnalyzing}
                className="min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Content"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}