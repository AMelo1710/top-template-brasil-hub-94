import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Template } from '@/types/app';

export const useSavedState = () => {
  const { saved, removeFromSaved } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<Template | null>(null);

  const handleRemove = (item: Template) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromSaved(itemToRemove.id);
      toast({
        title: "Removido dos salvos",
        description: `${itemToRemove.title} foi removido dos seus salvos.`,
      });
    }
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleViewTemplate = (templateId: string) => {
    navigate('/');
    setTimeout(() => {
      const templateElement = document.querySelector(`[data-template-id="${templateId}"]`);
      if (templateElement) {
        templateElement.scrollIntoView({ behavior: 'smooth' });
        templateElement.classList.add('animate-pulse');
        setTimeout(() => {
          templateElement.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 100);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return {
    saved,
    showRemoveModal,
    setShowRemoveModal,
    itemToRemove,
    handleRemove,
    confirmRemove,
    handleViewTemplate,
    handleGoBack
  };
}; 