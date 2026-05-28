import { ModalType } from "../hooks/interfacesHooks";
import { InputMethods } from "../pages/interfacesPages";


export interface BrandLogoProps {
  logoUrl: string | null;
  altText?: string;
}


export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder: string;
  onSpeechError?: (error: { type: ModalType; message: string }) => void;
  onCommit?: (value: string, method: InputMethods) => void;
}

export interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
export interface SpeechIconProps {
  listening?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: ModalType;
}

export interface ModalIconProps {
  type: ModalType;
}
