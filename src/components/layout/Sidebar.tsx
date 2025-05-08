
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Settings, 
  LogOut,
  Code
} from 'lucide-react';
import { useSupabase } from '@/lib/supabase-provider';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { signOut } = useSupabase();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { title: 'Dashboard', path: '/app', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: 'Projects', path: '/app/projects', icon: <Layers className="w-5 h-5" /> },
    { title: 'Settings', path: '/app/settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <aside className={`bg-sidebar fixed md:relative inset-y-0 left-0 z-20 flex flex-col border-r border-border transition-all duration-300 ${open ? 'w-64' : 'w-0 md:w-16'} overflow-hidden`}>
      <div className="flex items-center h-16 px-4 border-b border-border">
        {open ? (
          <div className="flex items-center">
            <Code className="w-8 h-8 text-violet-500" />
            <span className="ml-2 text-lg font-semibold">WebCraft</span>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Code className="w-6 h-6 text-violet-500" />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                end={item.path === '/app'} 
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md transition-colors
                  ${isActive ? 'bg-violet-500 text-white' : 'hover:bg-sidebar-accent text-muted-foreground hover:text-foreground'}
                  ${!open ? 'justify-center' : ''}
                `}
              >
                {item.icon}
                {open && <span className="ml-3">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className={`w-full flex items-center text-muted-foreground hover:text-foreground ${!open ? 'justify-center' : ''}`}
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          {open && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
