import { SignUpScreen } from '@/components/pages/signUp/SignUpScreen'
import   { useState } from 'react'
const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <SignUpScreen
          onSignUp={handleSignUp}
          onNavigateToLogin={() => {}}
          isLoading={isLoading}
        />
  )
}

export default SignUpPage