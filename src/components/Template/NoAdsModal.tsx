import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Crown, ShoppingCart, CheckCircle, Star } from 'lucide-react';

interface NoAdsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoAdsModal: React.FC<NoAdsModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchaseCode, setPurchaseCode] = useState('');

  const handleSubmitCode = () => {
    if (purchaseCode.trim()) {
      toast({
        title: "Código válido!",
        description: "Acesso sem anúncios ativado com sucesso.",
      });
      setPurchaseCode('');
      onOpenChange(false);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, insira um código válido.",
        variant: "destructive"
      });
    }
  };

  const handleGoToCart = () => {
    onOpenChange(false);
    navigate('/plataform/cart');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs p-0 overflow-hidden">
        {/* Header compacto */}
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 text-white">
          <div className="flex items-center justify-center mb-2">
            <Crown className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
          </div>
          <DialogTitle className="text-lg font-bold text-center mb-1">
            Acesso Premium
          </DialogTitle>
          <DialogDescription className="text-center text-blue-100 text-xs">
            Designs exclusivos sem anúncios
          </DialogDescription>
        </div>

        {/* Conteúdo principal reduzido */}
        <div className="p-4 space-y-4">
          {/* Benefícios resumidos */}
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Sem Anúncios
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-1">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              Acesso Ilimitado
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded px-2 py-1">
              <CheckCircle className="w-4 h-4 text-purple-500" />
              Conteúdo Exclusivo
            </div>
          </div>

          {/* Seção do código */}
          <div className="space-y-2">
            <Label htmlFor="purchaseCode" className="text-sm font-semibold text-gray-700 text-center block">
              Já possui um código?
            </Label>
            <Input
              id="purchaseCode"
              value={purchaseCode}
              onChange={(e) => setPurchaseCode(e.target.value)}
              placeholder="Digite seu código..."
              className="h-9 text-center text-sm font-mono border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Botões */}
          <div className="space-y-2">
            <Button 
              onClick={handleSubmitCode}
              className="w-full h-9 bg-gradient-to-r from-purple-600 to-blue-600 text-zinc-200 font-semibold text-sm hover:text-zinc-800 hover:bg-gradient-to-r from-purple-600 to-blue-600/50"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Verificar Código
            </Button>
            <div className="flex items-center justify-center text-xs text-gray-400">ou</div>
            <Button 
              onClick={handleGoToCart}
              variant="outline"
              className="w-full h-9 border-2 border-green-500 text-green-600 font-semibold text-sm hover:bg-green-600 hover:text-green-50"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Comprar Premium
            </Button>
          </div>

          {/* Footer compacto */}
          <div className="text-center pt-2 border-t border-gray-200">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>7 dias garantia • Suporte 24/7</span>
            </div>
          </div>
        </div>

        {/* Botão de fechar */}
        <Button 
          variant="ghost" 
          onClick={() => onOpenChange(false)}
          className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 h-7 w-7"
        >
          
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NoAdsModal; 