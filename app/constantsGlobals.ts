export const ROUTES = {
  HOME: '/pages/home',
  DASHBOARD: '/dashboard',  
  ADMIN: '/admin',
  PROFILE: '/profile',
  LOGIN: '/login',
};

export const SESSION_NAMES = {
  TOKEN: 'session_token',
};

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ADMIN, ROUTES.PROFILE];

