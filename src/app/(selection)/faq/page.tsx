import QuestionAnswer from './components/question-answer';
import Heading from '../components/heading';
import Separator from '../components/separator';
import { useTranslations } from 'next-intl';
import { getTranslatedMetadata } from '@/lib/metadata';

// the text is in /lang/en.json
const questionsAnswers = [
  'whatIsThis',
  'whatThisIsnt',
  'saving',
  'canYouAdd',
  'howDoIAdd',
  'contact'
];

export async function generateMetadata() {
  return getTranslatedMetadata('UI.Global.faq');
}

export default function FAQ() {
  const t = useTranslations();

  return (
    <div>
      <Heading>{t('UI.Global.faq')}</Heading>
      {questionsAnswers.map((qa, i) => (
        <div key={qa}>
          <QuestionAnswer
            id={qa}
            key={qa}
            question={t(`UI.FAQ.${qa}.q`)}
            answer={t.raw(`UI.FAQ.${qa}.a`)}
          />
          {i < questionsAnswers.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
