import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/data/users';
import { Session } from '@/data/sessions';
import { authenticateUser, addUser, updateUser, resetPassword, findUserById, findUserByEmail } from '@/data/users';
import { createSession, validateSession, endSession, getUserFromSession } from '@/data/sessions';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: { email: string; password: string; fullName: string; username: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; message: string }>;
  resetUserPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sessão existente ao carregar
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const validSession = validateSession(token);
      if (validSession) {
        const userId = getUserFromSession(token);
        if (userId) {
          const userData = findUserById(userId);
          if (userData) {
            setUser(userData);
            setSession(validSession);
          }
        }
      } else {
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const authenticatedUser = authenticateUser(email, password);
      
      if (authenticatedUser) {
        const newSession = createSession(authenticatedUser.id);
        localStorage.setItem('authToken', newSession.token);
        
        setUser(authenticatedUser);
        setSession(newSession);
        
        return { success: true, message: 'Login realizado com sucesso!' };
      } else {
        return { success: false, message: 'Email ou senha incorretos.' };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
    }
  };

  const signup = async (userData: { email: string; password: string; fullName: string; username: string }): Promise<{ success: boolean; message: string }> => {
    try {
      // Verificar se email já existe
      const existingUser = findUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, message: 'Este email já está em uso.' };
      }

      const newUser = addUser(userData);
      const newSession = createSession(newUser.id);
      localStorage.setItem('authToken', newSession.token);
      
      setUser(newUser);
      setSession(newSession);
      
      return { success: true, message: 'Conta criada com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao criar conta. Tente novamente.' };
    }
  };

  const logout = () => {
    if (session) {
      endSession(session.token);
    }
    localStorage.removeItem('authToken');
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'Usuário não autenticado.' };
      }

      const updatedUser = updateUser(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
        return { success: true, message: 'Perfil atualizado com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao atualizar perfil.' };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao atualizar perfil. Tente novamente.' };
    }
  };

  const resetUserPassword = async (email: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const success = resetPassword(email, newPassword);
      if (success) {
        return { success: true, message: 'Senha redefinida com sucesso!' };
      } else {
        return { success: false, message: 'Email não encontrado.' };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao redefinir senha. Tente novamente.' };
    }
  };

  const checkAuth = (): boolean => {
    return user !== null && session !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        resetUserPassword,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 