import { MODAL_TYPE, ModalType } from "./interfacesGlobals";


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
    SHOPINBAZ: '1',
    ELEKTRA_LOAN: '2',
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
    },
    HOME: {
        PEOPLE: '/images/pages/home/people.png',
    }
};

export const VALIDATION = {
    NAME_MIN_LENGTH: 4,
};

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ADMIN, ROUTES.PROFILE];

export const TITLE_ERROR_GENERIC = {
    ERROR: "Error",
    WARNING: "Aviso",
}

export const INITIAL_MODAL: { isOpen: boolean; type: ModalType; title: string; message: string } = {
    isOpen: false,
    type: MODAL_TYPE.INFO,
    title: "",
    message: "",
};

export const GTM_EVENTS = {
    NAME_INPUT: 'name_input',
    NAME_DISPLAYED: 'name_displayed',
    THEME_LOADED: 'theme_loaded',
};

export const INPUT_METHODS = {
    MANUAL: 'manual',
    VOICE: 'voice',
} as const;

