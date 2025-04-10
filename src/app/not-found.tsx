import Layout from './(selection)/layout';
import styles from './errors.module.css';

export default function NotFound() {
  return (
    <Layout>
      <h2 className={styles.heading}>404</h2>
      <p>Your page was not found in the dark.</p>
    </Layout>
  );
}
