import { getJson } from '@/lib/system-data';
import Renderer from '@/components/playbook-modules/renderer';
import { render } from '@testing-library/react';

// a lot of the data is checked at runtime, when the sheet is rendered
// and <Renderer /> will immediately crash if it doesn't like something
//
// these tests simulate all sheets rendering so we know that
// all of the data in this project is fully good and OK

const systems = ['bitd'];

describe('system data check', () => {
  systems.forEach((systemId) => {
    describe(systemId, () => {
      // maybe system data will be passed down at some point?
      // const systemData = getJson(systemId, 'system');
      const characterData = getJson(systemId, 'characters');

      characterData.playbooks.forEach((playbookId: string) => {
        const playbookData = getJson(systemId, playbookId);

        test(`playbook ${playbookId} should render OK`, () => {
          render(
            <Renderer
              playbookData={playbookData}
              layout={characterData.layout}
              modules={characterData.modules}
              userData={{
                id: undefined,
                systemId,
                playbookId
              }}
              dispatch={jest.fn()}
            />
          );
        });
      });
    });
  });
});
