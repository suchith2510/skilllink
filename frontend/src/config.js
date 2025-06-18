// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://your-backend-url.vercel.app');

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
    STATS: `${API_BASE_URL}/api/auth/stats`,
    USERS: `${API_BASE_URL}/api/auth/users`,
    SESSIONS: `${API_BASE_URL}/api/auth/sessions`,
  },
  INTERVIEW: {
    QUESTIONS: `${API_BASE_URL}/api/interview/questions`,
    PREDICT: `${API_BASE_URL}/api/interview/predict`,
    ANALYZE_RESUME: `${API_BASE_URL}/api/interview/analyze-resume`,
  },
  SKILLS: `${API_BASE_URL}/api/skills`,
  SUBSCRIPTION: {
    UPGRADE: `${API_BASE_URL}/api/subscription/upgrade`,
  },
  TUTORIALS: `${API_BASE_URL}/api/tutorials`,
};

export default API_ENDPOINTS; 