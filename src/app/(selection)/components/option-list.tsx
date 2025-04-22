import type { Option } from './options.types';
import OptionButton from './option-button';
import Heading from './heading';
import styles from './option-list.module.css';

type Props = {
  heading: string;
  options: Option[];
};

export default function Options(props: Props) {
  const { heading, options } = props;

  return (
    <div>
      <Heading>{heading}</Heading>
      {options.length ? (
        <ul className={styles.list}>
          {options.map((option: Option) => (
            <li className={styles.item} key={option.id}>
              <OptionButton key={option.id} {...option} />
            </li>
          ))}
        </ul>
      ) : (
        <p>(Not available yet. Watch this space.)</p>
      )}
    </div>
  );
}
