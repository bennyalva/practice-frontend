import { InputFieldProps } from '../interfacesComponents';

export const InputField = ({
  label,
  value,
  onChange,
  maxLength = 15,
  placeholder = "Escribe tu nombre"
}: InputFieldProps) => {
  return (
    <div className="w-full flex flex-col gap-2 my-6">
      <label className="text-lg font-medium text-center text-primary" htmlFor="name-input">
        {label}
      </label>
      <input
        id="name-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full bg-cards border-b-2 border-border 
                   py-2 px-1 text-center text-xl focus:outline-none focus:border-brand-color 
                   text-primary transition-colors duration-200"
      />
      <span className="text-right text-xs text-secondary mt-1">
        {value.length}/{maxLength} caracteres
      </span>
    </div>
  );
};
