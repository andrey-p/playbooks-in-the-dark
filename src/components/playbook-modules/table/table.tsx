import { z } from 'zod';
import PropsSchema from './table.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import { useTranslations } from 'next-intl';
import styles from './table.module.css';

type Props = z.infer<typeof PropsSchema>;

const getBlankValues = (numRows: number, numColumns: number) => {
  const values = [];

  for (let i = 0; i < numRows; i++) {
    const rowVals = [];

    for (let j = 0; j < numColumns; j++) {
      rowVals.push('');
    }

    values.push(rowVals);
  }

  return values;
};

export default function Table(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const { values } = userValue;
  // false positive for the linter - apparently this issue should be fixed
  // but this is still causing a lint error
  // https://github.com/facebook/react/issues/31687
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();

  const rows = [];

  const onCellChange = (row: number, column: number, value: string) => {
    let nextValues = structuredClone(values);

    // first time values are stored,
    // populate with empty strings
    if (!nextValues.length) {
      nextValues = getBlankValues(
        moduleProps.maxRows,
        moduleProps.columns.length
      );
    }

    if (!nextValues[row]) {
      nextValues[row] = [];
    }

    nextValues[row][column] = value;

    onUpdate({ values: nextValues });
  };

  for (let i = 0; i < moduleProps.maxRows; i++) {
    rows.push(
      <tr key={i}>
        {moduleProps.columns.map((_, j) => (
          <td key={j}>
            <input
              className={styles.input}
              type='text'
              value={(values[i] && values[i][j]) || ''}
              onChange={(e) => {
                onCellChange(i, j, e.currentTarget.value);
              }}
            />
          </td>
        ))}
      </tr>
    );
  }

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {moduleProps.columns.map((column, i) => (
              <td style={{ width: `${column.widthPct}%` }} key={i}>
                {t(column.heading)}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </ModuleWrapper>
  );
}
