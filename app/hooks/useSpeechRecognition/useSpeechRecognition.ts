"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UseSpeechRecognitionOptions, UseSpeechRecognitionResult } from "../interfacesHooks";
import { LANGUAGE_SPANISH } from "../constantsHooks";

export function useSpeechRecognition({
  onResult,
  maxLength,
}: UseSpeechRecognitionOptions): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [hasSupport, setHasSupport] = useState(false);
  const recognitionRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  const maxLengthRef = useRef(maxLength);

  // Mantener refs actualizadas sin disparar re-renders
  onResultRef.current = onResult;
  maxLengthRef.current = maxLength;

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    setHasSupport(true);
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = LANGUAGE_SPANISH;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      onResultRef.current(speechToText.slice(0, maxLengthRef.current));
    };

    recognition.onerror = (event: any) => {
      console.error("Error en reconocimiento de voz:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error al iniciar el dictado:", error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  return { isListening, hasSupport, toggleListening };
}
