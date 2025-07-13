import React, { createContext, useContext } from 'react';
import { AppContextType } from '@/types/app';
import { useAppState } from '@/hooks/useAppState';

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Hook para usar o contexto da aplicação
 * @returns Contexto da aplicação com estado e funções
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

/**
 * Provider do contexto da aplicação
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appState = useAppState();

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  );
};