
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Bookmark, ShoppingCart, User, MoreHorizontal, Bell, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const navItems = [
    { icon: Home, label: 'Início', path: '/plataform/' },
    { icon: Search, label: 'Buscar', path: '/plataform/search' },
    { icon: Heart, label: 'Favoritos', path: '/plataform/favorites' },
    { icon: Bookmark, label: 'Salvos', path: '/plataform/saved' },
    { icon: ShoppingCart, label: 'Carrinho', path: '/plataform/cart' },
    { icon: User, label: 'Perfil', path: '/plataform/profile' },
    { icon: MoreHorizontal, label: 'Mais', path: '', onClick: () => setShowMoreModal(true) },
  ];

  const handleNavigation = (path: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    setShowMoreModal(false);
    navigate('/');
  };

  const handleFeedback = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback enviado",
        description: "Obrigado pelo seu feedback! Vamos analisar sua sugestão.",
      });
      setFeedback('');
      setShowFeedbackModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[rgb(199, 231, 249)] shadow-card">
        <h1 className="text-xl font-bold text-primary">Top Templates Brasil</h1>
        <div className="flex items-center space-x-3">
          <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-lg rounded-t-2xl border-t-2 border-t-[rgb(199, 231, 249)]">
        <div className="flex justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path, item.onClick)}
                className={`flex flex-col items-center justify-center transition-all duration-300 p-2 rounded-lg hover:scale-110 ${
                  isActive 
                    ? 'text-accent transform -translate-y-1' 
                    : 'text-muted-foreground hover:text-accent hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* More Options Modal */}
      <Dialog open={showMoreModal} onOpenChange={setShowMoreModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mais opções</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowMoreModal(false);
                setShowFeedbackModal(true);
              }}
              className="justify-start hover:scale-105 transition-all duration-200"
            >
              Enviar Feedback
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="justify-start text-destructive hover:text-destructive hover:scale-105 transition-all duration-200"
            >
              Sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Compartilhe sua experiência, sugestões ou relate problemas..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowFeedbackModal(false)} className="hover:scale-105 transition-all duration-200">
                Cancelar
              </Button>
              <Button onClick={handleFeedback} disabled={!feedback.trim()} className="hover:scale-105 transition-all duration-200">
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
