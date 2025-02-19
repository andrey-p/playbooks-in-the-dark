import DaggerToggle from '@/components/toggles/dagger';
import styles from './dagger-tracker.module.css';

type Props = {
  value: number,
  max: number
};

export default function DaggerTracker(props: Props) {
  const { value, max } = props;
  const daggers = [];

  for (let i = 0; i < max; i++) {
    daggers.push(
      <DaggerToggle key={i} filled={i < value} />
    );
  }

  return (
    <div className={styles.container}>
      {daggers}
    </div>
  );
}
