import dotenv from 'dotenv';

// .envファイルを読み込む
dotenv.config();

export const environment = {
  apiHost: process.env.API_HOST,
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
}; 