import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Heart, Bug, Lightbulb, CheckCircle } from 'lucide-react';

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
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug' | 'suggestion' | 'praise'>('general');

  const feedbackTypes = [
    { id: 'general', label: 'Geral', icon: MessageSquare, color: 'blue' },
    { id: 'bug', label: 'Bug', icon: Bug, color: 'red' },
    { id: 'suggestion', label: 'Sugestão', icon: Lightbulb, color: 'yellow' },
    { id: 'praise', label: 'Elogio', icon: Heart, color: 'pink' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
      pink: 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header compacto */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <DialogTitle className="text-lg font-bold text-center mb-1">
              Enviar Feedback
            </DialogTitle>
            <p className="text-center text-indigo-100 text-xs">
              Sua opinião é muito importante!
            </p>
          </div>
        </div>

        {/* Conteúdo principal compacto */}
        <div className="p-4 space-y-4">
          {/* Tipos de feedback compactos */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-700">Tipo de Feedback</h3>
            <div className="grid grid-cols-2 gap-2">
              {feedbackTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = feedbackType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFeedbackType(type.id as any)}
                    className={`p-2 rounded-md border transition-all duration-200 flex items-center gap-1 ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm' 
                        : getColorClasses(type.color)
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Área de texto compacta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-semibold text-gray-700">Sua Mensagem</h3>
            </div>
            <Textarea
              placeholder="Compartilhe sua experiência, sugestões ou relate problemas..."
              value={feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              rows={3}
              className="resize-none border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-xs"
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Mínimo 10 caracteres</span>
              <span className={feedback.length >= 10 ? 'text-green-600' : 'text-gray-400'}>
                {feedback.length}/300
              </span>
            </div>
          </div>

          {/* Benefícios do feedback compactos */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-md p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-semibold text-green-800 mb-1">Por que seu feedback é importante?</h4>
                <ul className="text-green-700 space-y-0.3">
                  <li>• Nos ajuda a identificar e corrigir problemas</li>
                  <li>• Melhora a experiência de todos os usuários</li>
                  <li>• Guia o desenvolvimento de novas funcionalidades</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botões compactos */}
          <div className="flex justify-end gap-2 pt-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              size="sm"
              className="px-4 hover:bg-zinc-50 hover:bg-zinc-200 text-zinc-800 hover:text-zinc-700 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button 
              onClick={onSubmit} 
              disabled={!feedback.trim() || feedback.length < 10}
              size="sm"
              className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-200 hover:text-zinc-800 transition-all duration-200"
            >
              <Send className="w-3 h-3 mr-1" />
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>  
  );
};

export default FeedbackModal; 