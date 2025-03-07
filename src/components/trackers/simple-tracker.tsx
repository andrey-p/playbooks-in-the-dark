import { useState } from "react";
import CircleToggle from "@/components/toggles/circle";
import DaggerToggle from "@/components/toggles/dagger";
import SquareToggle from "@/components/toggles/square";
import type { ToggleProps } from "@/components/toggles/toggles.types";
import styles from "./simple-tracker.module.css";

type TrackerType = "circle" | "dagger" | "square";

type Props = {
  value: number;
  max: number;
  onValueSelect?: (value: number) => void;
  type: TrackerType;
};

function getToggleComponent(type: TrackerType): React.FC {
  switch (type) {
    case "circle":
      return CircleToggle;
    case "dagger":
      return DaggerToggle;
    case "square":
      return SquareToggle;
    default:
      throw new Error("unexpected tracker type " + type);
  }
}

export default function SimpleTracker(props: Props) {
  const { value, max, type, onValueSelect } = props;
  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);

  const toggles = [];

  const ToggleComponent = getToggleComponent(type);

  for (let i = 0; i < max; i++) {
    // highlight all the circles up to and including
    // the one that was highlighted
    const highlighted =
      typeof highlightedValue === "number" ? i < highlightedValue : false;

    const props: ToggleProps = {
      filled: i < value,
      highlighted,
      onClick: () => {
        if (onValueSelect) {
          onValueSelect(i + 1);
        }
      },
      onMouseEnter: () => {
        setHighlightedValue(i + 1);
      },
      onMouseLeave: () => {
        setHighlightedValue(null);
      }
    };

    toggles.push(<ToggleComponent key={i} {...props} />);
  }

  return <div className={styles.container}>{toggles}</div>;
}
