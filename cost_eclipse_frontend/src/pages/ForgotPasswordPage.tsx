import { ForgotPasswordScreen } from '@/components/pages/forgot_password/ForgotPasswordScreen';
import   { useState } from 'react';
const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Forgot password failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ForgotPasswordScreen
      onSendResetLink={handleForgotPassword}
      onNavigateToLogin={() => {}}
      isLoading={isLoading}
    />
  );
};

export default ForgotPasswordPage;
