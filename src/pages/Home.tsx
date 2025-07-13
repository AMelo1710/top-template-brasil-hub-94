
import React from 'react';
import { useHomeState } from '@/hooks/useHomeState';
import {
  Notification,
  Header,
  HeroSection,
  BenefitsSection,
  FooterSection,
  LoginForm,
  ForgotPasswordForm
} from '@/components/Home';

const Landing = () => {
  const {
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
    validateEmail
  } = useHomeState();

  // Conditional renders for login and forgot password forms
  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        forgotForm={forgotForm}
        validateEmail={validateEmail}
        onForgotFormChange={handleForgotFormChange}
        onSubmit={handleForgotSubmit}
        onBack={() => setShowForgotPassword(false)}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginForm
        loginForm={loginForm}
        showPassword={showPassword}
        isLoginFormValid={isLoginFormValid}
        validateEmail={validateEmail}
        onLoginFormChange={handleLoginFormChange}
        onTogglePasswordVisibility={togglePasswordVisibility}
        onSubmit={handleLoginSubmit}
        onBack={() => setShowLogin(false)}
        onForgotPassword={() => setShowForgotPassword(true)}
      />
    );
  }

  // Main landing page
  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
      <Notification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={closeNotification}
      />
      
      <Header />
      <HeroSection onLoginClick={() => setShowLogin(true)} />
      <BenefitsSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
