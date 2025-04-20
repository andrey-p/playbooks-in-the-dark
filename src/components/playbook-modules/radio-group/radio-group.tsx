import { z } from 'zod';
import RadioGroupComponent from '@/components/playbook-elements/radio-group/radio-group';
import PropsSchema from './radio-group.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function RadioGroup(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { props: moduleProps } = moduleDefinition;
  const { value } = userValue;

  const onValueSelect = (value: string | null) => {
    onUpdate({ value });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <RadioGroupComponent
        {...moduleProps}
        value={value}
        onValueSelect={onValueSelect}
      />
    </ModuleWrapper>
  );
}
