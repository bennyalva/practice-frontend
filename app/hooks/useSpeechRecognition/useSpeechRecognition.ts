"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UseSpeechRecognitionOptions, UseSpeechRecognitionResult } from "../interfacesHooks";
import { ERROR_MESSAGES, LANGUAGE_SPANISH, RECOGNITION_ERRORS, } from "../constantsHooks";
import { MODAL_TYPE } from "@/app/interfacesGlobals";

export function useSpeechRecognition({
  onResult,
  onError,
  maxLength,
}: UseSpeechRecognitionOptions): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [hasSupport, setHasSupport] = useState(false);
  const recognitionRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  const maxLengthRef = useRef(maxLength);

  // Mantener refs actualizadas sin disparar re-renders
  onResultRef.current = onResult;
  onErrorRef.current = onError;
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

      if (event.error === RECOGNITION_ERRORS.NOT_ALLOWED) {
        onErrorRef.current?.({ type: MODAL_TYPE.WARNING, message: ERROR_MESSAGES.NOT_ALLOWED });
        setIsListening(false);
        return;
      }

      if (event.error === RECOGNITION_ERRORS.NO_SPEECH) {
        onErrorRef.current?.({ type: MODAL_TYPE.WARNING, message: ERROR_MESSAGES.NO_SPEECH });
        setIsListening(false);
        return;
      }

      onErrorRef.current?.({ type: MODAL_TYPE.ERROR, message: ERROR_MESSAGES.DEFAULT });
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
        onErrorRef.current?.({ type: MODAL_TYPE.ERROR, message: ERROR_MESSAGES.ERROR_STARTING });
        setIsListening(false);
      }
    }
  }, [isListening]);

  return { isListening, hasSupport, toggleListening };
}
