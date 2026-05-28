"use client";

import { InputFieldProps } from "../interfacesComponents";
import { useSpeechRecognition } from "@/app/hooks/useSpeechRecognition/useSpeechRecognition";
import { SpeechInputButton } from "./speechInputButton";
import { CharacterCounter } from "./characterCounter";
import { useEffect, useRef, useState } from "react";
import { VALIDATION } from "@/app/constantsGlobals";

export const InputField = ({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  onSpeechError,
  onCommit,
}: InputFieldProps) => {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const methodRef = useRef<'manual' | 'voice'>('manual');
  const lastCommittedRef = useRef<string>('');

  // Sync internal draft when parent pushes a new value (voice commit, reset)
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const validateAndCommit = (raw: string) => {
    const trimmed = raw.trim();
    setDraft(trimmed);
    if (trimmed.length < VALIDATION.NAME_MIN_LENGTH) {
      setError(`Mínimo ${VALIDATION.NAME_MIN_LENGTH} caracteres`);
    } else {
      setError(null);
      if (trimmed !== lastCommittedRef.current) {
        lastCommittedRef.current = trimmed;
        onCommit?.(trimmed, methodRef.current);
      }
    }
    onChange(trimmed);
  };

  const { isListening, hasSupport, toggleListening } = useSpeechRecognition({
    onResult: (speechValue) => {
      methodRef.current = 'voice';
      setDraft(speechValue);
      validateAndCommit(speechValue);
    },
    onError: onSpeechError,
    maxLength,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
    if (error) setError(null);
  };

  const handleBlur = () => {
    methodRef.current = 'manual';
    validateAndCommit(draft);
  };

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
          value={draft}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-cards border-b-2 py-2 pl-2 pr-10 text-center text-xl focus:outline-none focus:border-brand-color text-primary transition-colors duration-200 ${error ? "border-red-500" : "border-border"
            }`}
        />

        <SpeechInputButton
          isListening={isListening}
          hasSupport={hasSupport}
          onToggle={toggleListening}
        />
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-red-500">
          {error}
        </span>
        <CharacterCounter current={draft.length} max={maxLength} />
      </div>
    </div>
  );
};
