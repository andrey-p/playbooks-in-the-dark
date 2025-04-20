import { getJson } from '@/lib/system-data';
import Renderer from '@/components/renderer/renderer';
import RendererErrorBoundary from '@/components/renderer/renderer-error-boundary';
import { render } from '@testing-library/react';
import systemsJson from './systems.json';

import { fromError } from 'zod-validation-error';

import { PlaybookData, System, PlaybookDefinition } from '@/schemas';

// a lot of the data is checked at runtime, when the sheet is rendered
// and <Renderer /> will immediately crash if it doesn't like something
//
// these tests simulate all sheets rendering so we know that
// all of the data in this project is fully good and OK
//
// the errors here are formatted so any content contributors can know roughly what to fix

const { systems } = systemsJson;

describe('system data check', () => {
  systems.forEach((system) => {
    const systemId = system.id;

    describe(systemId, () => {
      const { data: systemData, error } = System.safeParse(
        getJson(systemId, 'system')
      );

      if (error) {
        throw fromError(error, { prefix: 'Validation error with system.json' });
      }

      systemData.playbookTypes.forEach((playbookType: string) => {
        const { data: playbookDefinition, error } =
          PlaybookDefinition.safeParse(getJson(systemId, playbookType));

        if (error) {
          throw fromError(error, {
            prefix: `Validation error with ${playbookType}.json`
          });
        }

        playbookDefinition.playbooks.forEach((playbookId: string) => {
          const { data: playbookData, error } = PlaybookData.safeParse(
            getJson(systemId, playbookId)
          );

          if (error) {
            throw fromError(error, {
              prefix: `Validation error with ${playbookId}.json`
            });
          }

          test(`playbook ${playbookId} should render OK`, () => {
            render(
              <RendererErrorBoundary>
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
              </RendererErrorBoundary>
            );
          });
        });
      });
    });
  });
});
