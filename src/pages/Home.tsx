
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Users, GraduationCap, Award, Twitter, Instagram, Facebook, Eye, EyeOff, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [forgotForm, setForgotForm] = useState({
    email: ''
  });

  // Check for returning users and show welcome notification
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData && !showLogin) {
      const user = JSON.parse(userData);
      setTimeout(() => {
        showCustomNotification(`Bem-vindo de volta, ${user.fullName}!`, 'success');
      }, 1000);
    }
  }, [showLogin]);

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
    
    // Simulate getting user data
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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotForm.email)) {
      showCustomNotification('Por favor, preencha um email válido.', 'error');
      return;
    }
    showCustomNotification('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.', 'success');
    setForgotForm({ email: '' });
  };

  const isLoginFormValid = validateEmail(loginForm.email) && loginForm.password.length >= 8;

  if (showForgotPassword) {
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
        <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between max-w-4xl mx-auto w-full">
          <Button variant="ghost" size="icon" onClick={() => setShowForgotPassword(false)} className="text-primary hover:text-secondary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Recuperar Senha
          </h2>
        </header>

        {/* Form Section */}
        <div className="max-w-md mx-auto p-6 flex-1">
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label htmlFor="forgotEmail" className="block text-primary font-semibold mb-1">
                E-mail
              </label>
              <Input
                type="email"
                id="forgotEmail"
                value={forgotForm.email}
                onChange={(e) => setForgotForm({ email: e.target.value })}
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
  }

  if (showLogin) {
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
        <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between max-w-4xl mx-auto w-full">
          <Button variant="ghost" size="icon" onClick={() => setShowLogin(false)} className="text-primary hover:text-secondary transition-colors">
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

          {/* Forgot Password Link */}
          <button
            onClick={() => setShowForgotPassword(true)}
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
          <div className="h-5 bg-[rgb(199, 231, 249)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
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
      <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between">
        <div className="flex w-12 items-center justify-end">
          <Button variant="ghost" size="icon" className="text-primary hover:text-secondary transition-colors">
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section with Icon and Overlay */}
      <div className="container mx-auto px-4">
        <div className="relative flex min-h-[480px] flex-col gap-6 rounded-xl items-center justify-center p-4 overflow-hidden">
          {/* Background image */}
          <div 
            className="absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/lovable-uploads/77988cbe-a964-4668-a3dd-a5eb76475705.png')`
            }}
          ></div>
          
          {/* Improved Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/40 rounded-xl"></div>
          
          {/* Logo/Icon positioned top-left */}
          <div className="absolute top-8 left-8 z-10">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <img 
                src="/lovable-uploads/4d7f282c-259d-4106-abef-7a35e2e525ba.png" 
                alt="Top Templates Brasil"
                className="w-10 h-10"
              />
              <div className="text-white">
                <div className="text-lg font-bold">Top Templates</div>
                <div className="text-sm opacity-90">BRASIL</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-2 text-center">
            <h1 className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Home Top Templates Brasil
            </h1>
            <h1 className="text-sky-100 text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Desbloqueie seu potencial na criação de slides e apresentações que irão impressionar as pessoas
            </h1>
            <h2 className="text-sky-100 text-lg font-normal leading-normal md:text-base md:font-bold">
              Explore um mundo de oportunidades e recursos para ajudar você a alcançar seus objetivos.
            </h2>
          </div>
          <Button 
            onClick={() => setShowLogin(true)}
            className="relative z-10 bg-cyan-700 text-sky-100 hover:bg-sky-100 hover:text-secondary font-bold px-8 py-3 rounded-full transition-all duration-250 animate-[pulse_1.5s_infinite] hover:animate-none hover:scale-105 hover:shadow-lg"
          >
            Acessar plataforma
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Benefícios da plataforma
        </h2>
        
        <div className="flex flex-col gap-10 py-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-primary tracking-light text-[32px] font-bold leading-tight md:text-4xl md:font-black max-w-[720px]">
              Potencialize sua jornada
            </h1>
            <p className="text-primary text-base font-normal leading-normal max-w-[720px]">
              Nossa plataforma oferece uma ampla gama de designs e ideias que irão te impressionar e recursos projetados para apoiar sua criatividade no canva e nas principais plataformas de apresentações.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-accent">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="text-secondary">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Acesso a uma ampla gama de designs
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Descubra uma variedade de designs e inspirações surpreendentes, com recursos pensados para impulsionar sua criatividade no Canva e nas principais plataformas de apresentação
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-accent">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="text-secondary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Suporte premium
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Conte com uma equipe de suporte pronta para ajudar em qualquer etapa, com atendimento rápido e eficiente.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-accent">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="text-secondary">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Templates prontos e personalizáveis
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Escolha entre centenas de modelos prontos para diversos fins e personalize com facilidade para se adequar à sua identidade visual.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-6 px-5 py-10 text-center bg-muted">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Button variant="ghost" onClick={() => navigate('/about')} className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200">
            Sobre
          </Button>
          <Button variant="ghost" onClick={() => navigate('/contact')} className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200">
            Contato
          </Button>
          <Button variant="ghost" onClick={() => navigate('/terms')} className="text-primary text-base font-normal leading-normal min-w-40 hover:bg-primary hover:text-muted transition-all duration-200">
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
    </div>
  );
};

export default Landing;
