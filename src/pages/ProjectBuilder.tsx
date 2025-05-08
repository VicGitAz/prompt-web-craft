
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Send, Download, Code, Eye, Settings, LayoutDashboard } from "lucide-react";
import { useApiService } from "@/lib/api-service";

const ProjectBuilder = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState("");
  const [processing, setProcessing] = useState(false);
  const [modelProvider, setModelProvider] = useState("openai");
  const [generatedCode, setGeneratedCode] = useState("");
  const [projectConfig, setProjectConfig] = useState({
    name: "My Project",
    description: "A web application created with WebCraft",
    apiKey: "",
  });
  const { generateApp } = useApiService();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setProcessing(true);

    try {
      // In a real app, this would call your Supabase function to generate code
      const result = await generateApp({
        prompt,
        provider: modelProvider,
        projectId: id || "new",
      });

      // For demo purposes, let's just set some mock generated code
      setGeneratedCode(`// Generated ${new Date().toLocaleDateString()}
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Hello World App</h1>
      <p className="text-xl mb-8">This is a simple counter app generated from your prompt</p>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <p className="text-3xl font-bold mb-4">{count}</p>
        <div className="flex gap-4">
          <button 
            className="px-6 py-2 bg-white text-purple-600 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={() => setCount(count - 1)}
          >
            Decrease
          </button>
          <button
            className="px-6 py-2 bg-white text-purple-600 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={() => setCount(count + 1)}
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
`);

      toast.success("App generated successfully!");
    } catch (error: any) {
      console.error("Error generating app:", error);
      toast.error(`Failed to generate app: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleSaveConfig = () => {
    toast.success("Project settings saved");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{projectConfig.name}</h1>
          <p className="text-muted-foreground">{projectConfig.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Project saved")}>
            Save
          </Button>
          <Button size="sm" onClick={() => toast.success("Project published")}>
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="prompt">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>Builder</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Code</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Generate your app</h2>
                <p className="text-muted-foreground mb-4">
                  Describe the web application you want to build in detail.
                </p>
                <Textarea
                  placeholder="Create a responsive landing page for a fitness app with a hero section, features list, pricing table, and contact form..."
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <label className="text-sm font-medium">Model Provider</label>
                  <Select value={modelProvider} onValueChange={setModelProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="google">Google Gemini</SelectItem>
                      <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                      <SelectItem value="azure">Azure OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="flex-1 sm:flex-none"
                  onClick={handleGenerate}
                  disabled={processing || !prompt.trim()}
                >
                  {processing ? "Generating..." : "Generate"}
                  {!processing && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </Card>

          {generatedCode && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Preview</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Live
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="aspect-video bg-card border rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
                    <p className="text-3xl font-bold mb-4">0</p>
                    <div className="flex gap-4 justify-center">
                      <button className="px-6 py-2 bg-violet-500 text-white rounded-md">
                        Decrease
                      </button>
                      <button className="px-6 py-2 bg-violet-500 text-white rounded-md">
                        Increase
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-3">
                    <h3 className="text-sm font-medium mb-2">Generated Components</h3>
                  </div>
                  {["App", "Counter", "Button"].map((component) => (
                    <Card key={component} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span>{component}</span>
                        <Badge variant="outline">React</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Generated Code</h2>
              {generatedCode ? (
                <pre className="code-editor overflow-auto">
                  {generatedCode}
                </pre>
              ) : (
                <div className="bg-muted rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">
                    Generate an app first to see the code here.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Project Settings</h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input 
                    id="project-name" 
                    value={projectConfig.name} 
                    onChange={(e) => setProjectConfig({...projectConfig, name: e.target.value})} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-desc">Description</Label>
                  <Textarea 
                    id="project-desc" 
                    value={projectConfig.description} 
                    onChange={(e) => setProjectConfig({...projectConfig, description: e.target.value})} 
                    rows={3} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input 
                    id="api-key" 
                    type="password" 
                    value={projectConfig.apiKey} 
                    onChange={(e) => setProjectConfig({...projectConfig, apiKey: e.target.value})}
                    placeholder="Enter your API key" 
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll need an API key from your selected model provider to generate apps
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="advanced-features" />
                  <Label htmlFor="advanced-features">Enable advanced features</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Reset</Button>
                <Button onClick={handleSaveConfig}>Save Settings</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectBuilder;
