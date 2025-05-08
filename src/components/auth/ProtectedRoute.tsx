
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabase } from '@/lib/supabase-provider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useSupabase();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-violet-500" />
        <p className="mt-4 text-muted-foreground">Loading your account...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but remember where the user was trying to go
    return <Navigate to="/login" state={{ returnTo: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
