import { useState, useCallback, useEffect, useRef, useId } from 'react';
import styles from './column-container.module.css';
import { useSwipeable } from 'react-swipeable';
import { useMobileLayout } from '@/hooks';
import Column from './column';
import Row from './row';
import SliderDot from './slider-dot';
import { useTranslations } from 'next-intl';

type Props = {
  columns: React.ReactNode[][];
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
// B is the row (at a mobile screen size, it spans the width of A)
// C is the module contained in the row
//
// if C sticks out to the right, swiping at B leftwards
// should bring the rest of C into view and
// *not* switch between columns
//
// however, if there's nothing left to scroll on the right,
// any subsequent leftwards swipes on B should switch to the next column
const isSwipeActionable = (
  event: MouseEvent | TouchEvent | React.MouseEvent
): boolean => {
  const container = event.currentTarget as Element;
  const swopeElement = event.target as Element;

  if (!container || !swopeElement) {
    return false;
  }

  if (container === swopeElement) {
    return true;
  }

  // the row element contains one or more module wrappers
  // it is what actually does the scrolling, so we check it
  // in order to tell whether it's done scrolling
  const row = swopeElement.closest('.row');

  if (row && row.scrollWidth > row.clientWidth) {
    const columnWidth = container.getBoundingClientRect().width;

    if (row.scrollWidth - columnWidth > row.scrollLeft) {
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
  const t = useTranslations();
  const consistentId = useId();

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

    // in a browser, container.scroll is always defined,
    // but this is not the case in jsdom - this makes tests pass
    if (container.scroll) {
      container.scroll({
        left: columnWidth * currentColumn - padding,
        behavior: 'smooth'
      });
    }
  }, [currentColumn]);

  const compositeRef = (el: HTMLDivElement) => {
    handlers.ref(el);

    containerRef.current = el;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') {
      setCurrentColumn(
        currentColumn === columns.length - 1 ? 0 : currentColumn + 1
      );
    } else if (e.key === 'ArrowLeft') {
      setCurrentColumn(
        currentColumn === 0 ? columns.length - 1 : currentColumn - 1
      );
    }
  };

  // TODO
  // fix outline around checkboxes
  // increase default size of claims

  return (
    <>
      {isMobileLayout && (
        <div className={styles.dots} role='tablist'>
          {columns.map((_, i) => (
            <SliderDot
              key={i}
              id={`${consistentId}-tab-${i}`}
              onKeyDown={onKeyDown}
              active={i === currentColumn}
              onClick={() => setCurrentColumn(i)}
              label={t('UI.PlaybookActions.panel', { panel: i + 1 })}
              aria-controls={`${consistentId}-panel-${i}`}
            />
          ))}
        </div>
      )}
      <div className={styles.container} {...handlers} ref={compositeRef}>
        {columns.map((column, i) => (
          <Column
            key={i}
            tab-index={0}
            id={`${consistentId}-tab-${i}`}
            aria-labelledby={`${consistentId}-panel-${i}`}
            role='tabpanel'
            aria-hidden={i === currentColumn}
          >
            {column.map((row, j) => (
              <Row key={j}>{row}</Row>
            ))}
          </Column>
        ))}
      </div>
    </>
  );
}
