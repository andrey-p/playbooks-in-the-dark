import styles from './icon-button.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: React.ReactNode;
};

export default function IconButton(props: Props) {
  const { label, icon, ...rest } = props;

  return (
    <button className={styles.button} aria-label={label} {...rest}>
      {icon}
    </button>
  );
}
