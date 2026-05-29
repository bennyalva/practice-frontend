import type { ModalType } from "../interfacesGlobals";


export interface HomeQueryParamsResult {
  welcomeTitle: string;
  logoUrl: string;
  colorTitle: string;
}

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