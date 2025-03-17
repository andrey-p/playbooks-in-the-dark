import styles from './button.module.css';

type Props = {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
};

export default function Button(props: Props) {
  const { onClick, label, icon } = props;

  return (
    <button className={styles.button} onClick={onClick} aria-label={label}>
      {icon}
    </button>
  );
}
