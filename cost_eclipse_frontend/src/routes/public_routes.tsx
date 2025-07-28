import {
  FEATURES,
  HOME,
  HOW_IT_WORKS,
  ABOUT_US,
  CONTACT_US,
  COOKIES_POLICY,
  FAQ,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  EMAIL_VERIFICATION,
  LOGIN,
} from '@/constants/app_urls';
import React from 'react';

const HomeComponent = React.lazy(() => import('../pages/Home'));
const FeatureComponent = React.lazy(() => import('../pages/Feature'));
const HowItWorksComponent = React.lazy(() => import('../pages/HowItWorks'));
const AboutUsComponent = React.lazy(() => import('../pages/AboutUs'));
const ContactUsComponent = React.lazy(() => import('../pages/ContactUs'));
const CookiesPolicyComponent = React.lazy(() => import('../pages/CookiesPolicy'));
const FAQComponent = React.lazy(() => import('../pages/Faq'));
const PrivacyPolicyComponent = React.lazy(() => import('../pages/PrivacyPolicy'));
const TermsAndConditionsComponent = React.lazy(() => import('../pages/TermsAndConditions'));
const SignupComponent = React.lazy(() => import('../pages/SignUpPage'));
const ForgotPasswordComponent = React.lazy(() => import('../pages/ForgotPasswordPage'));
const ResetPasswordComponent = React.lazy(() => import('../pages/ResetPasswordPage'));
const EmailVerificationComponent = React.lazy(() => import('../pages/EmailVerification'));
const LoginComponent = React.lazy(() => import('../pages/LoginPage'));

export const publicRoutes = [
  { path: HOME, element: <HomeComponent /> },
  { path: FEATURES, element: <FeatureComponent /> },
  { path: HOW_IT_WORKS, element: <HowItWorksComponent /> },
  { path: ABOUT_US, element: <AboutUsComponent /> },
  { path: CONTACT_US, element: <ContactUsComponent /> },
  { path: COOKIES_POLICY, element: <CookiesPolicyComponent /> },
  { path: FAQ, element: <FAQComponent /> },
  { path: PRIVACY_POLICY, element: <PrivacyPolicyComponent /> },
  { path: TERMS_AND_CONDITIONS, element: <TermsAndConditionsComponent /> },
];

export const authRoutes = [
  { path: SIGNUP, element: <SignupComponent /> },
  { path: FORGOT_PASSWORD, element: <ForgotPasswordComponent /> },
  { path: RESET_PASSWORD, element: <ResetPasswordComponent /> },
  { path: EMAIL_VERIFICATION, element: <EmailVerificationComponent /> },
  { path: LOGIN, element: <LoginComponent /> },
];
