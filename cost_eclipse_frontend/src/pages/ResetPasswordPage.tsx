import { ResetPasswordScreen } from '@/components/pages/reset_password/ResetPasswordScreen';
import React, { useState } from 'react';
type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification';
const defaultScreen: AuthScreen = 'signup';

const ResetPasswordPage = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>(defaultScreen);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentScreen('login');
    } catch (error) {
      console.error('Reset password failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordScreen
      onResetPassword={handleResetPassword}
      onNavigateToLogin={() => setCurrentScreen('login')}
      isLoading={isLoading}
    />
  );
};

export default ResetPasswordPage;
