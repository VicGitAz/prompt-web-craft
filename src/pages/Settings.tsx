
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    notifications: true,
    apiKeyOpenAI: '',
    apiKeyGoogle: '',
    apiKeyAnthropic: '',
    apiKeyAzure: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setLoading(false);
    }, 1000);
  };

  const handleSaveAPIKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('API keys saved successfully');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and API keys
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <form onSubmit={handleSaveProfile}>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={settings.name} 
                  onChange={e => setSettings({...settings, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={settings.email} 
                  onChange={e => setSettings({...settings, email: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notifications" 
                  checked={settings.notifications}
                  onCheckedChange={checked => setSettings({...settings, notifications: checked})}
                />
                <Label htmlFor="notifications">Enable email notifications</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading}>
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <form onSubmit={handleSaveAPIKeys}>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Connect your AI model providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="openai">OpenAI API Key</Label>
                <Input 
                  id="openai" 
                  type="password"
                  value={settings.apiKeyOpenAI} 
                  onChange={e => setSettings({...settings, apiKeyOpenAI: e.target.value})}
                  placeholder="sk-..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="google">Google Gemini API Key</Label>
                <Input 
                  id="google" 
                  type="password"
                  value={settings.apiKeyGoogle} 
                  onChange={e => setSettings({...settings, apiKeyGoogle: e.target.value})}
                  placeholder="AIza..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="anthropic">Anthropic API Key</Label>
                <Input 
                  id="anthropic" 
                  type="password"
                  value={settings.apiKeyAnthropic} 
                  onChange={e => setSettings({...settings, apiKeyAnthropic: e.target.value})}
                  placeholder="sk-ant-..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="azure">Azure OpenAI API Key</Label>
                <Input 
                  id="azure" 
                  type="password"
                  value={settings.apiKeyAzure} 
                  onChange={e => setSettings({...settings, apiKeyAzure: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading}>
                {loading ? 'Saving...' : 'Save API keys'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
