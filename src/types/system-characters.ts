import Item from "./item";
import AttributeWithActions from "./attribute-with-actions";

type SystemCharacters = {
  playbooks: string[];
  commonItems: Item[];
  attributesWithActions: AttributeWithActions[];
};

export default SystemCharacters;
