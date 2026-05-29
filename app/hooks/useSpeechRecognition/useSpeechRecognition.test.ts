import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { ERROR_MESSAGES, RECOGNITION_ERRORS } from "../constantsHooks";
import { MODAL_TYPE } from "@/app/interfacesGlobals";

interface MockRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  abort: ReturnType<typeof vi.fn>;
}

function createMockRecognition(): MockRecognition {
  return {
    continuous: false,
    interimResults: false,
    lang: "",
    onresult: null,
    onerror: null,
    onend: null,
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
  };
}

function buildSpeechEvent(transcript: string): SpeechRecognitionEvent {
  return {
    results: [[{ transcript }]] as unknown as SpeechRecognitionResultList,
    resultIndex: 0,
  } as SpeechRecognitionEvent;
}

function buildErrorEvent(error: string): SpeechRecognitionErrorEvent {
  return { error } as SpeechRecognitionErrorEvent;
}

const defaultProps = {
  onResult: vi.fn(),
  maxLength: 15,
};

function buildProps(overrides = {}) {
  return { ...defaultProps, ...overrides };
}

describe("useSpeechRecognition", () => {
  let mockRecognition: MockRecognition;

  beforeEach(() => {
    mockRecognition = createMockRecognition();
    // Must be a regular function (not arrow) to support `new`
    (window as Record<string, unknown>).SpeechRecognition = function () {
      return mockRecognition;
    } as unknown as typeof SpeechRecognition;
    (window as Record<string, unknown>).webkitSpeechRecognition = undefined;
  });

  afterEach(() => {
    delete (window as Record<string, unknown>).SpeechRecognition;
    delete (window as Record<string, unknown>).webkitSpeechRecognition;
  });

  describe("browser support detection", () => {
    it("returns hasSupport: false when SpeechRecognition is not available", () => {
      delete (window as Record<string, unknown>).SpeechRecognition;

      const { result } = renderHook(() => useSpeechRecognition(buildProps()));

      expect(result.current.hasSupport).toBe(false);
    });

    it("returns hasSupport: true when SpeechRecognition is available", () => {
      const { result } = renderHook(() => useSpeechRecognition(buildProps()));

      expect(result.current.hasSupport).toBe(true);
    });

  });

  describe("toggleListening", () => {
    it("starts recognition when not listening", () => {
      const { result } = renderHook(() => useSpeechRecognition(buildProps()));

      act(() => {
        result.current.toggleListening();
      });

      expect(mockRecognition.start).toHaveBeenCalledTimes(1);
      expect(result.current.isListening).toBe(true);
    });

    it("stops recognition when already listening", () => {
      const { result } = renderHook(() => useSpeechRecognition(buildProps()));

      act(() => {
        result.current.toggleListening(); // start
      });
      act(() => {
        result.current.toggleListening(); // stop
      });

      expect(mockRecognition.stop).toHaveBeenCalledTimes(1);
    });

    it("calls onError when start() throws", () => {
      const onError = vi.fn();
      mockRecognition.start.mockImplementation(() => {
        throw new Error("fail");
      });

      const { result } = renderHook(() => useSpeechRecognition(buildProps({ onError })));

      act(() => {
        result.current.toggleListening();
      });

      expect(onError).toHaveBeenCalledWith({
        type: MODAL_TYPE.ERROR,
        message: ERROR_MESSAGES.ERROR_STARTING,
      });
      expect(result.current.isListening).toBe(false);
    });
  });

  describe("onresult", () => {
    it("calls onResult with the transcript", () => {
      const onResult = vi.fn();
      renderHook(() => useSpeechRecognition(buildProps({ onResult })));

      act(() => {
        mockRecognition.onresult!(buildSpeechEvent("Hola mundo"));
      });

      expect(onResult).toHaveBeenCalledWith("Hola mundo");
    });

  });

  describe("onerror", () => {
    it("calls onError with warning when permission is denied", () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useSpeechRecognition(buildProps({ onError })));

      act(() => {
        mockRecognition.onerror!(buildErrorEvent(RECOGNITION_ERRORS.NOT_ALLOWED));
      });

      expect(onError).toHaveBeenCalledWith({
        type: MODAL_TYPE.WARNING,
        message: ERROR_MESSAGES.NOT_ALLOWED,
      });
      expect(result.current.isListening).toBe(false);
    });

    it("calls onError with warning when no speech is detected", () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useSpeechRecognition(buildProps({ onError })));

      act(() => {
        mockRecognition.onerror!(buildErrorEvent("no-speech"));
      });

      expect(onError).toHaveBeenCalledWith({
        type: MODAL_TYPE.WARNING,
        message: ERROR_MESSAGES.NO_SPEECH,
      });
      expect(result.current.isListening).toBe(false);
    });

    it("calls onError with error for unrecognized errors", () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useSpeechRecognition(buildProps({ onError })));

      act(() => {
        mockRecognition.onerror!(buildErrorEvent("network"));
      });

      expect(onError).toHaveBeenCalledWith({
        type: MODAL_TYPE.ERROR,
        message: ERROR_MESSAGES.DEFAULT,
      });
      expect(result.current.isListening).toBe(false);
    });


  });

});
