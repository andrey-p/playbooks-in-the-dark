import Item from "./item";
import AttributeWithActions from "./attribute-with-actions";
import PlaybookModule from './playbook-module';

type SystemCharacters = {
  playbooks: string[];
  commonItems: Item[];
  attributesWithActions: AttributeWithActions[];
  layout: string[][];
  modules: {
    [key: string]: PlaybookModule
  }
};

export default SystemCharacters;
