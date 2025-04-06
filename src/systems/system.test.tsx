import { getJson } from '@/lib/system-data';
import Renderer from '@/components/playbook-modules/renderer';
import { render } from '@testing-library/react';
import systemsJson from './systems.json';

import { PlaybookData, System, PlaybookDefinition } from '@/schemas';

// a lot of the data is checked at runtime, when the sheet is rendered
// and <Renderer /> will immediately crash if it doesn't like something
//
// these tests simulate all sheets rendering so we know that
// all of the data in this project is fully good and OK

const { systems } = systemsJson;

describe('system data check', () => {
  systems.forEach((system) => {
    const systemId = system.id;

    describe(systemId, () => {
      const systemData = System.parse(getJson(systemId, 'system'));

      systemData.playbookTypes.forEach((playbookType: string) => {
        const playbookDefinition = PlaybookDefinition.parse(
          getJson(systemId, playbookType)
        );

        playbookDefinition.playbooks.forEach((playbookId: string) => {
          const playbookData = PlaybookData.parse(
            getJson(systemId, playbookId)
          );

          test(`playbook ${playbookId} should render OK`, () => {
            render(
              <Renderer
                playbookData={playbookData}
                layout={playbookDefinition.layout}
                modules={playbookDefinition.modules}
                userData={{
                  id: undefined,
                  playbookType,
                  systemId,
                  playbookId,
                  modules: {}
                }}
                dispatch={jest.fn()}
              />
            );
          });
        });
      });
    });
  });
});
