import SpeechIcon from "@/app/components/shared/icons/speechIcon";

interface SpeechInputButtonProps {
  isListening: boolean;
  hasSupport: boolean;
  onToggle: () => void;
}

export const SpeechInputButton = ({ isListening, hasSupport, onToggle }: SpeechInputButtonProps) => {
  if (!hasSupport) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`absolute right-2 p-1 rounded-full transition-all cursor-pointer duration-200 ${
        isListening
          ? "text-red-500 scale-110 animate-pulse"
          : "text-secondary hover:text-primary"
      }`}
      title="Dictar por voz"
    >
      <SpeechIcon listening={isListening} />
    </button>
  );
};
