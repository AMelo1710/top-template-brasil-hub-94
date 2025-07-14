import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { renderCategoryTag, getPlatformBadge, renderCategoryButton, renderToolButton } from '@/utils/templateUtils';

export default function useSearch() {
  const { addToFavorites, removeFromFavorites, addToSaved, removeFromSaved, isFavorite, isSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTool, setSelectedTool] = useState('Todos');

  // Filtrar templates válidos primeiro
  const validTemplates: any[] = [];

  useEffect(() => {
    let results = validTemplates;
    if (searchTerm) {
      results = results.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.categories.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory && selectedCategory !== 'Todos') {
      results = results.filter(template => template.categories.some((cat: string) => cat === selectedCategory));
    }
    if (selectedTool && selectedTool !== 'Todos') {
      results = results.filter(template => template.tool === selectedTool);
    }
    setFilteredResults(results);
  }, [searchTerm, selectedCategory, selectedTool, validTemplates]);

  const handleFavoriteToggle = (template: any) => {
    if (isFavorite(template.id)) {
      removeFromFavorites(template.id);
    } else {
      addToFavorites(template);
    }
  };

  const handleSavedToggle = (template: any) => {
    if (isSaved(template.id)) {
      removeFromSaved(template.id);
    } else {
      addToSaved(template);
    }
  };

  const handleViewTemplate = (templateId: string) => {
    // Navegação customizada se necessário
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredResults,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    selectedTool,
    setSelectedTool,
    categories: ['Todos'],
    toolFilters: [],
    renderCategoryButton,
    renderToolButton,
    handleFavoriteToggle,
    handleSavedToggle,
    handleViewTemplate,
    isFavorite,
    isSaved,
    renderCategoryTag,
    getPlatformBadge
  };
} 