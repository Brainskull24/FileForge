import { useState } from "react";
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Play,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  User,
  Star,
  Filter,
  BookOpen,
  FileText,
  Zap,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import {
  quickHelpTopics,
  helpCategories,
  faqData,
  videoTutorials,
} from "../../data/helpConfigs";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  //   const [searchFilters, setSearchFilters] = useState({
  //     category: "all",
  //     type: "all",
  //     difficulty: "all",
  //   })

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Simulate search suggestions
      const suggestions = [
        "file conversion",
        "API authentication",
        "billing issues",
        "upload problems",
        "supported formats",
      ].filter((s) => s.toLowerCase().includes(query.toLowerCase()));
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions and get help with FileForge
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base"
                />
              </div>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg mt-1 z-10">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <Search className="inline h-3 w-3 mr-2 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Help Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickHelpTopics.map((topic, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <topic.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Help Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Help Categories</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {helpCategories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category.title)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-lg">
                            {category.title}
                          </CardTitle>
                          <Badge variant="secondary">
                            {category.count} articles
                          </Badge>
                        </div>
                        {expandedCategories.includes(category.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedCategories.includes(category.title) && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {category.articles.map((article, articleIndex) => (
                            <button
                              key={articleIndex}
                              className="text-left p-2 rounded hover:bg-muted transition-colors text-sm"
                              onClick={() => setSelectedArticle(article)}
                            >
                              <FileText className="inline h-3 w-3 mr-2 text-muted-foreground" />
                              {article}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="font-semibold text-lg mb-3 text-primary">
                      {category.category}
                    </h3>
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                          <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                            <span className="text-sm">Was this helpful?</span>
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Yes
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              No
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </Accordion>
            </section>

            {/* Video Tutorials */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Video Tutorials</h2>
              <Tabs defaultValue="getting-started" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="getting-started">
                    Getting Started
                  </TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
                </TabsList>

                {videoTutorials.map((category, index) => (
                  <TabsContent
                    key={index}
                    value={category.category.toLowerCase().replace(" ", "-")}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.videos.map((video, videoIndex) => (
                        <Card
                          key={videoIndex}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="relative">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                              {video.duration}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium">{video.title}</h4>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Get in touch with our
                  support team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Support</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and we'll get back to you as
                        soon as possible.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category">Issue Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">
                              Technical Issue
                            </SelectItem>
                            <SelectItem value="billing">
                              Billing Question
                            </SelectItem>
                            <SelectItem value="feature">
                              Feature Request
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Please describe your issue in detail..."
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Submit Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Support
                  <Badge variant="secondary" className="ml-2">
                    Enterprise
                  </Badge>
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <Badge variant="default" className="bg-green-500">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">File Processing</span>
                    <Badge variant="default" className="bg-green-500">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Web Dashboard</span>
                    <Badge variant="default" className="bg-green-500">
                      Operational
                    </Badge>
                  </div>
                  <Separator />
                  <Button variant="ghost" className="w-full text-sm">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Status Page
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Forum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Community Forum
                </CardTitle>
                <CardDescription>
                  Connect with other FileForge users and share knowledge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Recent Discussions</div>
                    <div className="text-muted-foreground mt-1">
                      • Best practices for batch processing
                      <br />• API rate limiting questions
                      <br />• New feature suggestions
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Forum
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Getting started with FileForge",
                    "Understanding file formats",
                    "API authentication guide",
                    "Troubleshooting upload issues",
                    "Billing and subscription FAQ",
                  ].map((article, index) => (
                    <button
                      key={index}
                      className="text-left text-sm p-2 rounded hover:bg-muted transition-colors w-full"
                    >
                      <BookOpen className="inline h-3 w-3 mr-2 text-muted-foreground" />
                      {article}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <Dialog
          open={!!selectedArticle}
          onOpenChange={() => setSelectedArticle(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedArticle}</DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />5 min read
                </span>
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Last updated: Dec 15, 2024
                </span>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This is a detailed article about {selectedArticle.toLowerCase()}
                . Here you would find comprehensive information, step-by-step
                instructions, code examples, and troubleshooting tips.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Table of Contents</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Overview</li>
                  <li>• Step-by-step instructions</li>
                  <li>• Common issues</li>
                  <li>• Best practices</li>
                </ul>
              </div>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <span className="text-sm">Was this article helpful?</span>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Yes
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  No
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
