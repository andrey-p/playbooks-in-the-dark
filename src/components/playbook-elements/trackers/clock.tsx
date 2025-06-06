import { z } from 'zod';
import { useState, useId } from 'react';
import styles from './clock.module.css';
import clsx from 'clsx';
import RadioControlWrapper from '@/components/playbook-elements/radio-control-wrapper/radio-control-wrapper';
import { LabelOrLabelledBy as LabelOrLabelledBySchema } from '@/components/playbook-elements/radio-control-wrapper/radio-control-wrapper.schema';
import { TrackerProps as TrackerPropsSchema } from './trackers.schema';

type Props = z.infer<typeof TrackerPropsSchema> &
  z.infer<typeof LabelOrLabelledBySchema> & {
    onValueSelect?: (value: number) => void;
  };

export default function Clock(props: Props) {
  const { value, max: numSlices, onValueSelect, size, ...rest } = props;
  const [highlightedSlice, setHighlightedSlice] = useState<number | null>(null);
  const consistentId = useId();

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
    <RadioControlWrapper
      name={consistentId}
      zeroSelected={value === 0}
      zeroLabel={'0'}
      onZeroSelect={() => {
        if (onValueSelect) {
          onValueSelect(0);
        }
      }}
      {...rest}
    >
      <div
        className={styles.hiddenInputContainer}
        style={{ width: diameter, height: diameter }}
      >
        {/* hidden radio inputs to back accessibility */}
        {slices.map((_, i) => (
          <input
            className={styles.hiddenInput}
            key={i}
            type='radio'
            name={consistentId}
            value={i + 1}
            checked={i === value - 1}
            aria-label={(i + 1).toString()}
            onChange={(e) => {
              if (onValueSelect) {
                onValueSelect(parseInt(e.target.value));
              }
            }}
          />
        ))}
      </div>
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
              highlightedSlice === null && i < value && styles.filled
            )}
            clipPath='url(#circleClip)'
            onMouseOver={() => setHighlightedSlice(i + 1)}
            onClick={() => {
              if (onValueSelect) {
                if (value === i + 1) {
                  onValueSelect(0);
                } else {
                  onValueSelect(i + 1);
                }
              }
            }}
          />
        ))}
        <circle
          cy={radius + 1}
          cx={radius + 1}
          r={radius - 2}
          className={clsx(styles.circle)}
          fill='rgba(0,0,0,0)'
        />
      </svg>
    </RadioControlWrapper>
  );
}
