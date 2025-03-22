import SavedPlaybooks from './components/saved-playbooks';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <SavedPlaybooks />
      <Link className={styles.link} href='/new'>
        New playbook
      </Link>
    </div>
  );
}
