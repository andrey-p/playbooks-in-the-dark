import styles from './clock.module.css';

type Props = {
  value: number;
  max: number;
  onValueSelect?: (value: number) => void;
  size?: number;
};

export default function Clock(props: Props) {
  const { value, max: slices, onValueSelect, size } = props;

  const diameter = size || 100;
  const radius = diameter / 2;
  const radsPerSlice = (2 * Math.PI) / slices;
  // make the first line vertical
  const startingRad = Math.PI / 2;

  const lines: string[] = [];
  const highlightedSlices: string[] = [];

  for (let i = 0; i < slices; i++) {
    // -radsPerSlice makes this go clockwise
    const rad = - radsPerSlice * i + startingRad;

    // draw lines bisecting the circle
    const lineStartX = Math.cos(rad) * diameter + radius;
    const lineStartY = -Math.sin(rad) * diameter + radius;
    const lineEndX = -Math.cos(rad) * diameter + radius;
    const lineEndY = Math.sin(rad) * diameter + radius;

    lines.push(`M ${lineStartX},${lineStartY} ${lineEndX},${lineEndY} Z`);

    // add any filled slices
    if (i < value) {
      const nextRad = - radsPerSlice * (i + 1) + startingRad;
      const shapeStartX = Math.cos(rad) * diameter * 1.5 + radius;
      const shapeStartY = -Math.sin(rad) * diameter * 1.5 + radius;
      const shapeEndX = Math.cos(nextRad) * diameter * 1.5 + radius;
      const shapeEndY = -Math.sin(nextRad) * diameter * 1.5 + radius;
      highlightedSlices.push(`M ${shapeStartX},${shapeStartY} ${shapeEndX},${shapeEndY} ${radius},${radius} Z`);
    }
  }

  return (
    <div>
      <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
        <defs>
          <clipPath id='circleClip'>
            {/*
              the circles have a couple of pixels added
              so the outlines don't get clipped by the SVG boundaries
            */}
            <circle
              cy={radius + 1}
              cx={radius + 1}
              r={radius - 2}
            />
          </clipPath>
        </defs>
        {highlightedSlices.map((slice, i) => (
          <path key={i} d={slice} className={styles.highlighted} fill='red' clip-path='url(#circleClip)'/>
        ))}
        {lines.map((line, i) => (
          <path key={i} d={line} className={styles.default} clip-path='url(#circleClip)'/>
        ))}
        <circle
          cy={radius + 1}
          cx={radius + 1}
          r={radius - 2}
          className={styles.default}
          fill='rgba(0,0,0,0)'
        />
      </svg>
    </div>
  );
}
