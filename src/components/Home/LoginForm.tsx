import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  loginForm: {
    email: string;
    password: string;
  };
  showPassword: boolean;
  isLoginFormValid: boolean;
  validateEmail: (email: string) => boolean;
  onLoginFormChange: (field: 'email' | 'password', value: string) => void;
  onTogglePasswordVisibility: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  showPassword,
  isLoginFormValid,
  validateEmail,
  onLoginFormChange,
  onTogglePasswordVisibility,
  onSubmit,
  onBack,
  onForgotPassword
}) => {
  const navigate = useNavigate();

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
          Faça o Login para continuar
        </h2>
      </header>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto px-4 py-8 w-full">
        {/* Email Input */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-0 flex-1 w-full">
            <Input
              type="email"
              placeholder="E-mail"
              value={loginForm.email}
              onChange={(e) => onLoginFormChange('email', e.target.value)}
              className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring"
            />
            {loginForm.email && !validateEmail(loginForm.email) && (
              <div className="text-red-500 text-xs mt-1 px-1">Preencha um email válido</div>
            )}
          </label>
        </div>

        {/* Password Input */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-0 flex-1 w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={loginForm.password}
              onChange={(e) => onLoginFormChange('password', e.target.value)}
              className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring pr-12"
            />
            <button
              type="button"
              onClick={onTogglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {loginForm.password && loginForm.password.length < 8 && (
              <div className="text-red-500 text-xs mt-1 px-1">A senha deve ter pelo menos 8 caracteres</div>
            )}
          </label>
        </div>

        {/* Forgot Password Link */}
        <button
          onClick={onForgotPassword}
          className="text-secondary text-sm font-normal leading-normal pb-3 pt-1 px-4 underline hover:text-primary transition-colors text-left"
        >
          Esqueceu sua senha?
        </button>
      </div>

      {/* Buttons Section */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-col items-stretch px-4 py-3 max-w-lg mx-auto w-full">
            <Button 
              onClick={onSubmit}
              disabled={!isLoginFormValid}
              className={`h-14 text-base font-bold w-full transition-all duration-200 ${
                isLoginFormValid 
                  ? 'bg-secondary hover:bg-primary hover:scale-105 text-white' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/signup')}
              className="h-14 text-base font-bold w-full bg-muted text-primary hover:bg-accent hover:scale-105 transition-all duration-200"
            >
              Crie uma conta
            </Button>
          </div>
        </div>
        <div className="h-5 bg-[rgb(199, 231, 249)]"></div>
      </div>
    </div>
  );
}; 