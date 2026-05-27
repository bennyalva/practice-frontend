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
}

export interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
export interface SpeechIconProps {
  listening?: boolean;
}