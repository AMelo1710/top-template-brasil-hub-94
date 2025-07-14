import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CodeContextType {
  hasValidNoAdsCode: boolean;
  setHasValidNoAdsCode: (valid: boolean) => void;
  hasValidPremiumCode: boolean;
  setHasValidPremiumCode: (valid: boolean) => void;
  hasValidCourseCode: boolean;
  setHasValidCourseCode: (valid: boolean) => void;
  resetAllCodes: () => void;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCodeContext must be used within a CodeProvider');
  }
  return context;
};

interface CodeProviderProps {
  children: ReactNode;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({ children }) => {
  const [hasValidNoAdsCode, setHasValidNoAdsCode] = useState(false);
  const [hasValidPremiumCode, setHasValidPremiumCode] = useState(false);
  const [hasValidCourseCode, setHasValidCourseCode] = useState(false);

  const resetAllCodes = () => {
    setHasValidNoAdsCode(false);
    setHasValidPremiumCode(false);
    setHasValidCourseCode(false);
  };

  return (
    <CodeContext.Provider
      value={{
        hasValidNoAdsCode,
        setHasValidNoAdsCode,
        hasValidPremiumCode,
        setHasValidPremiumCode,
        hasValidCourseCode,
        setHasValidCourseCode,
        resetAllCodes,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}; 