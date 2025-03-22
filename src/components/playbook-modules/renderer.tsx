import { z } from 'zod';
import {
  UserData as UserDataSchema,
  PlaybookData as PlaybookDataSchema,
  BaseModuleDefinition as BaseModuleDefinitionSchema
} from '@/schemas';
import type Action from '@/reducers/user-data-action';

import ColumnContainer from './layout/column-container';
import Column from './layout/column';
import Row from './layout/row';

import { componentsByModuleType } from './all-modules';
import { schemasByModuleType } from './all-schemas';

type UserDataType = z.infer<typeof UserDataSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;

type Props = {
  layout: (string | string[])[][];
  modules: {
    [key: string]: object;
  };
  userData: UserDataType;
  playbookData: PlaybookDataType;
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

  const renderModule = (moduleId: string) => {
    if (!modules[moduleId]) {
      throw new Error('Got layout entry for missing module: ' + moduleId);
    }

    const moduleDefinition = modules[moduleId];
    const userValue = userData.modules[moduleId];
    const playbookProps = playbookData.modules[moduleId];

    // up to this point we're just passing arbitrary data for this module around
    // we need to do some verification before we continue

    // first off, grab the module type off of the module definition
    // so we know what we're looking at
    const baseModuleDefinition =
      BaseModuleDefinitionSchema.parse(moduleDefinition);

    // pull out the schemas that this module has defined
    const schemaModuleType =
      baseModuleDefinition.type as keyof typeof schemasByModuleType;

    if (!(schemaModuleType in schemasByModuleType)) {
      throw new Error(`module type ${moduleId} has no schema defined`);
    }

    const schemas = schemasByModuleType[schemaModuleType];

    // then, pull out the component this module will be using
    const componentModuleType =
      baseModuleDefinition.type as keyof typeof componentsByModuleType;
    if (!(componentModuleType in componentsByModuleType)) {
      throw new Error(`module type ${moduleId} has no component defined`);
    }

    // if this module is playbook-restricted,
    // only render if the current playbook matches
    if (
      baseModuleDefinition.playbooks &&
      !baseModuleDefinition.playbooks.includes(playbookData.id)
    ) {
      return null;
    }

    // trust me on this bro
    // (some mild jiggery-pokery to let Typescript rest easy about the props)
    // (don't worry, they're verified via Zod and system tests)
    const Component = componentsByModuleType[componentModuleType]
      .default as unknown as React.ElementType;

    const typeCheckedProps = schemas.default.parse({
      moduleDefinition,
      playbookProps,
      userValue: userValue || baseModuleDefinition.default,
      onUpdate: (value: z.infer<typeof schemas.UserValue>) => {
        dispatch({ type: 'set_value', key: moduleId, value });
      }
    });

    return <Component key={moduleId} {...typeCheckedProps} />;
  };

  // layout is an array of arrays, or more specifically a list of columns
  // each of which is a list of rows (possibly a single or more modules)
  // go down and render each of them
  return (
    <ColumnContainer>
      {layout.map((column, i) => (
        <Column key={i}>
          {column.map((row, i) => {
            if (typeof row === 'string') {
              return <Row key={i}>{renderModule(row)}</Row>;
            } else if (row instanceof Array) {
              return <Row key={i}>{row.map(renderModule)}</Row>;
            }
          })}
        </Column>
      ))}
    </ColumnContainer>
  );
}
