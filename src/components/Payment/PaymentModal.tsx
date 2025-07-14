import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, QrCode, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    title: string;
    description?: string;
    price: number;
  };
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  document_type: 'CPF' | 'CNPJ';
  document: string;
}

const PaymentModal = ({ open, onOpenChange, product }: PaymentModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'processing' | 'pix'>('form');
  const [customer, setCustomer] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    document_type: 'CPF',
    document: ''
  });
  const [pixPayload, setPixPayload] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer.name || !customer.email || !customer.phone || !customer.document) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setStep('processing');

    try {
      // Get user IP (simplified)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const { data, error } = await supabase.functions.invoke('create-transaction', {
        body: {
          product,
          customer,
          ip
        }
      });

      if (error) throw error;

      if (data.success && data.pix_payload) {
        setPixPayload(data.pix_payload);
        setTransactionId(data.transaction.id);
        setStep('pix');
        toast({
          title: "PIX gerado!",
          description: "Código PIX criado com sucesso. Efetue o pagamento para confirmar a compra.",
        });
      } else {
        throw new Error('Erro ao gerar código PIX');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: error.message || "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive"
      });
      setStep('form');
    }
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao copiar código PIX.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    setStep('form');
    setCustomer({
      name: '',
      email: '',
      phone: '',
      document_type: 'CPF',
      document: ''
    });
    setPixPayload('');
    setTransactionId('');
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' && 'Dados para Pagamento'}
            {step === 'processing' && 'Processando...'}
            {step === 'pix' && 'Pagamento PIX'}
          </DialogTitle>
          <DialogDescription>
            {step === 'form' && `Preencha seus dados para comprar: ${product.title}`}
            {step === 'processing' && 'Gerando código PIX...'}
            {step === 'pix' && 'Use o código PIX abaixo para efetuar o pagamento'}
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={customer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+5511999999999"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document_type">Tipo de Documento</Label>
                <Select
                  value={customer.document_type}
                  onValueChange={(value: 'CPF' | 'CNPJ') => handleInputChange('document_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CPF">CPF</SelectItem>
                    <SelectItem value="CNPJ">CNPJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="document">
                  {customer.document_type} *
                </Label>
                <Input
                  id="document"
                  value={customer.document}
                  onChange={(e) => handleInputChange('document', e.target.value)}
                  placeholder={customer.document_type === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</p>
              </div>
              <Button type="submit" className="min-w-[120px]">
                Gerar PIX
              </Button>
            </div>
          </form>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Gerando código PIX...</p>
          </div>
        )}

        {step === 'pix' && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <QrCode className="w-16 h-16 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground mb-4">
                Escaneie o QR Code ou copie o código PIX
              </p>
              
              <div className="bg-background p-3 rounded border break-all text-sm font-mono">
                {pixPayload}
              </div>
              
              <Button 
                onClick={copyPixCode}
                variant="outline" 
                className="w-full mt-3"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Código PIX
                  </>
                )}
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Valor: <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                ID da Transação: {transactionId}
              </p>
            </div>
          </div>
        )}

        {step === 'pix' && (
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Fechar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;