import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useModal } from "./useModal";
import { INITIAL_MODAL } from "@/app/constantsGlobals";

describe("useModal", () => {
  describe("initial state", () => {
    it("returns modal closed with empty values", () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modal).toEqual(INITIAL_MODAL);
    });
  });

  describe("showInfo", () => {
    it("opens the modal with INFO type, custom title and message", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.showInfo("Título", "Mensaje de prueba");
      });

      expect(result.current.modal).toMatchObject({
        isOpen: true,
        type: "info",
        title: "Título",
        message: "Mensaje de prueba",
      });
    });

    it("stores the onClose callback for later execution", () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.showInfo("Título", "Mensaje", onClose);
      });
      act(() => {
        result.current.closeModal();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("showWarning", () => {
    it("opens the modal with WARNING type and 'Aviso' title", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.showWarning("Alerta de prueba");
      });

      expect(result.current.modal).toMatchObject({
        isOpen: true,
        type: "warning",
        title: "Aviso",
        message: "Alerta de prueba",
      });
    });
  });

  describe("showError", () => {
    it("opens the modal with ERROR type and 'Error' title", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.showError("Ocurrió un fallo");
      });

      expect(result.current.modal).toMatchObject({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Ocurrió un fallo",
      });
    });
  });



  describe("closeModal", () => {

    it("clears the stored onClose after calling it", () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.showInfo("Título", "Mensaje", onClose);
      });
      act(() => {
        result.current.closeModal();
      });
      expect(onClose).toHaveBeenCalledTimes(1);

    });
  });
});
