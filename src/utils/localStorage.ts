// Utilitários para gerenciar dados no localStorage

// Funções genéricas para localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(`Erro ao carregar ${key} do localStorage:`, error);
  }
  return defaultValue;
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover ${key} do localStorage:`, error);
  }
};

// Chaves para os dados
export const STORAGE_KEYS = {
  USERS: 'app_users',
  SESSIONS: 'app_sessions', 
  PRODUCTS: 'app_products',
  PRODUCT_CODES: 'app_product_codes',
  TEMPLATES: 'app_templates'
} as const;