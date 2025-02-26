import styles from './example-list.module.css';

type Props = {
  items: string[]
};

export default function ExampleList(props: Props) {
  const { items } = props;

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map(item => (
          <li className={styles.item} key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
