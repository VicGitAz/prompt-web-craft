
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "./lib/supabase-provider";
import { ApiServiceProvider } from "./lib/api-service";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectBuilder from "./pages/ProjectBuilder";
import ProjectPreview from "./pages/ProjectPreview";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseProvider>
      <ApiServiceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/app" element={<Layout />}>
                <Route 
                  index 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="projects" 
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="project/:id" 
                  element={
                    <ProtectedRoute>
                      <ProjectBuilder />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="preview/:id" 
                  element={
                    <ProtectedRoute>
                      <ProjectPreview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ApiServiceProvider>
    </SupabaseProvider>
  </QueryClientProvider>
);

export default App;
