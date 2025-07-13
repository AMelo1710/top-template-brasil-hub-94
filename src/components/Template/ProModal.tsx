import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onGoToCart: () => void;
}

export default function ProModal({ open, onOpenChange, onGoToCart }: ProModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Versão Pro</DialogTitle>
          <DialogDescription>
            Assine a versão Pro e poderá acessar todos os templates sem anúncios, com recursos premium e suporte prioritário.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onGoToCart}>
            Ver Planos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 