import { useState, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  session: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: { email: string; password: string; fullName: string; username: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: any) => Promise<{ success: boolean; message: string }>;
  resetUserPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Funções mockadas
  const login = async () => ({ success: true, message: 'Login mockado' });
  const signup = async () => ({ success: true, message: 'Signup mockado' });
  const logout = () => {};
  const updateProfile = async () => ({ success: true, message: 'Update mockado' });
  const resetUserPassword = async () => ({ success: true, message: 'Reset mockado' });
  const checkAuth = () => false;

  return (
    <AuthContext.Provider value={{
      user, session, isLoading,
      login, signup, logout, updateProfile, resetUserPassword, checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 