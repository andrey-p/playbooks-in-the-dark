'use client';

import { useEffect } from 'react';
import Layout from './(selection)/layout';
import styles from './errors.module.css';

type Props = {
  error: Error & { digest?: string };
};

export default function Error(props: Props) {
  const { error } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <h2 className={styles.heading}>500</h2>
      <p>Something went tremendously wrong.</p>
    </Layout>
  );
}
