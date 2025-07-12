
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userDetailsForm, setUserDetailsForm] = useState({
    fullName: '',
    username: ''
  });

  const showCustomNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasLength && hasUppercase && hasLowercase && hasSpecial;
  };

  const getPasswordChecks = (password: string) => {
    return {
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const generateStrongPassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    let password = '';
    
    // Garantir pelo menos um de cada tipo
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
    
    // Completar até 12 caracteres
    const allChars = uppercase + lowercase + numbers + special;
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Embaralhar a senha
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setFormData({ ...formData, password });
  };

  const handleFirstStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      showCustomNotification('Por favor, preencha um email válido.', 'error');
      return;
    }

    if (!validatePassword(formData.password)) {
      showCustomNotification('Por favor, preencha uma senha que atenda aos requisitos.', 'error');
      return;
    }

    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetailsForm.fullName.trim()) {
      showCustomNotification('Por favor, preencha seu nome completo.', 'error');
      return;
    }

    if (!userDetailsForm.username.trim()) {
      showCustomNotification('Por favor, preencha seu nome de usuário.', 'error');
      return;
    }

    // Save user data to localStorage
    const userData = {
      email: formData.email,
      fullName: userDetailsForm.fullName,
      username: userDetailsForm.username,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));

    showCustomNotification(`Conta criada com sucesso, ${userDetailsForm.fullName}!`, 'success');
    setTimeout(() => {
      navigate('/funnel');
    }, 1000);
  };

  const isFirstStepValid = validateEmail(formData.email) && validatePassword(formData.password);
  const isSecondStepValid = userDetailsForm.fullName.trim() && userDetailsForm.username.trim();
  const passwordChecks = getPasswordChecks(formData.password);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (currentStep === 1 && isFirstStepValid) {
          handleFirstStepSubmit(e as any);
        } else if (currentStep === 2 && isSecondStepValid) {
          handleFinalSubmit(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isFirstStepValid, isSecondStepValid, formData, userDetailsForm]);

  if (showLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary border-opacity-80"></div>
          <p className="text-primary text-lg">Criando sua conta...</p>
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

      <div className="flex-1 flex flex-col justify-center">
        {/* Header Section */}
        <div className="flex items-center bg-[rgb(199, 231, 249)] p-4 pb-2 justify-between max-w-4xl mx-auto w-full">
          <Button variant="ghost" size="icon" onClick={() => currentStep === 1 ? navigate('/') : setCurrentStep(1)} className="text-primary hover:text-secondary">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            {currentStep === 1 ? 'Crie sua conta' : 'Complete seu perfil'}
          </h2>
        </div>

        {/* Step 1: Email and Password */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-8 lg:px-12">
            <form onSubmit={handleFirstStepSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="flex flex-col">
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring"
                />
                {formData.email && !validateEmail(formData.email) && (
                  <div className="text-red-500 text-xs mt-1 px-1">Preencha um email válido</div>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {formData.password && !validatePassword(formData.password) && (
                  <div className="text-red-500 text-xs mt-1 px-1">
                    A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e caractere especial
                  </div>
                )}
              </div>

              {/* Generate Strong Password Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={generateStrongPassword}
                  className="text-secondary text-sm font-medium underline hover:text-primary transition-colors"
                >
                  Gerar senha forte
                </button>
              </div>

              {/* Password Requirements */}
              <div className="bg-muted rounded-lg p-4 border border-accent">
                <h4 className="text-sm font-medium text-primary mb-2">Requisitos da senha:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.hasLength ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Pelo menos 8 caracteres
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Uma letra maiúscula
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.hasLowercase ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Uma letra minúscula
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.hasSpecial ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Um caractere especial (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: User Details */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-8 lg:px-12">
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={userDetailsForm.fullName}
                  onChange={(e) => setUserDetailsForm({ ...userDetailsForm, fullName: e.target.value })}
                  className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring"
                />
                {!userDetailsForm.fullName.trim() && (
                  <div className="text-muted-foreground text-xs mt-1 px-1">Digite seu nome completo</div>
                )}
              </div>

              {/* Username Input */}
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Nome de usuário"
                  value={userDetailsForm.username}
                  onChange={(e) => setUserDetailsForm({ ...userDetailsForm, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                  className="h-14 text-base rounded-xl bg-muted border-none focus:ring-2 focus:ring-ring"
                />
                {!userDetailsForm.username.trim() && (
                  <div className="text-muted-foreground text-xs mt-1 px-1">Digite seu nome de usuário (sem espaços)</div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-2xl flex-col items-stretch px-4 md:px-8 lg:px-12 py-4">
            <Button
              onClick={currentStep === 1 ? handleFirstStepSubmit : handleFinalSubmit}
              disabled={currentStep === 1 ? !isFirstStepValid : !isSecondStepValid}
              className={`h-14 text-base font-bold w-full ${
                (currentStep === 1 ? isFirstStepValid : isSecondStepValid)
                  ? 'bg-secondary hover:bg-primary text-white' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {currentStep === 1 ? 'Continuar' : 'Criar conta'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="h-14 text-base font-bold w-full bg-muted text-primary hover:bg-accent"
            >
              Já tenho uma conta
            </Button>
          </div>
        </div>
        <div className="h-5 bg-[rgb(199, 231, 249)]"></div>
      </div>
    </div>
  );
};

export default Signup;
