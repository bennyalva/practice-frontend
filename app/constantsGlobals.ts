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

export const ViewOptions = {
    one: '1',
    two: '2',
};

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ADMIN, ROUTES.PROFILE];

