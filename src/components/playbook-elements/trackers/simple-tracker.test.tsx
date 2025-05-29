import SimpleTracker from './simple-tracker';
import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

describe('SimpleTracker', () => {
  it('should render', async () => {
    render(<SimpleTracker value={5} label='hi' max={10} type='dagger' />);

    const toggles = screen.getAllByRole('radio');

    // 10 toggles + the hidden 0 one for keyboard users
    expect(toggles.length).toEqual(11);
  });
  it('should highlight all the toggles up to the one being hovered', async () => {
    const user = userEvent.setup();

    render(<SimpleTracker value={0} label='hi' max={10} type='square' />);

    const toggles = screen.getAllByRole('radio');
    await user.hover(toggles[4]);

    for (let i = 1; i < 4; i++) {
      expect(toggles[i].parentElement?.className).toContain('highlighted');
    }

    for (let i = 5; i < toggles.length; i++) {
      expect(toggles[i].parentElement?.className).not.toContain('highlighted');
    }
  });
  it('should handle basic interaction', async () => {
    const user = userEvent.setup();
    const onValueSelect = jest.fn();

    const { rerender } = render(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={0}
        label='hi'
        max={10}
        type='square'
      />
    );

    let toggles = screen.getAllByRole('radio');

    await user.click(toggles[3]);

    expect(onValueSelect).toHaveBeenCalledWith(3);
    rerender(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={3}
        max={10}
        label='hi'
        type='square'
      />
    );

    toggles = screen.getAllByRole('radio');

    expect(toggles[3]).toBeChecked();

    for (let i = 1; i < 3; i++) {
      expect(toggles[i].parentElement).toHaveClass('filled');
      expect(toggles[i]).not.toBeChecked();
    }

    for (let i = 4; i < toggles.length; i++) {
      expect(toggles[i].parentElement).not.toHaveClass('filled');
      expect(toggles[i]).not.toBeChecked();
    }

    // click the same value again to toggle 0
    await user.click(toggles[3]);
    expect(onValueSelect).toHaveBeenCalledWith(0);

    rerender(
      <SimpleTracker
        onValueSelect={onValueSelect}
        value={0}
        max={10}
        label='hi'
        type='square'
      />
    );

    toggles = screen.getAllByRole('radio');

    expect(toggles[0]).toBeChecked();

    for (let i = 1; i < toggles.length; i++) {
      expect(toggles[i].parentElement).not.toHaveClass('filled');
      expect(toggles[i]).not.toBeChecked();
    }
  });
});
