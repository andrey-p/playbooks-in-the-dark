import type { UserCharacterData, CharacterPlaybook } from "@/types";
import type Action from "@/reducers/user-character-action";

import type { SharedModuleSchemas } from "./playbook-modules.types";
import { ModuleDefinition } from "./playbook-modules.schema";

import ColumnContainer from "./layout/column-container";
import Column from "./layout/column";

import TextFieldSchemas from "./text-field/text-field.schema";
import TextField from "./text-field/text-field";
import TrackerSchemas from "./tracker/tracker.schema";
import Tracker from "./tracker/tracker";
import ItemsSchemas from "./items/items.schema";
import Items from "./items/items";

type Props = {
  layout: string[][];
  modules: {
    [key: string]: object;
  };
  userCharacterData: UserCharacterData;
  playbookData: CharacterPlaybook;
  dispatch: React.ActionDispatch<[Action]>;
};

const schemasByModuleType: Record<string, SharedModuleSchemas> = {
  textField: TextFieldSchemas,
  tracker: TrackerSchemas,
  items: ItemsSchemas
};

// The renderer is probably the meatiest component of the whole app -
// it matches up sheet layout with modules defined for the system and the specific playbook
// with any user data stored for the particular module, and the actual modules we have code for
// with specific type-safe methods for the reducer
//
// any type uncertainty and inconsistency should be resolved at runtime in this component
export default function Renderer(props: Props) {
  const { layout, modules, userCharacterData, playbookData, dispatch } = props;

  // layout is an array of arrays, or more specifically a list of columns
  // each of which is a list of modules
  // go down and render each of them
  return (
    <ColumnContainer>
      {layout.map((column, i) => (
        <Column key={i}>
          {column.map((moduleId) => {
            if (!modules[moduleId]) {
              throw new Error(
                "Got layout entry for missing module: " + moduleId
              );
            }

            const moduleObj = modules[moduleId];
            const value = userCharacterData[moduleId];
            const playbookProps = playbookData[moduleId];

            // up to this point we're just passing arbitrary data for this module around
            // first off, check that the module definition is correct
            const moduleDefinition = ModuleDefinition.parse(
              Object.assign(moduleObj)
            );

            // the module should define its own Zod schemas that also verify actual correctness
            const schema = schemasByModuleType[moduleDefinition.type];

            if (!schema) {
              throw new Error(`Module ${moduleId} has no schema defined`);
            }

            const typeCheckedProps = {
              moduleDefinition: {
                ...moduleDefinition,
                props: schema.SystemProps.parse(moduleDefinition.props)
              },
              playbookProps: schema.PlaybookProps.parse(playbookProps),
              value: schema.Value.parse(value || moduleDefinition.default)
            };

            switch (moduleDefinition.type) {
              case "textField":
                return (
                  <TextField
                    key={moduleId}
                    onUpdate={(value) => {
                      dispatch({ type: "set_string", key: moduleId, value });
                    }}
                    {...typeCheckedProps}
                  />
                );
              case "tracker":
                return (
                  <Tracker
                    key={moduleId}
                    onUpdate={(value) => {
                      dispatch({ type: "set_number", key: moduleId, value });
                    }}
                    {...typeCheckedProps}
                  />
                );
              case "items":
                return (
                  <Items
                    key={moduleId}
                    onUpdate={(value) => {
                      dispatch({
                        type: "set_string_array",
                        key: moduleId,
                        value
                      });
                    }}
                    {...typeCheckedProps}
                  />
                );
              default:
                throw new Error(
                  "Unknown module type: " + moduleDefinition.type
                );
            }
          })}
        </Column>
      ))}
    </ColumnContainer>
  );
}
