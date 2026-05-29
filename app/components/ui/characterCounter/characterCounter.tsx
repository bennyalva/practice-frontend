import { CharacterCounterProps } from "../../interfacesComponents";


export const CharacterCounter = ({ current, max }: CharacterCounterProps) => {
  return (
    <span className="text-xs text-secondary">
      {current}/{max} caracteres
    </span>
  );
};
