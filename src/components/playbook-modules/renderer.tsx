import type { UserCharacterData } from "@/types";
import type Action from "@/reducers/user-character-action";

import type { SharedModuleSchemas } from "./playbook-modules.types";
import { SystemModuleData } from "./playbook-modules.schema";

import TextFieldSchemas from "./text-field/text-field.schema";
import TextField from "./text-field/text-field";
import TrackerSchemas from "./tracker/tracker.schema";
import Tracker from "./tracker/tracker";

type Props = {
  layout: string[][];
  modules: {
    [key: string]: object;
  };
  userCharacterData: UserCharacterData;
  dispatch: React.ActionDispatch<[Action]>;
};

const schemasByModuleType: Record<string, SharedModuleSchemas> = {
  textField: TextFieldSchemas,
  tracker: TrackerSchemas
};

// The renderer is probably the meatiest component of the whole app -
// it matches up sheet layout with modules defined for the system and the specific playbook
// with any user data stored for the particular module, and the actual modules we have code for
// with specific type-safe methods for the reducer
//
// any type uncertainty and inconsistency should be resolved at runtime in this component
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

      const moduleObj = modules[moduleId];
      const value = userCharacterData[moduleId];

      // up to this point we're just passing arbitrary data for this module around
      // first off, check that the module definition is correct
      const moduleData = SystemModuleData.parse(Object.assign(moduleObj));

      // the module should define its own Zod schemas that also verify actual correctness
      const schema = schemasByModuleType[moduleData.type];

      if (!schema) {
        throw new Error(`Module ${moduleId} has no schema defined`);
      }

      const moduleDataWithProps = {
        ...moduleData,
        props: schema.SystemProps.parse(moduleData.props)
      };

      switch (moduleData.type) {
        case "textField":
          return (
            <TextField
              key={moduleId}
              systemModuleData={moduleDataWithProps}
              value={schema.Value.parse(value || moduleData.default)}
              onUpdate={(value) => {
                dispatch({ type: "set_string", key: moduleId, value });
              }}
            />
          );
        case "tracker":
          return (
            <Tracker
              key={moduleId}
              systemModuleData={moduleDataWithProps}
              value={schema.Value.parse(value || moduleData.default)}
              onUpdate={(value) => {
                dispatch({ type: "set_number", key: moduleId, value });
              }}
            />
          );
        default:
          throw new Error("Unknown module type: " + moduleData.type);
      }
    });
  });
}
