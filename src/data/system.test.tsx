import { getJson } from "@/lib/system-data";
import Renderer from "@/components/playbook-modules/renderer";
import { render } from "@testing-library/react";

const systems = ["bitd"];

describe("system data check", () => {
  systems.forEach((systemId) => {
    describe(systemId, () => {
      //const systemData = getJson(systemId, 'system');
      const characterData = getJson(systemId, "characters");

      characterData.playbooks.forEach((playbookId: string) => {
        //const playbookData = getJson(systemId, playbookId);

        test(`playbook ${playbookId} should render OK`, () => {
          render(
            <Renderer
              //playbookData={playbookData}
              layout={characterData.layout}
              modules={characterData.modules}
              userCharacterData={{
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
