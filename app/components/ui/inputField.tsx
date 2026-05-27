"use client";

import { InputFieldProps } from "../interfacesComponents";
import { useSpeechRecognition } from "@/app/hooks/useSpeechRecognition/useSpeechRecognition";

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
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      <span className="text-right text-xs text-secondary mt-1">
        {value.length}/{maxLength} caracteres
      </span>
    </div>
  );
};
