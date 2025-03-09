import { useState } from 'react';
import SquareToggle from '@/components/toggles/square';
import styles from './item-toggle.module.css';

type Props = {
  load: number;
  selected: boolean;
  onSelect: (selected: boolean) => void;
};

export default function ItemToggle(props: Props) {
  const { selected, onSelect } = props;
  let { load } = props;
  const [highlighted, setIsHighlighted] = useState<boolean>(false);

  // items of 0 load still show at least 1 square
  if (load === 0) {
    load = 1;
  }

  const squares = [];

  for (let i = 0; i < load; i++) {
    squares.push(
      <SquareToggle
        size={20}
        filled={selected}
        highlighted={highlighted}
        onClick={() => {
          onSelect(!selected);
        }}
        onMouseEnter={() => {
          setIsHighlighted(true);
        }}
        onMouseLeave={() => {
          setIsHighlighted(false);
        }}
      />
    );
  }

  return (
    <ul className={styles.container}>
      {squares.map((square, i) => (
        <li className={styles.toggle} key={i}>
          {square}
        </li>
      ))}
    </ul>
  );
}
