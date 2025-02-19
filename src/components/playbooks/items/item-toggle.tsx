import SquareToggle from '@/components/toggles/square';
import styles from './item-toggle.module.css';

type Props = {
  load: number,
  used?: boolean
};

export default function ItemToggle(props: Props) {
  const { used } = props;
  let { load } = props;

  // items of 0 load still show at least 1 square
  if (load === 0) {
    load = 1;
  }

  const squares = [];

  for (let i = 0; i < load; i++) {
    squares.push(<SquareToggle size={20} filled={used} />);
  }

  return (
    <ul className={styles.container}>
      {squares.map((square, i) => (
        <li
          className={styles.toggle}
          key={i}
        >
          {square}
        </li>
      ))}
    </ul>
  );
}
