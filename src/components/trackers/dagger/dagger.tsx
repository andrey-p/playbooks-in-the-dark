import styles from './dagger.module.css';

type Props = {
  size?: number,
  filled?: boolean
};

export default function Dagger(props: Props) {
  const { size, filled } = props;

  const height = size || 25;
  const width = height / 2.5;

  return (
    <div style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          className={[
            styles.dagger,
            filled ? styles.filled : styles.empty
          ].join(' ')}
          d={`M 0,0 ${width},0 ${width},${height / 1.5} 0,${height} Z`}
        />
      </svg>
    </div>
  );
}
