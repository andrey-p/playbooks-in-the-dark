import SlottedText from './slotted-text';
import { render, screen, addTestTranslations } from 'test-utils';
import userEvent from '@testing-library/user-event';

addTestTranslations({
  SLOT_TEST: {
    noSlots: 'Hello foo bar baz',
    slotLike: 'Hello [foo] bar baz',
    multipleSlots: 'Hello [foo] bar [qux] baz'
  }
});

describe('SlottedText', () => {
  describe('no slots', () => {
    test('no slots at all', () => {
      render(<SlottedText text='SLOT_TEST.noSlots' onUpdate={() => {}} />);

      expect(screen.getByText('Hello foo bar baz')).toBeTruthy();
    });
    test('slot-like text', () => {
      render(<SlottedText text='SLOT_TEST.slotLike' onUpdate={() => {}} />);

      expect(screen.getByText('Hello [foo] bar baz')).toBeTruthy();
    });
    test('empty array of slots', () => {
      render(
        <SlottedText text='SLOT_TEST.slotLike' slots={[]} onUpdate={() => {}} />
      );

      expect(screen.getByText('Hello [foo] bar baz')).toBeTruthy();
    });
  });

  describe('slots', () => {
    test('single slot', async () => {
      const onUpdate = jest.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <SlottedText
          text='SLOT_TEST.slotLike'
          onUpdate={onUpdate}
          slots={[
            {
              id: 'foo',
              label: 'Foo',
              size: 30
            }
          ]}
          values={{}}
        />
      );

      expect(screen.queryByText('Hello {foo} bar baz')).toBeFalsy();
      expect(screen.getByText(/Hello/)).toBeTruthy();
      expect(screen.getByText(/bar baz/)).toBeTruthy();

      const input = screen.getByLabelText('Foo');

      await user.click(input);
      await user.keyboard('h');

      expect(onUpdate).toHaveBeenLastCalledWith({
        foo: 'h'
      });

      rerender(
        <SlottedText
          text='SLOT_TEST.slotLike'
          onUpdate={onUpdate}
          slots={[
            {
              id: 'foo',
              label: 'Foo',
              size: 30
            }
          ]}
          values={{
            foo: 'hello'
          }}
        />
      );

      expect(input).toHaveValue('hello');
    });
    test('multiple slots', async () => {
      const onUpdate = jest.fn();
      const user = userEvent.setup();

      render(
        <SlottedText
          text='SLOT_TEST.multipleSlots'
          onUpdate={onUpdate}
          slots={[
            {
              id: 'foo',
              label: 'Foo',
              size: 30
            },
            {
              id: 'qux',
              label: 'Qux',
              size: 30
            }
          ]}
          values={{
            foo: 'hello'
          }}
        />
      );

      expect(screen.queryByText('Hello [foo] bar [qux] baz')).toBeFalsy();
      expect(screen.getByText(/Hello/)).toBeTruthy();
      expect(screen.getByText(/bar/)).toBeTruthy();
      expect(screen.getByText(/baz/)).toBeTruthy();
      const fooInput = screen.getByLabelText('Foo');
      const quxInput = screen.getByLabelText('Qux');

      expect(fooInput).toHaveValue('hello');

      await user.click(quxInput);
      await user.keyboard('g');

      expect(onUpdate).toHaveBeenLastCalledWith({
        foo: 'hello',
        qux: 'g'
      });
    });
  });
});
