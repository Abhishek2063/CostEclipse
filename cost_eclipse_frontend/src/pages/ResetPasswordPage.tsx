import { ResetPasswordScreen } from '@/components/pages/reset_password/ResetPasswordScreen';
import   { useState } from 'react';

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Reset password failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordScreen
      onResetPassword={handleResetPassword}
      onNavigateToLogin={() => {}}
      isLoading={isLoading}
    />
  );
};

export default ResetPasswordPage;
