import CircleToggle from '@/components/circle-toggle/circle-toggle';
import styles from './circle-tracker.module.css';

type Props = {
  value: number,
  max: number
};

export default function CircleTracker(props: Props) {
  const { value, max } = props;
  const circles = [];

  for (let i = 0; i < max; i++) {
    circles.push(
      <CircleToggle key={i} filled={i < value} />
    );
  }

  return (
    <div className={styles.container}>
      {circles}
    </div>
  );
}
