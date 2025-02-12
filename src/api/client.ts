import { environment } from '../config/environment';

export const apiClient = {
  baseURL: environment.apiHost,
  headers: {
    'Authorization': `Bearer ${environment.apiKey}`,
  },
  // ... その他の設定
}; 