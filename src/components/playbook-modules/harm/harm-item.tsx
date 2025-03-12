import { useId } from 'react';

type Props = {
  harmText?: string;
  column: number;
  level: number;
  onUpdate: (level: number, column: number, text: string) => void;
};

export default function HarmItem(props: Props) {
  const { harmText, onUpdate, level, column } = props;

  const consistentId = useId();

  return (
    <input
      type='text'
      value={harmText}
      id={consistentId}
      name={consistentId}
      onChange={(e) => onUpdate(level, column, e.currentTarget.value)}
    />
  );
}
