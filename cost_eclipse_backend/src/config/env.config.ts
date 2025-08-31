import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";

// load env file according to NODE_ENV
dotenv.config({ path: `.env.${env}` });

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = [
  "NODE_ENV",
  "PORT",
  "DB_HOST",
  "DB_USER",
  "DB_PASS",
  "DB_NAME",
];

const config: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  DB_HOST: process.env.DB_HOST || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "",
};

// Verify that all required variables are present
for (const key of requiredEnvVars) {
  if (!config[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

export default config;
