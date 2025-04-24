import { z } from 'zod';
import {
  BaseModuleDefinition as BaseModuleDefinitionSchema,
  BasePlaybookProps as BasePlaybookPropsSchema
} from '@/schemas';
import styles from './module-wrapper.module.css';
import Description from '@/components/playbook-elements/description/description';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

type Props = {
  moduleDefinition: z.infer<typeof BaseModuleDefinitionSchema>;
  playbookProps?: z.infer<typeof BasePlaybookPropsSchema>;
  children: React.ReactNode;
};

export default function ModuleWrapper(props: Props) {
  const { moduleDefinition, playbookProps = {}, children } = props;
  const t = useTranslations();

  return (
    <div
      className={clsx(
        styles.container,
        // add the ID and type of the module to use as a styling hook
        moduleDefinition.id,
        moduleDefinition.type
      )}
    >
      <h2 className={styles.heading}>
        {t(playbookProps.customLabel || moduleDefinition.label)}
      </h2>
      {children}
      {moduleDefinition.description && (
        <Description text={moduleDefinition.description} />
      )}
    </div>
  );
}
