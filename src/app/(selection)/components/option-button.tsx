import styles from './option-button.module.css';
import Link from 'next/link';

type Props = {
  href: string;
  name: string;
  description: string;
};

export default function OptionButton(props: Props) {
  const { href, name, description } = props;

  return (
    <Link className={styles.container} href={href}>
      <h3 className={styles.heading}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </Link>
  );
}
