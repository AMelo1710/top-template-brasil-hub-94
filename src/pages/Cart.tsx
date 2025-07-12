import React, { useState } from 'react';
import { ShoppingCart, Crown, PlayCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { toast } = useToast();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  const cartProducts = [
    {
      id: 'premium',
      title: 'Acesso Premium',
      description: 'Acesso completo a todos os templates premium com recursos avançados e suporte prioritário.',
      price: 49.90,
      icon: Crown,
      color: 'bg-yellow-200',
      iconColor: 'text-yellow-600',
      platforms: ['Canva', 'PowerPoint', 'Google Presentation']
    },
    {
      id: 'no-ads',
      title: 'Remover Anúncios',
      description: 'Navegue pela plataforma sem interrupções de anúncios e tenha uma experiência mais fluida.',
      price: 19.90,
      icon: Zap,
      color: 'bg-green-200',
      iconColor: 'text-green-600',
      platforms: ['Canva', 'PowerPoint']
    },
    {
      id: 'course',
      title: 'Acessar Curso',
      description: 'Curso completo de design com tutoriais passo a passo e certificado de conclusão.',
      price: 89.90,
      icon: PlayCircle,
      color: 'bg-purple-200',
      iconColor: 'text-purple-600',
      platforms: ['Canva', 'Google Presentation']
    }
  ];

  const handlePurchase = (productTitle: string) => {
    toast({
      title: "Recurso em desenvolvimento",
      description: `A compra de "${productTitle}" será implementada em breve.`,
    });
  };

  const handleRedeemCode = () => {
    if (redeemCode.trim()) {
      toast({
        title: "Código resgatado!",
        description: `Código "${redeemCode}" foi aplicado com sucesso.`,
      });
      setRedeemCode('');
      setShowRedeemModal(false);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, insira um código válido.",
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
          const IconComponent = product.icon;
          return (
            <Card key={product.id} className="hover:shadow-hover transition-all duration-300" data-product={product.id}>
              <CardHeader>
                <CardTitle className="text-lg text-primary">{product.title}</CardTitle>
              </CardHeader>
              
              <div className={`h-32 ${product.color} flex items-center justify-center`}>
                <IconComponent className={`w-12 h-12 ${product.iconColor}`} />
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
                  onClick={() => handlePurchase(product.title)}
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
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder="Digite seu código aqui..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedeemModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRedeemCode}>
              Resgatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;