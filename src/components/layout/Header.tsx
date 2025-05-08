
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/supabase-provider";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useSupabase();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle Menu"
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
