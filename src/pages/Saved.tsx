import React, { useState } from 'react';
import { Bookmark, BookmarkMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Saved = () => {
  const { saved, removeFromSaved } = useApp();
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

  if (saved.length === 0) {
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
        <span className="text-muted-foreground">{saved.length} item(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map((template) => (
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
                  <BookmarkMinus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <div className={`h-32 ${template.color || 'bg-muted'} flex items-center justify-center relative overflow-hidden`}>
              <div className="text-4xl">🔖</div>
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