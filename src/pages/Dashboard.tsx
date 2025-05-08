
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, Plus, Code, ImageIcon, ChevronRight } from 'lucide-react';
import { useSupabase } from '@/lib/supabase-provider';

const Dashboard = () => {
  const { user } = useSupabase();
  const [recentProjects] = useState([
    { id: 'demo-1', name: 'E-commerce Store', date: '2 days ago', preview: '/placeholder.svg' },
    { id: 'demo-2', name: 'Portfolio Site', date: '1 week ago', preview: '/placeholder.svg' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email?.split('@')[0] || 'User'}
          </p>
        </div>
        <Link to="/app/projects">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Total Projects', value: '2', icon: <Layers className="h-8 w-8 text-violet-500" /> },
          { title: 'API Credits', value: '985', icon: <Code className="h-8 w-8 text-violet-500" /> },
          { title: 'App Generations', value: '12', icon: <ImageIcon className="h-8 w-8 text-violet-500" /> },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Link to="/app/projects" className="text-sm text-violet-500 hover:underline flex items-center">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recentProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video bg-muted overflow-hidden">
                <img 
                  src={project.preview} 
                  alt={project.name} 
                  className="object-cover w-full h-full" 
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Updated {project.date}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex w-full gap-2">
                  <Link to={`/app/project/${project.id}`} className="flex-1">
                    <Button variant="default" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/app/preview/${project.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Preview
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}

          <Card className="border-dashed flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-secondary p-3 mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create New Project</h3>
            <p className="text-center text-muted-foreground mb-4">
              Create a new web application from a simple prompt
            </p>
            <Link to="/app/projects">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
