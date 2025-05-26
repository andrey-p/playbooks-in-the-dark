import { useId } from 'react';
import { z } from 'zod';
import styles from './text-field.module.css';
import ExampleList from '@/components/playbook-elements/example-list/example-list';
import PropsSchema from './text-field.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import { useTranslations } from 'next-intl';

type Props = z.infer<typeof PropsSchema>;

export default function TextField(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;
  const examples = moduleProps?.examples || playbookProps?.examples;
  const { text } = userValue;
  const t = useTranslations();

  const consistentId = useId();

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={text}
          className={styles.input}
          id={consistentId}
          aria-label={moduleDefinition.hideModuleLabel ? undefined : label}
          name={consistentId}
          onChange={(e) =>
            onUpdate({
              text: e.currentTarget.value
            })
          }
        />
      </div>
      <div className={styles.labelContainer}>
        {moduleDefinition.hideModuleLabel && (
          <label className={styles.label} htmlFor={consistentId}>
            {t(label)}
          </label>
        )}
        {examples && <ExampleList items={examples} />}
      </div>
    </ModuleWrapper>
  );
}
