import type { PlaybookModule, UserCharacterData } from "@/types";
import type Action from "@/reducers/user-character-action";

import type { SharedModuleSchemas } from "./playbook-modules.types";

import TextFieldSchemas from "./text-field/text-field.schema";
import TextField from "./text-field/text-field";
// import Tracker from './tracker/tracker';

type Props = {
  layout: string[][];
  modules: {
    [key: string]: PlaybookModule;
  };
  userCharacterData: UserCharacterData;
  dispatch: React.ActionDispatch<[Action]>;
};

const schemasByModuleType: Record<string, SharedModuleSchemas> = {
  textField: TextFieldSchemas
};

export default function Renderer(props: Props) {
  const { layout, modules, userCharacterData, dispatch } = props;

  // layout is an array of arrays, or more specifically a list of columns
  // each of which is a list of modules
  // go down and render each of them
  return layout.map((column) => {
    return column.map((moduleId) => {
      if (!modules[moduleId]) {
        throw new Error("Got layout entry for missing module: " + moduleId);
      }

      const moduleData = modules[moduleId];
      const value = userCharacterData[moduleId];

      // up to this point we're just passing arbitrary data for this module around
      // the module should define its own Zod schemas that verify actual correctness
      const schema = schemasByModuleType[moduleData.type];

      if (!schema) {
        throw new Error(`Module ${moduleId} has no schema defined`);
      }

      schema.SystemProps.parse(moduleData.props);

      switch (moduleData.type) {
        case "textField":
          return (
            <TextField
              key={moduleId}
              systemModuleData={moduleData}
              value={schema.Value.parse(value)}
              onUpdate={(value) => {
                dispatch({ type: "set_string", key: moduleId, value });
              }}
            />
          );
        default:
          throw new Error("Unknown module type: " + moduleData.type);
      }
    });
  });
}
