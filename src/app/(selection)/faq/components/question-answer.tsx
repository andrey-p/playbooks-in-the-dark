import styles from './question-answer.module.css';
import { FiLink } from 'react-icons/fi';

type Props = {
  id: string;
  question: string;
  answer: string;
};

export default function QuestionAnswer(props: Props) {
  const { id, question, answer } = props;

  return (
    <div className={styles.container}>
      <h3 className={styles.question} id={id}>
        {question}
      </h3>
      <a
        className={styles.link}
        href={`#${id}`}
        aria-label='Direct link to this question'
      >
        <FiLink />
      </a>
      <div
        className={styles.answer}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  );
}
