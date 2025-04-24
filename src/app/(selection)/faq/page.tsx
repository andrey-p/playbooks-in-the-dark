import QuestionAnswer from './components/question-answer';
import Heading from '../components/heading';
import Separator from '../components/separator';
import { useTranslations } from 'next-intl';

// the text is in /lang/en.json
const questionsAnswers = [
  'whatIsThis',
  'whatThisIsnt',
  'saving',
  'canYouAdd',
  'howDoIAdd',
  'contact'
];

export default function FAQ() {
  const t = useTranslations('UI.FAQ');

  return (
    <div>
      <Heading>FAQ</Heading>
      {questionsAnswers.map((qa, i) => (
        <div key={qa}>
          <QuestionAnswer
            id={qa}
            key={qa}
            question={t(`${qa}.q`)}
            answer={t.raw(`${qa}.a`)}
          />
          {i < questionsAnswers.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
