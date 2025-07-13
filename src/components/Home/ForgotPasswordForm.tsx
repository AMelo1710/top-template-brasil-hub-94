import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ForgotPasswordFormProps {
  forgotForm: {
    email: string;
  };
  validateEmail: (email: string) => boolean;
  onForgotFormChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  forgotForm,
  validateEmail,
  onForgotFormChange,
  onSubmit,
  onBack
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between max-w-4xl mx-auto w-full">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack} 
          className="text-primary hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Recuperar Senha
        </h2>
      </header>

      {/* Form Section */}
      <div className="max-w-md mx-auto p-6 flex-1">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="forgotEmail" className="block text-primary font-semibold mb-1">
              E-mail
            </label>
            <Input
              type="email"
              id="forgotEmail"
              value={forgotForm.email}
              onChange={(e) => onForgotFormChange(e.target.value)}
              className="w-full rounded-lg border border-input p-3 focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary transition-colors"
          >
            Enviar link de recuperação
          </Button>
        </form>
      </div>

      <footer className="text-center text-muted-foreground py-6 text-sm">
        © 2025 Top Templates Brasil
      </footer>
    </div>
  );
}; 