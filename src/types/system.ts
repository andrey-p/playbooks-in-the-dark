import Item from "./item";
import AttributeWithActions from "./attribute-with-actions";

type System = {
  id: string;
  name: string;
  characterPlaybooks: string[];
  commonItems: Item[];
  attributesWithActions: AttributeWithActions[];
};

export default System;
