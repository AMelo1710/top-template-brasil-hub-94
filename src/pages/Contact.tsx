
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Send, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    email: false
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showCustomNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value.length > 0 && !validateEmail(value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      showCustomNotification('Por favor, preencha um email válido.', 'error');
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }
    
    if (!formData.name.trim() || !formData.message.trim()) {
      showCustomNotification('Por favor, preencha todos os campos.', 'error');
      return;
    }

    showCustomNotification('Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
    setFormData({ name: '', email: '', message: '' });
    setErrors({ email: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
            notificationType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <div className="mr-3">
              {notificationType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notificationMessage}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-3 text-gray-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between max-w-4xl mx-auto w-full">
        <h1 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Fale Conosco
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto px-6 py-8 w-full">
        <div className="grid gap-8">
          <Card className="border-accent">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary">Entre em Contato</CardTitle>
              <p className="text-muted-foreground">
                Estamos aqui para ajudar! Envie sua mensagem e retornaremos o mais breve possível.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-primary font-semibold">
                    Nome *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-lg border border-input p-3 focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-primary font-semibold">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.email ? 'border-red-500' : 'border-input'
                    }`}
                    placeholder="seu@email.com"
                    required
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1 px-1">
                      Preencha um email válido
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-primary font-semibold">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full rounded-lg border border-input p-3 focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px]"
                    placeholder="Digite sua mensagem aqui..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-secondary hover:bg-primary text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-accent/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Outras formas de contato</h3>
                  <p className="text-muted-foreground text-sm">
                    Você também pode nos encontrar em nossas redes sociais ou enviar um email direto para o nosso email: <a href="mailto:contato@toptemplatesbrasil.com.br" className="text-secondary hover:underline">contato@toptemplatesbrasil.com.br</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-muted hover:bg-accent text-primary font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Voltar para a Home
          </Button>
        </div>
      </main>

      <footer className="text-center text-muted-foreground py-6 text-sm bg-[rgb(199, 231, 249)]">
        © 2025 Top Templates Brasil
      </footer>
    </div>
  );
};

export default Contact;
