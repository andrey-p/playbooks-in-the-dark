import Cohorts from './cohorts';
import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

const moduleDefinition = {
  id: 'cohorts',
  type: 'cohorts',
  label: 'Cohorts',
  props: {
    slots: 4,
    radioGroups: {
      harm: {
        label: 'Harm',
        type: 'circle' as const,
        options: [
          { id: 'weak', name: 'Weak' },
          { id: 'destroyed', name: 'Destroyed' }
        ]
      }
    },
    trackers: {
      quality: {
        type: 'square' as const,
        max: 4,
        value: 0,
        label: 'Quality'
      }
    }
  }
};

describe('Cohorts', () => {
  it('renders', () => {
    render(
      <Cohorts
        moduleDefinition={moduleDefinition}
        userValue={{ cohorts: [] }}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });
  describe('backwards compat', () => {
    it("handles uservalues that don't have trackers on them", async () => {
      const user = userEvent.setup();
      const onUpdate = jest.fn();

      render(
        <Cohorts
          moduleDefinition={moduleDefinition}
          userValue={{
            cohorts: [
              // @ts-expect-error - point of the test
              {
                text: 'hello',
                radioGroups: {}
              }
            ]
          }}
          onUpdate={onUpdate}
        />
      );

      await user.click(screen.getAllByRole('textbox')[0]);
      await user.keyboard('!');

      expect(onUpdate).toHaveBeenLastCalledWith({
        cohorts: [
          {
            text: 'hello!',
            radioGroups: {},
            trackers: {}
          },
          {
            text: '',
            radioGroups: {},
            trackers: {}
          },
          {
            text: '',
            radioGroups: {},
            trackers: {}
          },
          {
            text: '',
            radioGroups: {},
            trackers: {}
          }
        ]
      });
    });
  });
});
