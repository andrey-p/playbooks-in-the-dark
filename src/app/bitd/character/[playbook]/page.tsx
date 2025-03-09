import { getJson } from "@/lib/system-data";
import type {
  CharacterPlaybook as CharacterPlaybookType,
  SystemCharacters as SystemCharactersType,
  System as SystemType
} from "@/types";
import CharacterPlaybook from "./components/playbook";

type Props = {
  params: Promise<{ playbook: string }>;
};

export default async function Page(props: Props) {
  const { playbook } = await props.params;

  const playbookData = getJson("bitd", playbook) as CharacterPlaybookType;
  const systemData = getJson("bitd", "system") as SystemType;
  const systemCharactersData = getJson(
    "bitd",
    "characters"
  ) as SystemCharactersType;

  return (
    <CharacterPlaybook
      playbookData={playbookData}
      systemCharactersData={systemCharactersData}
      userData={{
        id: undefined,
        systemId: systemData.id,
        playbookId: playbookData.id
      }}
    />
  );
}
