export const environment = {
  apiHost: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
}; 