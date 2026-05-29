"use client";

import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { ModalIcon } from "@/app/components/shared/icons/modalIcon/modalIcon";
import { ModalProps } from "../../interfacesComponents";

export const Modal = ({ isOpen, onClose, title, message, type }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 transition-opacity duration-300" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-cards w-full max-w-sm rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ModalIcon type={type} />
              <DialogTitle className="text-lg font-semibold text-primary">
                {title}
              </DialogTitle>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              aria-label="Cerrar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <p className="text-secondary text-sm leading-relaxed">{message}</p>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
