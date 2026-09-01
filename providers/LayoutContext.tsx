// contexts/LayoutContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, ComponentType, Dispatch, SetStateAction } from 'react';

interface LayoutContextType {
  ActiveItem: ComponentType | null;
  setItem: Dispatch<SetStateAction<ComponentType | null >>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [ActiveItem, setItem] = useState<ComponentType | null>(null);

  return (
    <LayoutContext.Provider value={{ ActiveItem, setItem }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
};