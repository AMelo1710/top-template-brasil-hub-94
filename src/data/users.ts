import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@toptemplates.com',
    password: 'Admin123!',
    fullName: 'Administrador',
    username: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLogin: new Date('2025-01-15'),
    isActive: true
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'User123!',
    fullName: 'Usuário Exemplo',
    username: 'usuario',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15'),
    lastLogin: new Date('2025-01-10'),
    isActive: true
  }
];

// Função para carregar usuários do localStorage
const loadUsers = (): User[] => {
  const users = loadFromLocalStorage(STORAGE_KEYS.USERS, defaultUsers);
  return users.map(user => ({
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
  }));
};

// Função para salvar usuários no localStorage
const saveUsers = (users: User[]): void => {
  saveToLocalStorage(STORAGE_KEYS.USERS, users);
};

// Carregar usuários do localStorage
export const users = loadUsers();

// Função para verificar se um email já existe
export const checkEmailExists = (email: string): boolean => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Função para verificar se um username já existe
export const checkUsernameExists = (username: string): boolean => {
  return users.some(user => user.username.toLowerCase() === username.toLowerCase());
};

// Função para buscar usuário por email
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Função para buscar usuário por ID
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Função para adicionar novo usuário
export const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): User => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Função para atualizar usuário
export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  saveUsers(users);
  return users[userIndex];
};

// Função para atualizar último login
export const updateLastLogin = (id: string): void => {
  const user = findUserById(id);
  if (user) {
    user.lastLogin = new Date();
    saveUsers(users);
  }
};

// Função para autenticar usuário
export const authenticateUser = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  
  if (user && user.password === password && user.isActive) {
    updateLastLogin(user.id);
    return user;
  }
  
  return null;
};

// Função para redefinir senha
export const resetPassword = (email: string, newPassword: string): boolean => {
  const user = findUserByEmail(email);
  
  if (user) {
    user.password = newPassword;
    user.updatedAt = new Date();
    saveUsers(users);
    return true;
  }
  
  return false;
};

// Função para obter todos os usuários (para admin)
export const getAllUsers = (): User[] => {
  return users.map(user => ({
    ...user,
    password: '***' // Não retornar senhas
  }));
}; 