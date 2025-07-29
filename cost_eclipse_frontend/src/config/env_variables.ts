type EnvType = 'local' | 'dev' | 'prod';

interface EnvVariables {
  LOCATION?: string;
  CONTACT_NUMBER?: string;
  EMAIL?: string;
  TWITTER_LINK?: string;
  FACEBOOK_LINK?: string;
  INSTAGRAM_LINK?: string;
  LINKEDIN_LINK?: string;
  GITHUB_LINK?: string;
  TECHNICAL_DOCUMENTATION_LINK?: string;
}

const ENV: EnvType = (import.meta.env.VITE_ENV as EnvType) || 'local';

const getEnvVar = (key: string): string | undefined =>
  import.meta.env[key as keyof ImportMetaEnv];

const envConfigs: Record<EnvType, EnvVariables> = {
  local: {
    LOCATION: getEnvVar('VITE_LOCAL_LOCATION'),
    CONTACT_NUMBER: getEnvVar('VITE_LOCAL_CONTACT_NUMBER'),
    EMAIL: getEnvVar('VITE_LOCAL_EMAIL'),
    TWITTER_LINK: getEnvVar('VITE_LOCAL_TWITTER_LINK'),
    FACEBOOK_LINK: getEnvVar('VITE_LOCAL_FACEBOOK_LINK'),
    INSTAGRAM_LINK: getEnvVar('VITE_LOCAL_INSTAGRAM_LINK'),
    LINKEDIN_LINK: getEnvVar('VITE_LOCAL_LINKEDIN_LINK'),
    GITHUB_LINK: getEnvVar('VITE_LOCAL_GITHUB_LINK'),
    TECHNICAL_DOCUMENTATION_LINK: getEnvVar('VITE_LOCAL_TECHNICAL_DOCUMENTATION_LINK'),
  },
  dev: {
    LOCATION: getEnvVar('VITE_DEV_LOCATION'),
    CONTACT_NUMBER: getEnvVar('VITE_DEV_CONTACT_NUMBER'),
    EMAIL: getEnvVar('VITE_DEV_EMAIL'),
    TWITTER_LINK: getEnvVar('VITE_DEV_TWITTER_LINK'),
    FACEBOOK_LINK: getEnvVar('VITE_DEV_FACEBOOK_LINK'),
    INSTAGRAM_LINK: getEnvVar('VITE_DEV_INSTAGRAM_LINK'),
    LINKEDIN_LINK: getEnvVar('VITE_DEV_LINKEDIN_LINK'),
    GITHUB_LINK: getEnvVar('VITE_DEV_GITHUB_LINK'),
    TECHNICAL_DOCUMENTATION_LINK: getEnvVar('VITE_DEV_TECHNICAL_DOCUMENTATION_LINK'),
  },
  prod: {
    LOCATION: getEnvVar('VITE_PROD_LOCATION'),
    CONTACT_NUMBER: getEnvVar('VITE_PROD_CONTACT_NUMBER'),
    EMAIL: getEnvVar('VITE_PROD_EMAIL'),
    TWITTER_LINK: getEnvVar('VITE_PROD_TWITTER_LINK'),
    FACEBOOK_LINK: getEnvVar('VITE_PROD_FACEBOOK_LINK'),
    INSTAGRAM_LINK: getEnvVar('VITE_PROD_INSTAGRAM_LINK'),
    LINKEDIN_LINK: getEnvVar('VITE_PROD_LINKEDIN_LINK'),
    GITHUB_LINK: getEnvVar('VITE_PROD_GITHUB_LINK'),
    TECHNICAL_DOCUMENTATION_LINK: getEnvVar('VITE_PROD_TECHNICAL_DOCUMENTATION_LINK'),
  },
};

const envConfig: EnvVariables = envConfigs[ENV];

export default envConfig;
