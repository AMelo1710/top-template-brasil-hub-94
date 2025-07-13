import React, { useState } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

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

  if (favorites.length === 0) {
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
        <span className="text-muted-foreground">{favorites.length} item(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((template) => (
          <Card key={template.id} className="hover:shadow-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center justify-between">
                {template.title}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemove(template)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HeartCrack className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <div className={`h-32 ${template.color || 'bg-muted'} flex items-center justify-center relative overflow-hidden`}>
              <div className="text-4xl">❤️</div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <CardContent className="p-4 space-y-4">
              <p className="text-muted-foreground text-sm">{template.description}</p>
              
                  <Button 
                    className="w-full"
                    onClick={() => handleViewTemplate(template.id)}
                  >
                    Ver Template
                  </Button>
            </CardContent>
          </Card>
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