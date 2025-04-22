import styles from './question-answer.module.css';

type Props = {
  id: string;
  question: string;
  answer: string;
};

export default function QuestionAnswer(props: Props) {
  const { id, question, answer } = props;

  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{question}</h3>
      <div
        className={styles.answer}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  );
}
