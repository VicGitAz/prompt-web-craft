
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectPreview = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/app/project/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to editor</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Project Preview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="border-b px-4 py-2 bg-muted flex items-center">
          <div className="flex gap-1 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-muted-foreground">
            preview.webcraft.app
          </div>
        </div>
        <div className="aspect-[16/9] bg-white">
          {/* Here would typically be an iframe with your app preview */}
          <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-6">Hello World App</h1>
            <p className="text-xl mb-8">This is a simple counter app generated from your prompt</p>
            
            <div className="bg-violet-100 rounded-lg p-8 shadow-lg">
              <p className="text-3xl font-bold mb-4 text-violet-800">0</p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors">
                  Decrease
                </button>
                <button className="px-6 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors">
                  Increase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Desktop View</h3>
          <Button variant="outline" className="w-full">View Desktop</Button>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Mobile View</h3>
          <Button variant="outline" className="w-full">View Mobile</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
