import styles from './toggle.module.css';
import clsx from 'clsx';

type Props = {
  type: 'circle' | 'dagger' | 'rhombus' | 'triangle' | 'square';
  size?: number;
  filled?: boolean;
  highlighted?: boolean;
  invertColours?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Toggle(props: Props) {
  const { type, size, highlighted, invertColours, filled, ...rest } = props;

  const height = size || 20;
  let width = height;
  let shape;

  const classes = clsx(
    styles.default,
    filled && styles.filled,
    highlighted && styles.highlighted,
    invertColours && styles.inverted
  );

  switch (type) {
    case 'rhombus':
      width = height / 1.5;
      shape = (
        <path
          className={classes}
          d={`M ${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2} Z`}
        />
      );
      break;
    case 'dagger':
      width = height / 2.5;
      shape = (
        <path
          className={classes}
          d={`M 0,0 ${width},0 ${width},${height / 1.5} 0,${height} Z`}
        />
      );
      break;
    case 'circle':
      shape = (
        <circle
          cy={width / 2}
          cx={width / 2}
          r={width / 2}
          className={classes}
        />
      );
      break;
    case 'triangle':
      shape = (
        <path
          className={classes}
          d={`M ${width / 2},0 ${width},${height} ${0},${height} Z`}
        />
      );
      break;
    case 'square':
      shape = (
        <path
          className={classes}
          d={`M 0,0 ${width},0 ${width},${height}, 0,${height} Z`}
        />
      );
      break;
  }

  return (
    <button
      role='switch'
      aria-checked={filled}
      className={styles.container}
      style={{ width, height }}
      {...rest}
    >
      {/* add 1px around the viewbox so the
        shape stroke doesn't get cut off */}
      <svg
        width={width}
        height={height}
        viewBox={`-1 -1 ${width + 2} ${height + 2}`}
      >
        {shape}
      </svg>
    </button>
  );
}
