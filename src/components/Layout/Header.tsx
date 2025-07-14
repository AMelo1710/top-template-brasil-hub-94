import React from 'react';
import { Bell, Mail, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, signOut } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[rgb(199, 231, 249)] shadow-card">
      <h1 className="text-xl font-bold text-primary">Top Templates Brasil</h1>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{user?.email}</span>
        </div>
        <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
          <Mail className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full hover:scale-110 transition-all duration-200"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header; 