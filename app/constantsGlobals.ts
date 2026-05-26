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

export const VIEW_OPTIONS = {
    shopinbaz: '1',
    elektraLoan: '2',
};

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const ASSETS_PATHS = {
    LOGOS: {
        ELEKTRA_LIGHT: '/images/pages/home/elecktraLight.png',  
        SHOPINBAZ_LIGHT: '/images/pages/home/shopinbazLight.png',
        ELEKTRA_DARK: '/images/pages/home/elecktraDark.png',
        SHOPINBAZ_DARK: '/images/pages/home/shopingbazDark.png',
    }
};

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ADMIN, ROUTES.PROFILE];

