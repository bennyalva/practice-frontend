export const WELCOME_TITLES = {
    ELEKTRA_LOAN: "¡Te damos la bienvenida a Préstamo Elektra!",
    SHOPINBAZ: "¡Te damos la bienvenida a Shopinbaz!",
};

export const QUERY_PARAM_KEYS = {
    VIEW: "num",
};

export const TITLE_COLOR_CLASSES: Record<string, string> = {
    "1": "text-title-shopinbaz",
    "2": "text-title-elektra",
};

export const LANGUAGE_SPANISH = 'es-ES';

export const RECOGNITION_ERRORS = {
    NOT_ALLOWED: 'not-allowed',
    NO_SPEECH: 'no-speech',
    ABORTED: 'aborted',
    SERVICE_NOT_ALLOWED: 'service-not-allowed',
};

export const ERROR_MESSAGES = {
    NOT_ALLOWED: "Permiso de micrófono denegado. Actívalo desde la configuración del navegador.",
    NO_SPEECH: "No se detectó ninguna voz. Intenta dictar de nuevo.",
    ABORTED: "Dictado interrumpido. Vuelve a tocar el micrófono para intentarlo.",
    SERVICE_NOT_ALLOWED: "El servicio de dictado no está disponible. Verifica que la opción 'Dictado' esté activada en Ajustes de tu dispositivo.",
    DEFAULT: "Ocurrió un error con el reconocimiento de voz. Intenta de nuevo.",
    ERROR_STARTING: "Error al iniciar el dictado, intenta de nuevo.",
};