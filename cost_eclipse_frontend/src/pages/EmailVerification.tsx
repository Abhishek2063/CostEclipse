import { EmailVerificationScreen } from '@/components/pages/email_verification/EmailVerificationScreen'
import React, { useState } from 'react';
import { toast } from 'sonner';
type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification';
const defaultScreen: AuthScreen = 'signup';
const EmailVerification = () => {
      const [currentScreen, setCurrentScreen] = useState<AuthScreen>(defaultScreen);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


      const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Resend email failed:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <EmailVerificationScreen
          onResendEmail={handleResendEmail}
          onNavigateToLogin={() => setCurrentScreen('login')}
          isLoading={isLoading}
          userEmail={userEmail}
        />
  )
}

export default EmailVerification