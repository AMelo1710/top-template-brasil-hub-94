import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MoreOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedbackClick: () => void;
  onLogout: () => void;
}

const MoreOptionsModal: React.FC<MoreOptionsModalProps> = ({
  isOpen,
  onClose,
  onFeedbackClick,
  onLogout
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mais opções</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            onClick={() => {
              onClose();
              onFeedbackClick();
            }}
            className="justify-start hover:scale-105 transition-all duration-200"
          >
            Enviar Feedback
          </Button>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="justify-start text-destructive hover:text-destructive hover:scale-105 transition-all duration-200"
          >
            Sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoreOptionsModal; 