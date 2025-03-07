import { getJson } from "@/lib/system-data";
import CharacterPlaybook from "./components/playbook";

type Props = {
  params: Promise<{ playbook: string }>;
};

export default async function Page(props: Props) {
  const { playbook } = await props.params;

  const playbookData = getJson("bitd", playbook);
  const systemData = getJson("bitd", "system");

  console.log(playbookData);

  return (
    <CharacterPlaybook
      playbookData={playbookData}
      systemData={systemData}
      userCharacterData={{
        systemId: systemData.id,
        playbookId: playbookData.id,
        name: "",
        heritage: "",
        stress: 0,
        traumas: [],
        actionRatings: Object.assign(playbookData.actionRatings),
        attributeXp: {},
        selectedItems: [],
        selectedSpecialAbilities: []
      }}
    />
  );
}
