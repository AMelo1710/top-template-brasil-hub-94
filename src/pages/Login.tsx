import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(loginForm.email)) {
      showCustomNotification('Por favor, preencha um email válido.', 'error');
      return;
    }
    if (loginForm.password.length < 8) {
      showCustomNotification('A senha deve ter pelo menos 8 caracteres.', 'error');
      return;
    }
    
    const userData = localStorage.getItem('userData');
    let userName = 'Usuário';
    if (userData) {
      const user = JSON.parse(userData);
      userName = user.fullName;
    }
    
    showCustomNotification(`Bem-vindo de volta, ${userName}!`, 'success');
    setTimeout(() => {
      navigate('/plataform');
    }, 1000);
  };

  const isLoginFormValid = validateEmail(loginForm.email) && loginForm.password.length >= 8;

  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isLoginFormValid) {
        e.preventDefault();
        handleLoginSubmit(e as any);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLoginFormValid, loginForm]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
            notificationType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <div className="mr-3">
              {notificationType === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notificationMessage}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="ml-3 text-gray-200 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center bg-card p-4 justify-between max-w-4xl mx-auto w-full">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-primary hover:text-secondary transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Faça o Login para continuar
        </h2>
      </header>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto px-4 py-8 w-full">
        <form onSubmit={handleLoginSubmit}>
          {/* Email Input */}
          <div className="flex flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-0 flex-1 w-full">
              <Input
                type="email"
                placeholder="E-mail"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
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
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {loginForm.password && loginForm.password.length < 8 && (
                <div className="text-red-500 text-xs mt-1 px-1">A senha deve ter pelo menos 8 caracteres</div>
              )}
            </label>
          </div>
        </form>
      </div>

      {/* Buttons Section */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-col items-stretch px-4 py-3 max-w-lg mx-auto w-full">
            <Button 
              onClick={handleLoginSubmit}
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
        <div className="h-5 bg-card"></div>
      </div>
    </div>
  );
};

export default Login;