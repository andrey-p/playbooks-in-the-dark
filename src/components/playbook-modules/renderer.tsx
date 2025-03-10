import { z } from 'zod';
import type { UserData, CharacterPlaybook } from '@/types';
import type Action from '@/reducers/user-data-action';

import ColumnContainer from './layout/column-container';
import Column from './layout/column';

import {
  schemasByModuleType,
  componentsByModuleType
} from './all-modules-and-schemas';

type Props = {
  layout: string[][];
  modules: {
    [key: string]: object;
  };
  userData: UserData;
  playbookData: CharacterPlaybook;
  dispatch: React.ActionDispatch<[Action]>;
};

// The renderer is probably the meatiest component of the whole app -
// it matches up sheet layout with modules defined for the system and the specific playbook
// with any user data stored for the particular module, and the actual modules we have code for
// with specific type-safe methods for the reducer
//
// any type uncertainty and inconsistency should be resolved at runtime in this component
export default function Renderer(props: Props) {
  const { layout, modules, userData, playbookData, dispatch } = props;

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
                'Got layout entry for missing module: ' + moduleId
              );
            }

            const moduleDefinition = modules[moduleId];
            const userValue = userData[moduleId];
            const playbookProps = playbookData[moduleId];

            // up to this point we're just passing arbitrary data for this module around
            // we need to do some verification before we continue

            // first off, grab the module type off of the module definition
            // so we know what we're looking at
            const basicModuleDefinition = z
              .object({
                type: z.string(),
                default: z.any()
              })
              .parse(moduleDefinition);

            // pull out the schemas that this module has defined
            const schemaModuleType =
              basicModuleDefinition.type as keyof typeof schemasByModuleType;

            if (!(schemaModuleType in schemasByModuleType)) {
              throw new Error(`module type ${moduleId} has no schema defined`);
            }

            const schemas = schemasByModuleType[schemaModuleType];

            // then, pull out the component this module will be using
            const componentModuleType =
              basicModuleDefinition.type as keyof typeof componentsByModuleType;
            if (!(componentModuleType in componentsByModuleType)) {
              throw new Error(
                `module type ${moduleId} has no component defined`
              );
            }

            // trust me on this bro
            // (some mild jiggery-pokery to let Typescript rest easy about the props)
            // (don't worry, they're verified via Zod and system tests)
            const Component = componentsByModuleType[componentModuleType]
              .default as unknown as React.ElementType;

            const typeCheckedProps = schemas.default.parse({
              moduleDefinition,
              playbookProps,
              userValue: userValue || basicModuleDefinition.default,
              onUpdate: (value: z.infer<typeof schemas.UserValue>) => {
                dispatch({ type: 'set_value', key: moduleId, value });
              }
            });

            return <Component key={moduleId} {...typeCheckedProps} />;
          })}
        </Column>
      ))}
    </ColumnContainer>
  );
}
