import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

interface ForgotForm {
  email: string;
}

export const useHomeState = () => {
  const navigate = useNavigate();
  
  // State management
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [forgotForm, setForgotForm] = useState<ForgotForm>({
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

  // Utility functions
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

  // Event handlers
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

  const handleLoginFormChange = (field: keyof LoginForm, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };

  const handleForgotFormChange = (value: string) => {
    setForgotForm({ email: value });
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Computed values
  const isLoginFormValid = validateEmail(loginForm.email) && loginForm.password.length >= 8;

  return {
    // State
    showLogin,
    showForgotPassword,
    showPassword,
    showNotification,
    notificationMessage,
    notificationType,
    loginForm,
    forgotForm,
    isLoginFormValid,
    
    // Actions
    setShowLogin,
    setShowForgotPassword,
    handleLoginSubmit,
    handleForgotSubmit,
    handleLoginFormChange,
    handleForgotFormChange,
    closeNotification,
    togglePasswordVisibility,
    
    // Utilities
    validateEmail,
    showCustomNotification
  };
}; 