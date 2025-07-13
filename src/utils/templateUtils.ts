import React from 'react';
import { Button } from '@/components/ui/button';
import { categoryColors, toolColors } from '@/data/templates';

/**
 * Renderiza uma tag de categoria com cores específicas
 */
export const renderCategoryTag = (category: string) => {
  const colors = categoryColors[category as keyof typeof categoryColors];
  if (!colors) return null;
  
  const isHotCategory = category === 'Em alta';
  
  return React.createElement('div', { className: 'relative' },
    React.createElement('span', {
      className: `inline-block px-3 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.hover} ${isHotCategory ? 'text-zinc-700' : colors.text} ${colors.border} transition-all duration-300 ${isHotCategory ? 'animate-pulse z-10' : ''}`,
      style: isHotCategory ? { position: 'relative', zIndex: 10 } : {}
    }, category)
  );
};

/**
 * Renderiza um badge de plataforma com cores específicas
 */
export const getPlatformBadge = (platform: string) => {
  switch (platform) {
    case 'Google Presentation':
      return React.createElement('span', {
        className: 'inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1',
        style: { backgroundColor: '#FFC107' }
      }, platform);
    case 'Canva':
      return React.createElement('span', {
        className: 'inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1',
        style: { background: 'linear-gradient(135deg, #823AF3, #4B66E1, #01F1C4)' }
      }, platform);
    case 'PowerPoint':
      return React.createElement('span', {
        className: 'inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1',
        style: { backgroundColor: '#E64A19' }
      }, platform);
    default:
      return React.createElement('span', {
        className: 'inline-block px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full mr-1'
      }, platform);
  }
};

/**
 * Renderiza um botão de categoria com estado ativo/inativo
 */
export const renderCategoryButton = (category: string, isActive: boolean, onClick: () => void) => {
  const colors = categoryColors[category as keyof typeof categoryColors];
  
  if (!colors && category === 'Todos') {
    return React.createElement(Button, {
      key: category,
      variant: isActive ? 'default' : 'outline',
      className: `flex-shrink-0 rounded-full border bg-gray-700 text-white border-gray-700 hover:bg-gray-800 transition-all duration-200 ${isActive ? 'border-b-4 border-b-black dark:border-b-white shadow-none scale-100' : ''}`,
      onClick: onClick
    }, category);
  }
  
  if (!colors) return null;
  
  return React.createElement(Button, {
    key: category,
    variant: isActive ? 'default' : 'outline',
    className: `flex-shrink-0 rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${colors.hover} transition-all duration-200 ${isActive ? 'border-b-4 border-b-black dark:border-b-white shadow-none scale-100' : ''}`,
    onClick: onClick
  }, category);
};

/**
 * Renderiza um botão de ferramenta com estado ativo/inativo
 */
export const renderToolButton = (tool: string, isActive: boolean, onClick: () => void) => {
  const colors = toolColors[tool as keyof typeof toolColors];
  
  if (!colors) return null;
  
  return React.createElement(Button, {
    key: tool,
    variant: isActive ? 'default' : 'outline',
    size: 'sm',
    className: `flex-shrink-0 rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${colors.hover} transition-all duration-200 ${isActive ? 'border-b-4 border-b-black dark:border-b-white shadow-none scale-100' : ''}`,
    onClick: onClick
  }, tool);
}; 