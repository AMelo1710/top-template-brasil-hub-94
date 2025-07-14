# Sistema de Códigos de Resgate - Top Templates Brasil

## Visão Geral

O sistema implementa um mecanismo de códigos de resgate para produtos premium, permitindo que usuários acessem recursos especiais através de códigos válidos.

## Estrutura dos Templates

Cada template agora possui dois novos parâmetros:

- `freeLink`: Link para acessar o template gratuitamente (com anúncios)
- `noAdsLink`: Link para acessar o template sem anúncios (após validação de código)

### Exemplo de Template:
```typescript
{
  id: 'template-moderno',
  title: 'Template Moderno',
  // ... outros campos
  freeLink: 'https://www.canva.com/design/DAF123456/view',
  noAdsLink: 'https://www.canva.com/design/DAF123456/view?premium=true'
}
```

## Produtos Disponíveis

### 1. Acesso Premium
- **ID**: `premium`
- **Preço**: R$ 49,90
- **Descrição**: Acesso completo a todos os templates premium
- **Código de teste**: `PREMIUM2024`

### 2. Remover Anúncios
- **ID**: `no-ads`
- **Preço**: R$ 19,90
- **Descrição**: Navegação sem interrupções de anúncios
- **Código de teste**: `NOADS2024`

### 3. Acessar Curso
- **ID**: `course`
- **Preço**: R$ 89,90
- **Descrição**: Curso completo de design
- **Código de teste**: `COURSE2024`

## Códigos de Resgate

### Códigos Válidos:
- `PREMIUM2025` - Acesso Premium
- `NOADS2025` - Remover Anúncios
- `COURSE2025` - Acessar Curso

### Códigos de Teste (Inválidos):
- `TESTE123` - Código expirado
- `USADO456` - Código já usado

## Funcionamento do Sistema

### 1. Validação de Códigos
O sistema verifica:
- **Existência**: Se o código existe no banco de dados
- **Validade**: Se o código não expirou
- **Status**: Se o código não foi usado anteriormente

### 2. Fluxo de Uso
1. Usuário digita o código no modal ou na página de produtos
2. Sistema valida o código
3. Se válido:
   - Marca o código como usado
   - Libera acesso ao recurso no contexto global
   - Mostra notificação de sucesso
   - Botões "Acessar este design sem anúncios" passam a usar `noAdsLink` diretamente
4. Se inválido:
   - Mostra mensagem de erro específica
   - Mantém modal aberto (se aplicável)

### 3. Acesso aos Templates

#### Botão "Acessar este design"
- Usa o `freeLink` do template
- Abre em nova aba
- Acesso gratuito (com anúncios)

#### Botão "Acessar este design sem anúncios"
- **Sem código válido**: Abre modal de validação de códigos
- **Com código válido**: Acessa diretamente o `noAdsLink` do template
- Após validação bem-sucedida no modal:
  - Mostra botão "Acessar Este Design Sem Anúncios"
  - Usa o `noAdsLink` do template
  - Abre em nova aba

## Arquivos Principais

### `src/data/products.ts`
- Define produtos disponíveis
- Gerencia códigos de resgate
- Funções de validação e uso de códigos

### `src/data/templates.ts`
- Templates com `freeLink` e `noAdsLink`
- Estrutura de dados dos templates

### `src/contexts/CodeContext.tsx`
- Contexto global para gerenciar códigos válidos
- Estado persistente de acesso aos recursos

### `src/components/Template/NoAdsModal.tsx`
- Modal de validação de códigos
- Interface para acesso sem anúncios
- Marca códigos válidos no contexto

### `src/components/TemplateCard.tsx`
- Renderiza cards dos templates
- Integra botões de acesso
- Usa contexto para determinar comportamento do botão

### `src/pages/Cart.tsx`
- Página de produtos
- Sistema de resgate de códigos
- Marca códigos válidos no contexto

## Como Testar

1. **Acesso Gratuito**:
   - Clique em "Acessar este design"
   - Deve abrir o `freeLink` em nova aba

2. **Acesso Sem Anúncios**:
   - Clique em "Acessar este design sem anúncios"
   - Digite o código `NOADS2025`
   - Após validação, clique em "Acessar Este Design Sem Anúncios"
   - Deve abrir o `noAdsLink` em nova aba

3. **Códigos Inválidos**:
   - Teste códigos inexistentes
   - Teste códigos expirados (`TESTE123`)
   - Teste códigos já usados (`USADO456`)

## Estrutura de Dados

### ProductCode Interface:
```typescript
interface ProductCode {
  code: string;
  productType: 'premium' | 'no-ads' | 'course';
  validity: Date;
  usageStatus: 'valid' | 'invalid' | 'expired';
  usedAt?: Date;
  usedBy?: string;
}
```

### Template Interface:
```typescript
interface Template {
  id: string;
  title: string;
  // ... outros campos
  freeLink: string;
  noAdsLink: string;
}
```

## Próximos Passos

1. **Persistência**: Implementar armazenamento persistente dos códigos
2. **Backend**: Migrar para API real com banco de dados
3. **Segurança**: Adicionar criptografia e validações mais robustas
4. **Analytics**: Rastrear uso de códigos e templates
5. **Admin**: Interface para gerenciar códigos e produtos 