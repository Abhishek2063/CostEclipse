import { ForgotPasswordScreen } from '@/components/pages/forgot_password/ForgotPasswordScreen';
import React, { useState } from 'react';
import { toast } from 'sonner';
type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification';
const defaultScreen: AuthScreen = 'signup';
const ForgotPasswordPage = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>(defaultScreen);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserEmail(email);
    } catch (error) {
      console.error('Forgot password failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ForgotPasswordScreen
      onSendResetLink={handleForgotPassword}
      onNavigateToLogin={() => setCurrentScreen('login')}
      isLoading={isLoading}
    />
  );
};

export default ForgotPasswordPage;
