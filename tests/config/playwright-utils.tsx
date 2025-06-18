import { Locator } from 'playwright';
import { TestInfo } from '@playwright/test';

type Point = { x: number; y: number };

export const swipe = async (direction: 'left' | 'right', locator: Locator) => {
  await locator.evaluate(
    async (element, { direction }) => {
      const getTouchEvent = (
        type: 'touchstart' | 'touchend' | 'touchmove',
        element: Element,
        clientPos: Point
      ) => {
        const rect = element.getBoundingClientRect();

        const touch = new Touch({
          identifier: Math.random(),
          clientX: rect.left + clientPos.x,
          clientY: rect.top + clientPos.y,
          pageX: rect.left + clientPos.x,
          pageY: rect.top + clientPos.y,
          screenX: rect.left + clientPos.x,
          screenY: rect.top + clientPos.y,
          target: element
        });

        return new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          changedTouches: [touch],
          targetTouches: [touch],
          touches: [touch]
        });
      };

      const rect = element.getBoundingClientRect();

      const points = [];

      for (let i = 1; i <= 10; i++) {
        points.push({ x: (rect.width * i) / 11, y: rect.height / 2 });
      }

      if (direction === 'left') {
        points.reverse();
      }

      element.dispatchEvent(getTouchEvent('touchstart', element, points[0]));

      for (let i = 1; i < points.length - 1; i++) {
        await new Promise((r) => setTimeout(r, 50));
        element.dispatchEvent(getTouchEvent('touchmove', element, points[i]));
      }

      element.dispatchEvent(
        getTouchEvent('touchend', element, points[points.length - 1])
      );
    },
    { direction }
  );
};

// stop test in its tracks - useful for debugging
// use with headless: false
export const stop = async (testInfo: TestInfo) => {
  testInfo.setTimeout(0);
  await new Promise(() => {});
};
