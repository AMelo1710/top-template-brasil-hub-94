import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center bg-muted">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/about')} 
          className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200"
        >
          Sobre
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/contact')} 
          className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200"
        >
          Contato
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/terms')} 
          className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200"
        >
          Termos de serviço
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#" className="hover:text-secondary hover:scale-110 transition-all duration-200">
          <div className="text-muted-foreground">
            <Twitter className="w-6 h-6" />
          </div>
        </a>
        <a href="#" className="hover:text-secondary hover:scale-110 transition-all duration-200">
          <div className="text-muted-foreground">
            <Instagram className="w-6 h-6" />
          </div>
        </a>
        <a href="#" className="hover:text-secondary hover:scale-110 transition-all duration-200">
          <div className="text-muted-foreground">
            <Facebook className="w-6 h-6" />
          </div>
        </a>
      </div>
      <p className="text-muted-foreground text-base font-normal leading-normal">
        @2025 Top Templates Brasil
      </p>
    </footer>
  );
}; 