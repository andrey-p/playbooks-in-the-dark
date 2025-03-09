import AttributeWithActions from "./attribute-with-actions";

type SystemCharacters = {
  playbooks: string[];
  attributesWithActions: AttributeWithActions[];
  layout: string[][];
  modules: {
    [key: string]: object;
  };
};

export default SystemCharacters;
