"use client";

import { InputFieldProps } from "../interfacesComponents";
import { useSpeechRecognition } from "@/app/hooks/useSpeechRecognition/useSpeechRecognition";
import SpeechIcon from "@/app/components/shared/icons/speechIcon";

export const InputField = ({
  label,
  value,
  onChange,
  maxLength = 15,
  placeholder = "Escribe tu nombre",
}: InputFieldProps) => {
  const { isListening, hasSupport, toggleListening } = useSpeechRecognition({
    onResult: (value) => onChange(value),
    maxLength,
  });

  return (
    <div className="w-full flex flex-col gap-2 my-6">
      <label
        className="text-lg font-medium text-center text-primary"
        htmlFor="name-input"
      >
        {label}
      </label>

      <div className="relative w-full flex items-center">
        <input
          id="name-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full bg-cards border-b-2 border-border py-2 pl-2 pr-10 text-center text-xl focus:outline-none focus:border-brand-color text-primary transition-colors duration-200"
        />

        {hasSupport && (
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute right-2 p-1 rounded-full transition-all duration-200 ${isListening
              ? "text-red-500 scale-110 animate-pulse"
              : "text-secondary hover:text-primary"
              }`}
            title="Dictar por voz"
          >
            <SpeechIcon listening={isListening} />
          </button>
        )}
      </div>

      <span className="text-right text-xs text-secondary mt-1">
        {value.length}/{maxLength} caracteres
      </span>
    </div>
  );
};
