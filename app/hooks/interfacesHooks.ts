export interface HomeQueryParamsResult {
  welcomeTitle: string;
  logoUrl: string;
  theme: string;
  colorTitle: string;
}
export const MODAL_TYPE = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
} as const;

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];

export interface SpeechError {
  type: ModalType;
  message: string;
}

export interface UseSpeechRecognitionOptions {
  onResult: (text: string) => void;
  onError?: (error: SpeechError) => void;
  maxLength: number;
}

export interface UseSpeechRecognitionResult {
  isListening: boolean;
  hasSupport: boolean;
  toggleListening: () => void;
}

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
}