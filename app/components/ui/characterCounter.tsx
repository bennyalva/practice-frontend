interface CharacterCounterProps {
  current: number;
  max: number;
}

export const CharacterCounter = ({ current, max }: CharacterCounterProps) => {
  return (
    <span className="text-xs text-secondary">
      {current}/{max} caracteres
    </span>
  );
};
