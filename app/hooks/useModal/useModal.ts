import { useRef, useState } from "react";
import { ModalType, MODAL_TYPE, ModalState } from "@/app/hooks/interfacesHooks";
import { INITIAL_MODAL, TITLE_ERROR_GENERIC } from "@/app/constantsGlobals";

export function useModal() {
  const [modal, setModal] = useState<ModalState>(INITIAL_MODAL);
  const onCloseRef = useRef<(() => void) | undefined>(undefined);

  const showInfo = (title: string, message: string, onClose?: () => void) => {
    onCloseRef.current = onClose;
    setModal({ isOpen: true, type: MODAL_TYPE.INFO, title, message });
  };

  const showWarning = (message: string) => {
    setModal({ isOpen: true, type: MODAL_TYPE.WARNING, title: TITLE_ERROR_GENERIC.WARNING, message });
  };

  const showError = (message: string) => {
    setModal({ isOpen: true, type: MODAL_TYPE.ERROR, title: TITLE_ERROR_GENERIC.ERROR, message });
  };

  const showByError = (error: { type: ModalType; message: string }) => {
    error.type === MODAL_TYPE.WARNING
      ? showWarning(error.message)
      : showError(error.message);
  };

  const closeModal = () => {
    onCloseRef.current?.();
    onCloseRef.current = undefined;
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { modal, showInfo, showWarning, showError, showByError, closeModal };
}
