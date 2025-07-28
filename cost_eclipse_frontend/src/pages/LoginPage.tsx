import { LoginScreen } from '@/components/pages/login/LoginScreen';
import React, { useState } from 'react';
import { toast } from 'sonner';
type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification';
const defaultScreen: AuthScreen = 'signup';

const LoginPage = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>(defaultScreen);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Determine user role based on email (demo purposes)
      const userRole = data.email.includes('admin') ? 'admin' : 'user';
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onNavigateToSignUp={() => setCurrentScreen('signup')}
      onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;
