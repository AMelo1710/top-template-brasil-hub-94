import React, { useState } from 'react';
import { ShoppingCart, Crown, PlayCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, validateProductCode, useProductCode } from '@/data/products';
import { useCodeContext } from '@/contexts/CodeContext';
import PaymentModal from '@/components/Payment/PaymentModal';

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setHasValidNoAdsCode, setHasValidPremiumCode, setHasValidCourseCode } = useCodeContext();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cartProducts = getAllProducts();

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleRedeemCode = () => {
    if (!redeemCode.trim()) {
      setErrorMessage('Por favor, insira um código válido.');
      return;
    }

    const validation = validateProductCode(redeemCode);
    
    if (validation.isValid) {
      // Usar o código
      useProductCode(redeemCode);
      
      // Marcar o tipo de código válido no contexto
      if (validation.productType === 'no-ads') {
        setHasValidNoAdsCode(true);
      } else if (validation.productType === 'premium') {
        setHasValidPremiumCode(true);
      } else if (validation.productType === 'course') {
        setHasValidCourseCode(true);
      }
      
      toast({
        title: "Código resgatado!",
        description: `Código "${redeemCode}" foi aplicado com sucesso.`,
      });
      
      setRedeemCode('');
      setErrorMessage('');
      setShowRedeemModal(false);
    } else {
      setErrorMessage(validation.message);
      toast({
        title: "Erro",
        description: validation.message,
        variant: "destructive"
      });
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Google Presentation':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1 mb-1"
            style={{ backgroundColor: '#FFC107' }}
          >
            {platform}
          </span>
        );
      case 'Canva':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1 mb-1"
            style={{ background: 'linear-gradient(135deg, #823AF3, #4B66E1, #01F1C4)' }}
          >
            {platform}
          </span>
        );
      case 'PowerPoint':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1 mb-1"
            style={{ backgroundColor: '#E64A19' }}
          >
            {platform}
          </span>
        );
      default:
        return (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full mr-1 mb-1">
            {platform}
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2 text-blue-500" />
          Nossa Loja
        </h1>
        <span className="text-muted-foreground">{cartProducts.length} produto(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartProducts.map((product) => {
          const isNoAdsCard = product.id === 'no-ads';
          
          // Função para renderizar o ícone baseado na string
          const renderIcon = (iconName: string, className: string) => {
            switch (iconName) {
              case 'Crown':
                return <Crown className={className} />;
              case 'Zap':
                return <Zap className={className} />;
              case 'PlayCircle':
                return <PlayCircle className={className} />;
              default:
                return <Crown className={className} />;
            }
          };
          
          return (
            <Card 
              key={product.id} 
              className={`hover:shadow-hover transition-all duration-300 ${
                isNoAdsCard ? 'animate-pulse bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300' : ''
              }`} 
              data-product={product.id}
              id={product.id}
            >
              <CardHeader>
                <CardTitle className="text-lg text-primary">{product.title}</CardTitle>
              </CardHeader>
              
              <div className={`h-32 ${product.color} flex items-center justify-center`}>
                {renderIcon(product.icon, `w-12 h-12 ${product.iconColor}`)}
              </div>
              
              <CardContent className="p-4 space-y-4">
                <p className="text-muted-foreground text-sm">{product.description}</p>
                
                <div className="mb-3">
                  {product.platforms.map((platform) => getPlatformBadge(platform))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handlePurchase(product)}
                >
                  Comprar
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowRedeemModal(true)}
                >
                  Já tenho acesso
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showRedeemModal} onOpenChange={setShowRedeemModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resgatar Código</DialogTitle>
            <DialogDescription>
              Digite seu código de resgate para acessar o produto gratuitamente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="redeemCode">Código de Resgate</Label>
              <Input
                id="redeemCode"
                value={redeemCode}
                onChange={(e) => {
                  setRedeemCode(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Digite seu código aqui..."
                className={errorMessage ? 'border-red-500' : ''}
              />
              {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRedeemModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRedeemCode}>
                Resgatar
              </Button>
            </div>
            <div className="relative group">
              <a
                onClick={() => navigate('/plataform/support')}
                className="flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="Ir para o suporte"
              >
                {/* Help icon */}
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16h.01M12 8a3 3 0 0 1 3 3c0 1.5-1.5 2-2.25 2.5S12 14 12 14"
                  />
                </svg>
              </a>
              <div className="absolute right-0 top-10 z-10 hidden group-hover:flex">
                <div className="bg-muted text-xs text-muted-foreground px-3 py-2 rounded shadow-lg whitespace-nowrap">
                  Clique para ir ao suporte
                </div>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedProduct && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Cart;