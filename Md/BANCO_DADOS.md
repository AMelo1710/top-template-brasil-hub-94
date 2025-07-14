# Sistema de Banco de Dados - Top Templates Brasil

## Visão Geral

O sistema implementa um banco de dados simulado para gerenciar usuários, autenticação e sessões. Todos os dados são armazenados em memória durante a execução da aplicação.

## Estrutura do Banco de Dados

### 1. Usuários (`src/data/users.ts`)

#### Interface User:
```typescript
interface User {
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
```

#### Funcionalidades:
- **Verificação de email**: `checkEmailExists(email)`
- **Verificação de username**: `checkUsernameExists(username)`
- **Busca por email**: `findUserByEmail(email)`
- **Busca por ID**: `findUserById(id)`
- **Adicionar usuário**: `addUser(userData)`
- **Atualizar usuário**: `updateUser(id, updates)`
- **Autenticar usuário**: `authenticateUser(email, password)`
- **Redefinir senha**: `resetPassword(email, newPassword)`

### 2. Sessões (`src/data/sessions.ts`)

#### Interface Session:
```typescript
interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}
```

#### Funcionalidades:
- **Criar sessão**: `createSession(userId)`
- **Validar sessão**: `validateSession(token)`
- **Obter usuário da sessão**: `getUserFromSession(token)`
- **Encerrar sessão**: `endSession(token)`
- **Limpar sessões expiradas**: `cleanupExpiredSessions()`

### 3. Autenticação (`src/hooks/useAuth.tsx`)

#### Contexto de Autenticação:
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email, password) => Promise<{success, message}>;
  signup: (userData) => Promise<{success, message}>;
  logout: () => void;
  updateProfile: (updates) => Promise<{success, message}>;
  resetUserPassword: (email, newPassword) => Promise<{success, message}>;
  checkAuth: () => boolean;
}
```

## Usuários de Teste

### Admin:
- **Email**: `admin@toptemplates.com`
- **Senha**: `Admin123!`
- **Nome**: Administrador
- **Username**: admin

### Usuário Exemplo:
- **Email**: `user@example.com`
- **Senha**: `User123!`
- **Nome**: Usuário Exemplo
- **Username**: usuario

## Funcionalidades Implementadas

### 1. Login
- Validação de email e senha
- Verificação de usuário ativo
- Criação de sessão
- Armazenamento de token no localStorage
- Atualização de último login

### 2. Signup (Criar Conta)
- Verificação de email único
- Verificação de username único
- Criação de usuário
- Criação automática de sessão
- Redirecionamento após criação

### 3. Redefinir Senha
- Verificação de email existente
- Atualização de senha
- Notificação de sucesso/erro

### 4. Editar Perfil
- Atualização de dados do usuário
- Validação de usuário autenticado
- Persistência de mudanças

### 5. Logout
- Encerramento de sessão
- Limpeza de localStorage
- Reset de estado do usuário

## Persistência de Dados

### Durante a Sessão:
- Todos os dados ficam em memória
- Sessões são mantidas por 24 horas
- Token é armazenado no localStorage

### Ao Recarregar:
- Token é verificado automaticamente
- Sessão é validada
- Usuário é restaurado se válido

## Validações

### Email:
- Formato válido de email
- Verificação de existência no banco

### Senha:
- Mínimo 8 caracteres
- Pelo menos uma maiúscula
- Pelo menos uma minúscula
- Pelo menos um caractere especial

### Username:
- Verificação de unicidade
- Formato válido

## Segurança

### Tokens:
- Gerados aleatoriamente
- Expiração de 24 horas
- Validação de integridade

### Senhas:
- Armazenadas em texto plano (apenas para demonstração)
- Em produção, devem ser criptografadas

### Sessões:
- Limpeza automática de sessões expiradas
- Validação de token a cada requisição

## Como Testar

### 1. Login:
```
Email: admin@toptemplates.com
Senha: Admin123!
```

### 2. Criar Nova Conta:
- Preencher formulário de signup
- Verificar validações
- Confirmar criação

### 3. Redefinir Senha:
- Acessar página de forgot-password
- Inserir email existente
- Definir nova senha

### 4. Editar Perfil:
- Fazer login
- Acessar /plataform/profile
- Modificar dados
- Salvar alterações

### 5. Logout:
- Clicar em logout
- Verificar limpeza de dados
- Tentar acessar área protegida

## Arquivos Principais

### `src/data/users.ts`
- Banco de dados de usuários
- Funções de CRUD
- Validações de usuário

### `src/data/sessions.ts`
- Gerenciamento de sessões
- Tokens de autenticação
- Validação de sessões

### `src/hooks/useAuth.tsx`
- Contexto de autenticação
- Hook useAuth
- Provider de autenticação

### `src/App.tsx`
- Integração do AuthProvider
- Configuração de contexto

## Próximos Passos

1. **Criptografia**: Implementar hash de senhas
2. **Backend Real**: Migrar para API com banco de dados real
3. **Refresh Tokens**: Implementar renovação automática
4. **Validações Avançadas**: Adicionar mais regras de validação
5. **Recuperação de Conta**: Implementar email de recuperação
6. **Perfis Avançados**: Adicionar mais campos ao perfil 