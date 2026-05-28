export const MODAL_TYPE = {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
} as const;

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];