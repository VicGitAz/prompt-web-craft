
import { createContext, useContext } from 'react';
import { toast } from 'sonner';
import { useSupabase } from './supabase-provider';

interface GenerateAppParams {
  prompt: string;
  provider: string;
  projectId: string;
}

interface ApiServiceContextType {
  generateApp: (params: GenerateAppParams) => Promise<any>;
  listModels: () => Promise<any>;
}

const ApiServiceContext = createContext<ApiServiceContextType>({
  generateApp: async () => ({}),
  listModels: async () => ([]),
});

export const ApiServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { supabase } = useSupabase();

  const generateApp = async ({ prompt, provider, projectId }: GenerateAppParams) => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      
      // In a real app, this would call a Supabase Edge Function to interact with the AI provider
      // const { data, error } = await supabase.functions.invoke('generate-app', {
      //   body: { prompt, provider, projectId },
      // });
      
      // if (error) throw error;

      // For demo purposes, let's return a mock response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      return {
        id: 'generated-123',
        timestamp: new Date().toISOString(),
        code: '// Generated app code would be here',
        assets: [],
      };
    } catch (error: any) {
      console.error('Error generating app:', error);
      toast.error(`Error generating app: ${error.message}`);
      throw error;
    }
  };

  const listModels = async () => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      
      // In a real app, this would call a Supabase Edge Function
      // const { data, error } = await supabase.functions.invoke('list-models', {});
      
      // if (error) throw error;

      // For demo purposes, let's return a mock list
      return [
        { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
        { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic' },
        { id: 'gemini-pro', name: 'Gemini Pro', provider: 'google' },
      ];
    } catch (error: any) {
      console.error('Error listing models:', error);
      toast.error(`Error listing models: ${error.message}`);
      throw error;
    }
  };

  return (
    <ApiServiceContext.Provider
      value={{
        generateApp,
        listModels,
      }}
    >
      {children}
    </ApiServiceContext.Provider>
  );
};

export const useApiService = () => {
  const context = useContext(ApiServiceContext);
  if (context === undefined) {
    throw new Error('useApiService must be used within a ApiServiceProvider');
  }
  return context;
};
