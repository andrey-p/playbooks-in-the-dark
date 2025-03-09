import Item from "./item";
import AttributeWithActions from "./attribute-with-actions";

type SystemCharacters = {
  playbooks: string[];
  commonItems: Item[];
  attributesWithActions: AttributeWithActions[];
  layout: string[][];
  modules: {
    [key: string]: object;
  };
};

export default SystemCharacters;
