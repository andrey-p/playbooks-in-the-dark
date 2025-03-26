import { z } from 'zod';
import PropsSchema from './description.schema';
import ModuleWrapper from '../layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function Description(props: Props) {
  const { moduleDefinition, playbookProps } = props;

  // this module simply uses the built-in description functionality
  // in ModuleWrapper in order to display some text
  // - no other inputs or outputs
  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {null}
    </ModuleWrapper>
  );
}
