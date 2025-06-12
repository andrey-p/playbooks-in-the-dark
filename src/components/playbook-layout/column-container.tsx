import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './column-container.module.css';
import { useSwipeable } from 'react-swipeable';
import { useMobileLayout } from '@/hooks';

type Props = {
  columns: React.ReactNode[];
};

// is it OK to assume that this swipe should switch between visible columns?
// specifically, did the user possibly mean to scroll an element that was a child
// of the column container?
//
// to be even preciser:
//
// |-----------------|
// |       A         |
// |-----------------|-----|
// |     B + C       |  C  |
// |-----------------|-----|
// |       A         |
// |-----------------|
//
// A is the column
// B is the row (at the mobile level, it spans the width of A)
// C is the module contained in the row
//
// if C sticks out to the right, swiping at B leftwards
// should *not* trigger a swipe
const isSwipeActionable = (
  event: MouseEvent | TouchEvent | React.MouseEvent
): boolean => {
  const container = event.currentTarget as Element;
  const swopeElement = event.target as Element;

  if (container === swopeElement) {
    return true;
  }

  // the module wrapper's width is the _total width_ of a module
  // if it sticks out beyond the width of the column (looking at you, claims module)
  // this should come out longer than the width of the column
  const moduleWrapper = swopeElement.closest('.module-wrapper');

  // the row element contains the module wrapper
  // it is what actually does the scrolling, so we need it
  // in order to tell whether the element being swiped at is done scrolling
  const row = swopeElement.closest('.row');

  if (row && moduleWrapper && row.scrollWidth > row.clientWidth) {
    const columnWidth = container.getBoundingClientRect().width;
    const padding = parseInt(window.getComputedStyle(container).padding);
    const moduleWrapperWidth = moduleWrapper.getBoundingClientRect().width;

    if (moduleWrapperWidth - columnWidth + 2 * padding > row.scrollLeft) {
      return false;
    }
  }

  return true;
};

export default function ColumnContainer(props: Props) {
  const { columns } = props;

  const [currentColumn, setCurrentColumn] = useState(0);
  const isMobileLayout = useMobileLayout();
  const containerRef = useRef<HTMLDivElement>(null);

  const setColumn = useCallback(
    (direction: number, event: MouseEvent | TouchEvent | React.MouseEvent) => {
      if (!isMobileLayout) {
        return;
      }

      if (!isSwipeActionable(event)) {
        event.stopPropagation();
        return;
      }

      setCurrentColumn((prevColumn) => {
        let nextColumn = prevColumn + direction;
        nextColumn = Math.max(0, nextColumn);
        nextColumn = Math.min(nextColumn, columns.length - 1);

        return nextColumn;
      });
    },
    [columns.length, isMobileLayout]
  );

  const handlers = useSwipeable({
    onSwipedLeft: ({ event }) => setColumn(1, event),
    onSwipedRight: ({ event }) => setColumn(-1, event),
    onSwiping: ({ event }) => {
      if (!isSwipeActionable(event)) {
        event.stopPropagation();
      }
    }
  });

  // scroll to whatever column should be selected
  // whenever it changes
  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const columnWidth = container.getBoundingClientRect().width;
    const padding = parseInt(window.getComputedStyle(container).padding);

    container.scroll({
      left: columnWidth * currentColumn - padding,
      behavior: 'smooth'
    });
  }, [currentColumn]);

  const compositeRef = (el: HTMLDivElement) => {
    handlers.ref(el);

    containerRef.current = el;
  };

  return (
    <div className={styles.container} {...handlers} ref={compositeRef}>
      {columns}
    </div>
  );
}
