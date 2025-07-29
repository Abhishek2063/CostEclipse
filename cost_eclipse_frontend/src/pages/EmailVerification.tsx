import { EmailVerificationScreen } from '@/components/pages/email_verification/EmailVerificationScreen'
import   { useState } from 'react';
const EmailVerification = () => {
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
          onNavigateToLogin={() => {}}
          isLoading={isLoading}
          userEmail={""}
        />
  )
}

export default EmailVerification