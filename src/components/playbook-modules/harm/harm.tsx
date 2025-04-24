import { z } from 'zod';
import PropsSchema from './harm.schema';
import HarmItem from './harm-item';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import { useTranslations } from 'next-intl';

import styles from './harm.module.css';

type Props = z.infer<typeof PropsSchema>;

export default function Harm(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { harmsTaken } = userValue;
  const { levelDescriptions } = moduleDefinition.props;
  const t = useTranslations();

  // zero-based
  const levels = [2, 1, 0];

  const onHarmItemUpdate = (level: number, column: number, text: string) => {
    const nextHarmsTaken = structuredClone(harmsTaken);
    const idx = nextHarmsTaken.findIndex(
      (harm) => harm.level === level && harm.column === column
    );

    if (idx > -1) {
      nextHarmsTaken[idx].text = text;
    } else {
      nextHarmsTaken.push({
        text,
        column,
        level
      });
    }

    onUpdate({ harmsTaken: nextHarmsTaken });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <table className={styles.table}>
        <tbody>
          {levels.map((level) => (
            <tr key={level}>
              <td className={styles.levelColumn}>{level + 1}</td>
              {level === 2 ? (
                <td className={styles.harmColumn} colSpan={2}>
                  <HarmItem
                    level={2}
                    column={0}
                    onUpdate={onHarmItemUpdate}
                    harmText={harmsTaken.find((harm) => harm.level === 2)?.text}
                  />
                </td>
              ) : (
                <>
                  <td className={styles.harmColumn}>
                    <HarmItem
                      level={level}
                      column={0}
                      onUpdate={onHarmItemUpdate}
                      harmText={
                        harmsTaken.find(
                          (harm) => harm.level === level && harm.column === 0
                        )?.text
                      }
                    />
                  </td>
                  <td className={styles.harmColumn}>
                    <HarmItem
                      level={level}
                      column={1}
                      onUpdate={onHarmItemUpdate}
                      harmText={
                        harmsTaken.find(
                          (harm) => harm.level === level && harm.column === 1
                        )?.text
                      }
                    />
                  </td>
                </>
              )}
              <td className={styles.infoColumn}>
                {t(levelDescriptions[level])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModuleWrapper>
  );
}
