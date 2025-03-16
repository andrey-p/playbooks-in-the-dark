import SimpleTracker from './simple-tracker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SimpleTracker', () => {
  it('should render', async () => {
    render(<SimpleTracker value={5} max={10} type='dagger' />);

    const toggles = screen.getAllByRole('switch');

    expect(toggles.length).toEqual(10);
  });
  it('should highlight all the toggles up to the one being hovered', async () => {
    const user = userEvent.setup();

    render(<SimpleTracker value={0} max={10} type='square' />);

    const toggles = screen.getAllByRole('switch');
    await user.hover(toggles[3]);

    for (let i = 0; i < 3; i++) {
      expect(toggles[i].className).toContain('highlighted');
    }

    for (let i = 4; i < toggles.length; i++) {
      expect(toggles[i].className).not.toContain('highlighted');
    }
  });
  it('should handle basic interaction', async () => {
    const user = userEvent.setup();
    const onValueSelect = jest.fn();

    const { rerender } = render(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={0}
        max={10}
        type='square'
      />
    );

    let toggles = screen.getAllByRole('switch');

    await user.click(toggles[2]);

    expect(onValueSelect).toHaveBeenCalledWith(3);
    rerender(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={3}
        max={10}
        type='square'
      />
    );

    toggles = screen.getAllByRole('switch');

    expect(toggles[0]).toHaveAttribute('aria-checked', 'true');
    expect(toggles[1]).toHaveAttribute('aria-checked', 'true');
    expect(toggles[2]).toHaveAttribute('aria-checked', 'true');

    for (let i = 3; i < toggles.length; i++) {
      expect(toggles[i]).not.toHaveAttribute('aria-checked', 'true');
    }

    // click the same value again to toggle 0
    await user.click(toggles[2]);
    expect(onValueSelect).toHaveBeenCalledWith(0);

    rerender(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={0}
        max={10}
        type='square'
      />
    );

    toggles = screen.getAllByRole('switch');

    for (let i = 0; i < toggles.length; i++) {
      expect(toggles[i]).not.toHaveAttribute('aria-checked', 'true');
    }
  });
});
