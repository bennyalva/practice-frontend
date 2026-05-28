export const INPUT_METHODS = {
    MANUAL: 'manual',
    VOICE: 'voice',
} as const;

export type InputMethods = typeof INPUT_METHODS[keyof typeof INPUT_METHODS];