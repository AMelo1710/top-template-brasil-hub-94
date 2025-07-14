import { useState, useEffect } from 'react';
import { Template, User, AppContextType } from '@/types/app';

/**
 * Hook para gerenciar o estado da aplicação
 */
export const useAppState = (): AppContextType => {
  const [favorites, setFavorites] = useState<Template[]>([]);
  const [saved, setSaved] = useState<Template[]>([]);
  const [cart, setCart] = useState<Template[]>([]);
  const [user, setUser] = useState<User>({
    name: 'João Silva',
    username: 'joaosilva',
    email: 'joao@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  // Removido: useEffect para carregar dados do localStorage
  // Removido: useEffect para salvar dados no localStorage

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

  return {
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
  };
}; 