import styles from './square.module.css';

type Props = {
  size?: number,
  filled?: boolean
};

export default function Square(props: Props) {
  const { filled } = props;
  let { size } = props;

  size = size || 25;

  return (
    <div
      style={{ width: size, height: size }}
      className={filled ? styles.filled : styles.empty}
    >
    </div>
  );
}
