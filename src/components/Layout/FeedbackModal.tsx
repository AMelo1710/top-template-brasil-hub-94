import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  feedback,
  onFeedbackChange,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Compartilhe sua experiência, sugestões ou relate problemas..."
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} className="hover:scale-105 transition-all duration-200">
              Cancelar
            </Button>
            <Button onClick={onSubmit} disabled={!feedback.trim()} className="hover:scale-105 transition-all duration-200">
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal; 