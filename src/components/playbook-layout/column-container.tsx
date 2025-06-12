import { useState, useCallback } from 'react';
import styles from './column-container.module.css';
import { useSwipeable } from 'react-swipeable';
import { useMobileLayout } from '@/hooks';

type Props = {
  columns: React.ReactNode[];
};

export default function ColumnContainer(props: Props) {
  const { columns } = props;

  const [currentColumn, setCurrentColumn] = useState(0);
  const isMobileLayout = useMobileLayout();

  const setColumn = useCallback(
    (direction: number, event: MouseEvent | TouchEvent | React.MouseEvent) => {
      if (!isMobileLayout) {
        return;
      }

      let nextColumn = currentColumn + direction;
      nextColumn = Math.max(0, nextColumn);
      nextColumn = Math.min(nextColumn, columns.length - 1);

      setCurrentColumn(nextColumn);

      // scroll to whatever column should be selected
      const container = event.currentTarget as Element;

      if (container) {
        const columnWidth = container.getBoundingClientRect().width;
        const padding = parseInt(window.getComputedStyle(container).padding);

        container.scroll({
          left: columnWidth * nextColumn - padding,
          behavior: 'smooth'
        });
      }
    },
    [columns.length, currentColumn, isMobileLayout]
  );

  const handlers = useSwipeable({
    onSwipedLeft: ({ event }) => setColumn(1, event),
    onSwipedRight: ({ event }) => setColumn(-1, event)
  });

  return (
    <div className={styles.container} {...handlers}>
      {columns}
    </div>
  );
}
