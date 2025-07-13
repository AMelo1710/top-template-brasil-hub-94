import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';
import { ForgotPasswordForm } from '@/components/Home';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [forgotForm, setForgotForm] = useState({
    email: ''
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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotForm.email)) {
      showCustomNotification('Por favor, preencha um email válido.', 'error');
      return;
    }
    showCustomNotification('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.', 'success');
    setForgotForm({ email: '' });
  };

  const handleForgotFormChange = (value: string) => {
    setForgotForm({ email: value });
  };

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

      <ForgotPasswordForm
        forgotForm={forgotForm}
        validateEmail={validateEmail}
        onForgotFormChange={handleForgotFormChange}
        onSubmit={handleForgotSubmit}
        onBack={() => navigate('/login')}
      />
    </div>
  );
};

export default ForgotPassword; 