import { useId } from 'react';

type Option = { id: string | null; name: string };

type Props = {
  options: Option[];
  selected: string | null;
  onValueSelect: (id: string | null) => void;
};

export default function RadioGroup(props: Props) {
  const { options, selected, onValueSelect } = props;
  const id = useId();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const nextId = e.currentTarget.value;

    if (nextId === selected) {
      onValueSelect(null);
    } else {
      onValueSelect(nextId);
    }
  };

  return (
    <ul>
      {options.map((option: Option) => (
        <li key={option.id}>
          <label>
            <input
              type='radio'
              name={id}
              checked={selected === option.id}
              value={option.id || ''}
              onClick={onChange}
              onChange={onChange}
            />
            {option.name}
          </label>
        </li>
      ))}
    </ul>
  );
}
