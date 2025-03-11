import { useState } from 'react';
import styles from './clock.module.css';
import clsx from 'clsx';

type Props = {
  value: number;
  max: number;
  onValueSelect?: (value: number) => void;
  size?: number;
};

export default function Clock(props: Props) {
  const { value, max: numSlices, onValueSelect, size } = props;
  const [highlightedSlice, setHighlightedSlice] = useState<number | null>(null);

  const diameter = size || 100;
  const radius = diameter / 2;
  const radsPerSlice = (2 * Math.PI) / numSlices;
  // make the first line vertical
  const startingRad = Math.PI / 2;

  const slices: string[] = [];

  // draw slices that match the clock
  for (let i = 0; i < numSlices; i++) {
    // - radsPerSlice makes this go clockwise
    const rad = -radsPerSlice * i + startingRad;
    const nextRad = -radsPerSlice * (i + 1) + startingRad;

    // expand the slices a bit so the short side falls outside of the clip circle
    const shapeStartX = Math.cos(rad) * diameter * 1.5 + radius;
    const shapeStartY = -Math.sin(rad) * diameter * 1.5 + radius;
    const shapeEndX = Math.cos(nextRad) * diameter * 1.5 + radius;
    const shapeEndY = -Math.sin(nextRad) * diameter * 1.5 + radius;
    slices.push(
      `M ${shapeStartX},${shapeStartY} ${shapeEndX},${shapeEndY} ${radius},${radius} Z`
    );
  }

  return (
    <div>
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        onMouseOut={() => setHighlightedSlice(null)}
      >
        <defs>
          <clipPath id='circleClip'>
            {/*
              the circles have a couple of pixels tweaked
              so the outlines don't get clipped by the SVG boundaries
            */}
            <circle cy={radius + 1} cx={radius + 1} r={radius - 2} />
          </clipPath>
        </defs>
        {slices.map((slice, i) => (
          <path
            key={i}
            d={slice}
            className={clsx(
              styles.default,
              highlightedSlice && i < highlightedSlice && styles.highlighted,
              highlightedSlice === null && i < value && styles.highlighted
            )}
            clipPath='url(#circleClip)'
            onMouseOver={() => setHighlightedSlice(i + 1)}
            onClick={() => {
              if (onValueSelect) {
                onValueSelect(i + 1);
              }
            }}
          />
        ))}
        <circle
          cy={radius + 1}
          cx={radius + 1}
          r={radius - 2}
          className={clsx(styles.default, styles.circle)}
          fill='rgba(0,0,0,0)'
        />
      </svg>
    </div>
  );
}
