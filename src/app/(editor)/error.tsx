'use client';

type Props = {
  error: Error & { digest?: string };
};

import { isValidationErrorLike } from 'zod-validation-error';
import styles from '@/app/errors.module.css';

// the purpose of this error boundary is to catch and display any validation errors
// these are mostly expected to happen around system development,
// so having them visible is more important than having them pretty
export default function Error(props: Props) {
  const { error } = props;

  // anything else can be passed to the global error boundary
  if (!isValidationErrorLike(error)) {
    throw error;
  }

  return (
    <div>
      <h2 className={styles.heading}>Validation error</h2>
      <p>{error.message}</p>
      <p>This is an error with the system JSON files.</p>
    </div>
  );
}
