import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

// Função para carregar sessões do localStorage
const loadSessions = (): Session[] => {
  const sessions = loadFromLocalStorage(STORAGE_KEYS.SESSIONS, []);
  return sessions.map(session => ({
    ...session,
    createdAt: new Date(session.createdAt),
    expiresAt: new Date(session.expiresAt)
  }));
};

// Função para salvar sessões no localStorage
const saveSessions = (sessions: Session[]): void => {
  saveToLocalStorage(STORAGE_KEYS.SESSIONS, sessions);
};

// Carregar sessões do localStorage
export const sessions = loadSessions();

// Função para gerar token único
export const generateToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Função para criar nova sessão
export const createSession = (userId: string): Session => {
  const session: Session = {
    id: Date.now().toString(),
    userId,
    token: generateToken(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
    isActive: true
  };
  
  sessions.push(session);
  saveSessions(sessions);
  return session;
};

// Função para validar sessão
export const validateSession = (token: string): Session | null => {
  const session = sessions.find(s => s.token === token && s.isActive);
  
  if (session && new Date() < session.expiresAt) {
    return session;
  }
  
  return null;
};

// Função para obter usuário da sessão
export const getUserFromSession = (token: string) => {
  const session = validateSession(token);
  if (session) {
    return session.userId;
  }
  return null;
};

// Função para encerrar sessão
export const endSession = (token: string): boolean => {
  const session = sessions.find(s => s.token === token);
  
  if (session) {
    session.isActive = false;
    saveSessions(sessions);
    return true;
  }
  
  return false;
};

// Função para limpar sessões expiradas
export const cleanupExpiredSessions = (): void => {
  const now = new Date();
  let hasChanges = false;
  sessions.forEach(session => {
    if (session.expiresAt < now && session.isActive) {
      session.isActive = false;
      hasChanges = true;
    }
  });
  if (hasChanges) {
    saveSessions(sessions);
  }
};

// Função para obter sessão ativa do usuário
export const getActiveSession = (userId: string): Session | null => {
  return sessions.find(s => s.userId === userId && s.isActive && new Date() < s.expiresAt) || null;
}; 