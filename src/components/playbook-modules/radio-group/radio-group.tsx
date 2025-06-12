import { z } from 'zod';
import RadioGroupComponent from '@/components/playbook-elements/radio-group/radio-group';
import PropsSchema from './radio-group.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './radio-group.module.css';

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
      <div className={styles.container}>
        <RadioGroupComponent
          {...moduleProps}
          value={value}
          label={moduleDefinition.label}
          onValueSelect={onValueSelect}
        />
      </div>
    </ModuleWrapper>
  );
}
