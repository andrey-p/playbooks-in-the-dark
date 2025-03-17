import styles from './description.module.css';
import clsx from 'clsx';

type Props = {
  text: string;
};

// a utility class that renders very basic markup in text
export default function Description(props: Props) {
  const { text } = props;

  // if the text contains anything in tags apart from basic
  // <p>, <li>, <ul>, <strong>, <em> - and their closing tags
  // throw an error - we don't want to XSS people
  // (throwing is fine here because all the contents of the system JSON files
  // are automatically checked for thrown errors as part of CI)
  const testText = text.replace(
    /<\/?p>|<\/?li>|<\/?ul>|<\/?em>|<\/?strong>/gi,
    ''
  );
  if (testText.match(/<[^>]+>/)) {
    throw new Error('Detected tag: ' + testText);
  }

  return (
    <div
      className={clsx(styles.container, 'description')}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
