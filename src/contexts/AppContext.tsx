import React, { createContext, useContext, useState, useEffect } from 'react';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  date: string;
  price: number;
}

interface User {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface AppContextType {
  favorites: Template[];
  saved: Template[];
  cart: Template[];
  user: User;
  addToFavorites: (template: Template) => void;
  removeFromFavorites: (id: string) => void;
  addToSaved: (template: Template) => void;
  removeFromSaved: (id: string) => void;
  addToCart: (template: Template) => void;
  removeFromCart: (id: string) => void;
  updateUser: (userData: Partial<User>) => void;
  isFavorite: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isInCart: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Template[]>([]);
  const [saved, setSaved] = useState<Template[]>([]);
  const [cart, setCart] = useState<Template[]>([]);
  const [user, setUser] = useState<User>({
    name: 'João Silva',
    username: 'joaosilva',
    email: 'joao@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedItems = localStorage.getItem('saved');
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedItems) setSaved(JSON.parse(savedItems));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const addToFavorites = (template: Template) => {
    setFavorites(prev => [...prev.filter(t => t.id !== template.id), template]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(t => t.id !== id));
  };

  const addToSaved = (template: Template) => {
    setSaved(prev => [...prev.filter(t => t.id !== template.id), template]);
  };

  const removeFromSaved = (id: string) => {
    setSaved(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (template: Template) => {
    setCart(prev => [...prev.filter(t => t.id !== template.id), template]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(t => t.id !== id));
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const isFavorite = (id: string) => favorites.some(t => t.id === id);
  const isSaved = (id: string) => saved.some(t => t.id === id);
  const isInCart = (id: string) => cart.some(t => t.id === id);

  return (
    <AppContext.Provider value={{
      favorites,
      saved,
      cart,
      user,
      addToFavorites,
      removeFromFavorites,
      addToSaved,
      removeFromSaved,
      addToCart,
      removeFromCart,
      updateUser,
      isFavorite,
      isSaved,
      isInCart
    }}>
      {children}
    </AppContext.Provider>
  );
};