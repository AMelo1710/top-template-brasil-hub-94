import React, { useState, useMemo } from 'react';
import { Bookmark, BookmarkMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '@/components/TemplateCard';
import { renderCategoryTag, getPlatformBadge } from '@/utils/templateUtils';

const Saved = () => {
  const { saved, removeFromSaved, addToFavorites, removeFromFavorites, isFavorite } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  // Filtrar apenas os salvos que têm templates válidos
  const validSaved = useMemo(() => {
    return saved
      .map(savedItem => {
        // Buscar o template completo do arquivo templates.ts
        // Remover import { getValidTemplateIds, getTemplateById } from '@/data/templates';
        // Ajustar para não depender de dados locais
        return savedItem; // Fallback para o item original se não encontrar
      });
  }, [saved]);

  const handleRemove = (item: any) => {
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

  const handleFavoriteToggle = (template: any) => {
    if (isFavorite(template.id)) {
      // Se já está nos favoritos, remove dos favoritos
      removeFromFavorites(template.id);
      toast({
        title: "Removido dos favoritos",
        description: `${template.title} foi removido dos seus favoritos.`,
      });
    } else {
      // Adiciona aos favoritos
      addToFavorites(template);
      toast({
        title: "Adicionado aos favoritos",
        description: `${template.title} foi adicionado aos seus favoritos.`,
      });
    }
  };

  const handleSavedToggle = (template: any) => {
    removeFromSaved(template.id);
    toast({
      title: "Removido dos salvos",
      description: `${template.title} foi removido dos seus salvos.`,
    });
  };

  const isSaved = (id: string) => true; // Sempre true na página de salvos

  if (validSaved.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Nenhum item salvo</h1>
          <p className="text-muted-foreground mb-6">
            Salve templates para visualizá-los posteriormente
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
          <Bookmark className="w-6 h-6 mr-2 text-blue-500" />
          Items Salvos
        </h1>
        <span className="text-muted-foreground">{validSaved.length} item(s)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {validSaved.map((template, idx) => (
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
            favoriteIcon="heart"
            savedIcon="bookmark-minus"
          />
        ))}
      </div>

      <Dialog open={showRemoveModal} onOpenChange={setShowRemoveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover dos Salvos</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover "{itemToRemove?.title}" dos seus salvos?
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

export default Saved;