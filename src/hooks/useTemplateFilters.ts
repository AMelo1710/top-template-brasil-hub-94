import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates, categories, toolFilters } from '@/data/templates';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { renderCategoryTag, getPlatformBadge, renderCategoryButton, renderToolButton } from '@/utils/templateUtils';

export default function useTemplateFilters() {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, addToSaved, removeFromSaved, isFavorite, isSaved } = useApp();
  const { toast } = useToast();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showProModal, setShowProModal] = useState(false);
  const [toolFilter, setToolFilter] = useState('Todos');

  const allCategories = ['Todos', ...categories];

  const getVisibleCategories = () => {
    if (activeCategory !== 'Todos' && activeCategory !== '🔥Em alta🔥' && allCategories.includes(activeCategory)) {
      return [
        'Todos',
        activeCategory,
        '🔥Em alta🔥',
        ...allCategories.filter(cat => cat !== 'Todos' && cat !== '🔥Em alta🔥' && cat !== activeCategory)
      ];
    } else {
      return [
        'Todos',
        '🔥Em alta🔥',
        ...allCategories.filter(cat => cat !== 'Todos' && cat !== '🔥Em alta🔥')
      ];
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchTool = toolFilter === 'Todos' || template.tool === toolFilter;
    let matchCategory = true;
    if (activeCategory === '🔥Em alta🔥') {
      matchCategory = template.categories.some(cat => cat.trim().toLowerCase() === '🔥em alta🔥'.toLowerCase());
    } else if (activeCategory !== 'Todos') {
      matchCategory = template.categories.some(cat => cat.trim().toLowerCase() === activeCategory.trim().toLowerCase());
    }
    return matchTool && matchCategory;
  });

  const handleFavoriteToggle = (template: any) => {
    if (isFavorite(template.id)) {
      removeFromFavorites(template.id);
      toast({ title: 'Removido dos favoritos', description: `${template.title} foi removido dos seus favoritos.` });
    } else {
      addToFavorites(template);
      toast({ title: 'Adicionado aos favoritos', description: `${template.title} foi adicionado aos seus favoritos.` });
    }
  };

  const handleSavedToggle = (template: any) => {
    if (isSaved(template.id)) {
      removeFromSaved(template.id);
      toast({ title: 'Removido dos salvos', description: `${template.title} foi removido dos seus salvos.` });
    } else {
      addToSaved(template);
      toast({ title: 'Salvo com sucesso', description: `${template.title} foi salvo para visualização posterior.` });
    }
  };

  const handleViewTemplate = (templateId: string) => {
    navigate('/plataform', { state: { highlightTemplateId: templateId } });
    setTimeout(() => {
      const templateElement = document.querySelector(`[data-template-id="${templateId}"]`);
      if (templateElement) {
        templateElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        templateElement.classList.add('animate-pulse');
        setTimeout(() => {
          templateElement.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 100);
  };

  const handleGoToCart = () => {
    setShowProModal(false);
    navigate('/cart');
    setTimeout(() => {
      const noAdsProduct = document.querySelector('[data-product="no-ads"]');
      if (noAdsProduct) {
        noAdsProduct.classList.add('animate-pulse');
        setTimeout(() => {
          noAdsProduct.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 100);
  };

  return {
    showAllCategories,
    setShowAllCategories,
    activeCategory,
    setActiveCategory,
    showProModal,
    setShowProModal,
    toolFilters,
    toolFilter,
    setToolFilter,
    getVisibleCategories,
    renderCategoryButton,
    renderToolButton,
    filteredTemplates,
    handleFavoriteToggle,
    handleSavedToggle,
    handleViewTemplate,
    handleGoToCart,
    isFavorite,
    isSaved,
    renderCategoryTag,
    getPlatformBadge
  };
} 