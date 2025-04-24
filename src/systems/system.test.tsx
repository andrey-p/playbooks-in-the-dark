import { z } from 'zod';
import { getJson } from '@/lib/system-data';
import Renderer from '@/components/renderer/renderer';
import RendererErrorBoundary from '@/components/renderer/renderer-error-boundary';
import { render, cleanup, showTranslationWarnings } from 'test-utils';
import systemsJson from './systems.json';

import { fromError } from 'zod-validation-error';

import { PlaybookData, System, PlaybookDefinition } from '@/schemas';

type PlaybookDataType = z.infer<typeof PlaybookData>;
type PlaybookDefinitionType = z.infer<typeof PlaybookDefinition>;

showTranslationWarnings();

// a lot of the data is checked at runtime, when the sheet is rendered
// and <Renderer /> will immediately crash if it doesn't like something
//
// these tests simulate all sheets rendering so we know that
// all of the data in this project is fully good and OK
//
// the errors here are formatted so any content contributors can know roughly what to fix

const { systems } = systemsJson;

type TestInput = {
  playbookData: PlaybookDataType;
  playbookDefinition: PlaybookDefinitionType;
};

const collectTests = async (systemId: string) => {
  const tests: TestInput[] = [];

  const { data: systemData, error } = System.safeParse(
    await getJson(systemId, 'system')
  );

  if (error) {
    throw fromError(error, { prefix: 'Validation error with system.json' });
  }

  for (const playbookType of systemData.playbookTypes) {
    const { data: playbookDefinition, error } = PlaybookDefinition.safeParse(
      await getJson(systemId, playbookType)
    );

    if (error) {
      throw fromError(error, {
        prefix: `Validation error with ${playbookType}.json`
      });
    }

    for (const playbookId of playbookDefinition.playbooks) {
      const { data: playbookData, error } = PlaybookData.safeParse(
        await getJson(systemId, playbookType, playbookId)
      );

      if (error) {
        throw fromError(error, {
          prefix: `Validation error with ${playbookId}.json`
        });
      }

      tests.push({ playbookDefinition, playbookData });
    }
  }

  return tests;
};

describe('system data check', () => {
  systems.forEach((system) => {
    const systemId = system.id;

    test(systemId, async () => {
      const tests = await collectTests(systemId);

      tests.forEach((testInput) => {
        const { playbookData, playbookDefinition } = testInput;

        render(
          <RendererErrorBoundary>
            <Renderer
              playbookData={playbookData}
              layout={playbookDefinition.layout}
              modules={playbookDefinition.modules}
              userData={{
                id: undefined,
                playbookType: playbookDefinition.id,
                systemId,
                playbookId: playbookData.id,
                modules: {}
              }}
              dispatch={jest.fn()}
            />
          </RendererErrorBoundary>
        );

        cleanup();
      });
    });
  });
});
