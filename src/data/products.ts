export interface ProductCode {
  code: string;
  productType: 'premium' | 'no-ads' | 'course';
  validity: Date;
  usageStatus: 'valid' | 'invalid' | 'expired';
  usedAt?: Date;
  usedBy?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  color: string;
  iconColor: string;
  platforms: string[];
}

// Produtos disponíveis
export const products: Product[] = [
  {
    id: 'premium',
    title: 'Acesso Premium',
    description: 'Acesso completo a todos os templates premium com recursos avançados e suporte prioritário.',
    price: 49.90,
    icon: 'Crown',
    color: 'bg-yellow-200',
    iconColor: 'text-yellow-600',
    platforms: ['Canva', 'PowerPoint', 'Google Presentation']
  },
  {
    id: 'no-ads',
    title: 'Remover Anúncios',
    description: 'Navegue pela plataforma sem interrupções de anúncios e tenha uma experiência mais fluida.',
    price: 19.90,
    icon: 'Zap',
    color: 'bg-green-200',
    iconColor: 'text-green-600',
    platforms: ['Canva', 'PowerPoint']
  },
  {
    id: 'course',
    title: 'Acessar Curso',
    description: 'Curso completo de design com tutoriais passo a passo e certificado de conclusão.',
    price: 89.90,
    icon: 'PlayCircle',
    color: 'bg-purple-200',
    iconColor: 'text-purple-600',
    platforms: ['Canva', 'Google Presentation']
  }
];

// Códigos de resgate (simulando um banco de dados)
export const productCodes: ProductCode[] = [
  {
    code: 'PREMIUM2025',
    productType: 'premium',
    validity: new Date('2025-12-31'),
    usageStatus: 'valid'
  },
  {
    code: 'NOADS2025',
    productType: 'no-ads',
    validity: new Date('2025-12-31'),
    usageStatus: 'valid'
  },
  {
    code: 'COURSE2025',
    productType: 'course',
    validity: new Date('2025-12-31'),
    usageStatus: 'valid'
  },
  {
    code: 'TESTE123',
    productType: 'no-ads',
    validity: new Date('2025-12-31'),
    usageStatus: 'expired'
  },
  {
    code: 'USADO456',
    productType: 'premium',
    validity: new Date('2025-12-31'),
    usageStatus: 'invalid',
    usedAt: new Date('2025-01-15'),
    usedBy: 'user123'
  },
  {
    code: 'TESTE1234',
    productType: 'no-ads',
    validity: new Date('2025-12-31'),
    usageStatus: 'valid'
  },
  {
    code: 'TESTE12345',
    productType: 'no-ads',
    validity: new Date('2025-12-31'),
    usageStatus: 'valid'
  },
];

// Função para validar código de resgate
export const validateProductCode = (code: string): { isValid: boolean; message: string; productType?: string } => {
  const productCode = productCodes.find(pc => pc.code === code.toUpperCase());
  
  if (!productCode) {
    return { isValid: false, message: 'Código não existe ou já foi usado.' };
  }

  // Verificar se o código expirou
  if (new Date() > productCode.validity) {
    // Atualizar status para expirado
    productCode.usageStatus = 'expired';
    return { isValid: false, message: 'Código expirado.' };
  }

  // Verificar se já foi usado
  if (productCode.usageStatus === 'invalid') {
    return { isValid: false, message: 'Código já foi usado.' };
  }

  // Verificar se está expirado
  if (productCode.usageStatus === 'expired') {
    return { isValid: false, message: 'Código expirado.' };
  }

  return { 
    isValid: true, 
    message: 'Código válido! Acesso liberado com sucesso.',
    productType: productCode.productType
  };
};

// Função para usar um código
export const useProductCode = (code: string, userId?: string): boolean => {
  const productCode = productCodes.find(pc => pc.code === code.toUpperCase());
  
  if (!productCode || productCode.usageStatus !== 'valid') {
    return false;
  }

  // Marcar como usado
  productCode.usageStatus = 'invalid';
  productCode.usedAt = new Date();
  productCode.usedBy = userId;

  return true;
};

// Função para obter produto por ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Função para obter todos os produtos
export const getAllProducts = (): Product[] => {
  return products;
}; 