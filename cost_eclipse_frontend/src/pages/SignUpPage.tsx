import { SignUpScreen } from '@/components/pages/signUp/SignUpScreen'
import React, { useState } from 'react'
type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification';
const defaultScreen: AuthScreen = 'signup';
const SignUpPage = () => {
      const [currentScreen, setCurrentScreen] = useState<AuthScreen>(defaultScreen);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUserEmail(data.email);
      setCurrentScreen('email-verification');
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <SignUpScreen
          onSignUp={handleSignUp}
          onNavigateToLogin={() => setCurrentScreen('login')}
          isLoading={isLoading}
        />
  )
}

export default SignUpPage