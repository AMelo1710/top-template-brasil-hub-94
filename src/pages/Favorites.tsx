import React, { useState, useMemo } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '@/components/TemplateCard';
import { renderCategoryTag, getPlatformBadge } from '@/utils/templateUtils';
import { getValidTemplateIds, getTemplateById } from '@/data/templates';

const Favorites = () => {
  const { 
    favorites, 
    removeFromFavorites, 
    addToSaved, 
    removeFromSaved, 
    isSaved 
  } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  // Filtrar apenas os favoritos que têm templates válidos
  const validFavorites = useMemo(() => {
    const validIds = getValidTemplateIds();
    return favorites
      .filter(favorite => validIds.includes(favorite.id))
      .map(favorite => {
        // Buscar o template completo do arquivo templates.ts
        const template = getTemplateById(favorite.id);
        return template || favorite; // Fallback para o item original se não encontrar
      });
  }, [favorites]);

  const handleRemove = (item: any) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromFavorites(itemToRemove.id);
      toast({
        title: "Removido dos favoritos",
        description: `${itemToRemove.title} foi removido dos seus favoritos.`,
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

  const handleFavoriteToggle = (template: any) => {
    removeFromFavorites(template.id);
    toast({
      title: "Removido dos favoritos",
      description: `${template.title} foi removido dos seus favoritos.`,
    });
  };

  const handleSavedToggle = (template: any) => {
    if (isSaved(template.id)) {
      // Se já está salvo, remove dos salvos
      removeFromSaved(template.id);
      toast({
        title: "Removido dos salvos",
        description: `${template.title} foi removido dos seus salvos.`,
      });
    } else {
      // Adiciona aos salvos
      addToSaved(template);
      toast({
        title: "Adicionado aos salvos",
        description: `${template.title} foi adicionado aos seus salvos.`,
      });
    }
  };

  const isFavorite = (id: string) => true; // Sempre true na página de favoritos

  if (validFavorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Nenhum favorito ainda</h1>
          <p className="text-muted-foreground mb-6">
            Adicione templates aos seus favoritos para encontrá-los facilmente aqui
          </p>
          <Button onClick={() => window.history.back()}>
            Explorar Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Meus Favoritos
        </h1>
        <span className="text-muted-foreground">{validFavorites.length} item(s)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {validFavorites.map((template, idx) => (
          <TemplateCard
            key={template.id}
            template={template}
            idx={idx}
            handleFavoriteToggle={handleFavoriteToggle}
            handleSavedToggle={handleSavedToggle}
            handleViewTemplate={handleViewTemplate}
            isFavorite={isFavorite}
            isSaved={isSaved}
            renderCategoryTag={renderCategoryTag}
            getPlatformBadge={getPlatformBadge}
            showActions={true}
            showDate={true}
            showTags={false}
            favoriteIcon="heart-crack"
            savedIcon="bookmark"
          />
        ))}
      </div>

      <Dialog open={showRemoveModal} onOpenChange={setShowRemoveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover dos Favoritos</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover "{itemToRemove?.title}" dos seus favoritos?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Favorites;