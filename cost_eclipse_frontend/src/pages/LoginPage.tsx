import { LoginScreen } from '@/components/pages/login/LoginScreen';
import   { useState } from 'react';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Determine user role based on email (demo purposes)
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onNavigateToSignUp={() => {}}
      onNavigateToForgotPassword={() => {}}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;
