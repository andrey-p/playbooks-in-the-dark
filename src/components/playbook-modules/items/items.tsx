import { z } from "zod";
import { SharedModuleProps } from "../playbook-modules.types";
import schemas, { Item as ItemSchema } from "./items.schema";
import { toggleArrayEntry } from "@/lib/utils";
import Item from "./item";

type ItemType = z.infer<typeof ItemSchema>;

type Props = SharedModuleProps<z.infer<typeof schemas.Value>> & {
  moduleDefinition: {
    props: z.infer<typeof schemas.SystemProps>;
  };
  playbookData: z.infer<typeof schemas.PlaybookProps>;
};

export default function ItemList(props: Props) {
  const {
    moduleDefinition,
    value: selectedItems,
    onUpdate,
    playbookData
  } = props;

  const onItemSelect = (itemId: string, selected: boolean) => {
    const nextSelectedItems = toggleArrayEntry(itemId, selected, selectedItems);
    onUpdate(nextSelectedItems);
  };

  return (
    <ul>
      {moduleDefinition.props.common.map((item: ItemType) => (
        <li key={item.id}>
          <Item
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={(selected) => onItemSelect(item.id, selected)}
          />
        </li>
      ))}
      {playbookData.map((item: ItemType) => (
        <li key={item.id}>
          <Item
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={(selected) => onItemSelect(item.id, selected)}
          />
        </li>
      ))}
    </ul>
  );
}
