import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import { Locator } from 'playwright';
import ColumnContainer from '@/components/playbook-layout/column-container';
import { swipe } from 'playwright-utils';

// These tests use playwright because checking swipeability etc on jsdom is a big headache

test.use({
  viewport: {
    width: 550,
    height: 800
  },
  isMobile: true,
  hasTouch: true
});

const fullWidthDiv = (id: number) => {
  return (
    <div data-id={id} style={{ width: '100%' }}>
      test-{id}
    </div>
  );
};

const extraWideDiv = (id: number) => {
  return (
    <div data-id={id} style={{ width: '800px' }}>
      test-{id.toString().repeat(100)}
    </div>
  );
};

const expectColumnToBeInViewPort = async (
  container: MountResult,
  columnIdx: number,
  numColumns: number
) => {
  for (let i = 0; i < numColumns; i++) {
    if (i === columnIdx) {
      await expect(
        container.locator(`> div:nth-child(${i + 1})`)
      ).toBeInViewport({ ratio: 0.1 });
    } else {
      await expect(
        container.locator(`> div:nth-child(${i + 1})`)
      ).not.toBeInViewport({ ratio: 0.1 });
    }
  }
};

const scrollRowTo = async (locator: Locator, px: number) => {
  await locator.evaluate((element, px) => {
    element.parentElement?.scroll({ left: px });
  }, px);
};

test.describe('Playbook mobile mode', () => {
  test('scrolling between containers', async ({ mount }) => {
    const container = await mount(
      <ColumnContainer
        columns={[
          [fullWidthDiv(1), fullWidthDiv(2), fullWidthDiv(3), fullWidthDiv(4)],
          [fullWidthDiv(5), fullWidthDiv(6), fullWidthDiv(7), fullWidthDiv(8)],
          [
            fullWidthDiv(9),
            fullWidthDiv(10),
            fullWidthDiv(11),
            fullWidthDiv(12)
          ]
        ]}
      />
    );
    await expectColumnToBeInViewPort(container, 0, 3);

    await swipe('left', container.locator('> div:nth-child(1)'));
    await expectColumnToBeInViewPort(container, 1, 3);

    await swipe('right', container.locator('> div:nth-child(2)'));
    await expectColumnToBeInViewPort(container, 0, 3);

    await swipe('right', container.locator('> div:nth-child(1)'));
    await expectColumnToBeInViewPort(container, 0, 3);
  });

  test('scrolling with children that extend past the column width', async ({
    mount
  }) => {
    const container = await mount(
      <ColumnContainer
        columns={[
          [fullWidthDiv(1), extraWideDiv(2), fullWidthDiv(3), fullWidthDiv(4)],
          [fullWidthDiv(5), fullWidthDiv(6), extraWideDiv(7), fullWidthDiv(8)],
          [
            fullWidthDiv(9),
            fullWidthDiv(10),
            fullWidthDiv(11),
            fullWidthDiv(12)
          ]
        ]}
      />
    );
    await expectColumnToBeInViewPort(container, 0, 3);

    await swipe('left', container.locator('div[data-id="1"]'));
    await expectColumnToBeInViewPort(container, 1, 3);

    // div 7 has space to scroll so columns shouldn't change at first
    await swipe('left', container.locator('div[data-id="7"]'));
    await expectColumnToBeInViewPort(container, 1, 3);

    // if div 7 is scrolled to the end, column should change
    await scrollRowTo(container.locator('div[data-id="7"]'), 800);
    await swipe('left', container.locator('div[data-id="7"]'));
    await expectColumnToBeInViewPort(container, 2, 3);

    await swipe('right', container.locator('div[data-id="11"]'));
    await expectColumnToBeInViewPort(container, 1, 3);

    // faff about with div 7 again
    await swipe('right', container.locator('div[data-id="7"]'));
    await expectColumnToBeInViewPort(container, 1, 3);

    await scrollRowTo(container.locator('div[data-id="7"]'), 0);
    await swipe('right', container.locator('div[data-id="7"]'));
    await expectColumnToBeInViewPort(container, 0, 3);
  });
});
