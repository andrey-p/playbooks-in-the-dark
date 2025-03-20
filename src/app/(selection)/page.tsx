import OptionList from './components/option-list';
import OptionButton from './components/option-button';
import Separator from './components/separator';
//import { getPlaybooks } from '@/lib/local-storage';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <div>(You have no saved playbooks.)</div>
      <Separator />
      <Link className={styles.link} href='/new'>New playbook</Link>
    </div>
  );
}
