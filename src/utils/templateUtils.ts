import React from 'react';
import { Button } from '@/components/ui/button';

// Mock de cores para categorias
const categoryColors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  'Em alta': { bg: 'bg-yellow-200', text: 'text-yellow-900', border: 'border-yellow-400', hover: 'hover:bg-yellow-300' },
  'Negócios': { bg: 'bg-blue-200', text: 'text-blue-900', border: 'border-blue-400', hover: 'hover:bg-blue-300' },
  'Educação': { bg: 'bg-green-200', text: 'text-green-900', border: 'border-green-400', hover: 'hover:bg-green-300' },
  'Todos': { bg: 'bg-gray-200', text: 'text-gray-900', border: 'border-gray-400', hover: 'hover:bg-gray-300' },
  // Adicione outras categorias conforme necessário
};

// Mock de cores para ferramentas
const toolColors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  'Google Presentation': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', hover: 'hover:bg-yellow-200' },
  'Canva': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', hover: 'hover:bg-purple-200' },
  'PowerPoint': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', hover: 'hover:bg-orange-200' },
  // Adicione outras ferramentas conforme necessário
};

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