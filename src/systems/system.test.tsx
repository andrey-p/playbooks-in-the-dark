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
      const systemData = getJson(systemId, 'system');

      systemData.playbookTypes.forEach((playbookType: string) => {
        const playbookDefinition = getJson(systemId, playbookType);

        playbookDefinition.playbooks.forEach((playbookId: string) => {
          const playbookData = getJson(systemId, playbookId);

          test(`playbook ${playbookId} should render OK`, () => {
            render(
              <Renderer
                playbookData={playbookData}
                layout={playbookDefinition.layout}
                modules={playbookDefinition.modules}
                userData={{
                  id: undefined,
                  systemId,
                  playbookId
                }}
                dispatch={jest.fn()}
              />
            );
          });

          // "description" is currently the only property that gets rendered unsafely
          // this is perhaps a bit over-the-top but let's not XSS people with module descriptions
          test('any descriptions should only contain simple, bare tags', () => {
            Object.values(playbookDefinition.modules).forEach(
              (value: unknown) => {
                const playbookModule = value as object;

                if ('description' in playbookModule) {
                  const allowedTagsRe = /<\/?p>|<\/?ul>|<\/?li>/g;
                  const stripped = (
                    playbookModule.description as string
                  ).replace(allowedTagsRe, '');
                  expect(stripped).not.toMatch(/<|>/);
                }
              }
            );
          });
        });
      });
    });
  });
});
