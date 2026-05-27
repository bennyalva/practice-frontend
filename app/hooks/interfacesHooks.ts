export interface HomeQueryParamsResult {
  welcomeTitle: string;
  logoUrl: string;
  theme: string;
  colorTitle: string;
}
export interface UseSpeechRecognitionOptions {
  onResult: (text: string) => void;
  maxLength: number;
}

export interface UseSpeechRecognitionResult {
  isListening: boolean;
  hasSupport: boolean;
  toggleListening: () => void;
}