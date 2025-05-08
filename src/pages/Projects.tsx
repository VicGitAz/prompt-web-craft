
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Layers, Plus, Search } from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    modelProvider: 'openai'
  });
  const [isCreating, setIsCreating] = useState(false);

  // Sample projects
  const [projects] = useState([
    { id: 'demo-1', name: 'E-commerce Store', description: 'A simple online store with product listings and cart', date: '2 days ago', preview: '/placeholder.svg' },
    { id: 'demo-2', name: 'Portfolio Site', description: 'Professional portfolio website with project showcases', date: '1 week ago', preview: '/placeholder.svg' },
    { id: 'demo-3', name: 'Blog Platform', description: 'Content management system with markdown support', date: '2 weeks ago', preview: '/placeholder.svg' },
    { id: 'demo-4', name: 'Task Manager', description: 'Kanban-style task management application', date: '1 month ago', preview: '/placeholder.svg' },
  ]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      // In a real app, this would call your Supabase function to create a project
      // const { data, error } = await supabase.from('projects').insert([newProject]);
      // if (error) throw error;

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Project "${newProject.name}" created successfully`);
      setIsDialogOpen(false);
      
      // Navigate to the project builder with the newly created project
      navigate(`/app/project/new-project-id`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Create and manage your web applications
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateProject}>
              <DialogHeader>
                <DialogTitle>Create new project</DialogTitle>
                <DialogDescription>
                  Add the details for your new web application project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Project name
                  </label>
                  <Input 
                    id="name" 
                    value={newProject.name} 
                    onChange={e => setNewProject({...newProject, name: e.target.value})} 
                    placeholder="My awesome project" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea 
                    id="description" 
                    value={newProject.description} 
                    onChange={e => setNewProject({...newProject, description: e.target.value})} 
                    placeholder="Describe your project..." 
                    rows={3} 
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="provider" className="text-sm font-medium">
                    AI Model Provider
                  </label>
                  <Select 
                    value={newProject.modelProvider} 
                    onValueChange={value => setNewProject({...newProject, modelProvider: value})}
                  >
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="google">Google Gemini</SelectItem>
                      <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                      <SelectItem value="azure">Azure OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
            <SelectItem value="za">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video bg-muted overflow-hidden">
              <img 
                src={project.preview} 
                alt={project.name} 
                className="object-cover w-full h-full" 
              />
            </div>
            <CardHeader className="pb-2 flex-1">
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              <p className="text-xs text-muted-foreground mt-2">Updated {project.date}</p>
            </CardHeader>
            <CardFooter className="pt-2 border-t">
              <div className="flex w-full gap-2">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => navigate(`/app/project/${project.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/app/preview/${project.id}`)}
                >
                  Preview
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* Create project card */}
        <Card className="border-dashed flex flex-col items-center justify-center p-8">
          <div className="rounded-full bg-secondary p-3 mb-4">
            <Layers className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Create New Project</h3>
          <p className="text-center text-muted-foreground mb-4">
            Start building a new web application
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Card>
      </div>

      {filteredProjects.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching "{searchQuery}".</p>
          <Button variant="link" onClick={() => setSearchQuery('')}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
