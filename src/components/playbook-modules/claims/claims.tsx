import { z } from 'zod';
import PropsSchema from './claims.schema';
import Claim from './claim';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './claims.module.css';

type Props = z.infer<typeof PropsSchema>;

export default function Claims(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { selected: selectedClaims } = userValue;
  const { claims: availableClaims } = playbookProps;

  const onClaimSelect = (id: string, selected: boolean) => {
    onUpdate({
      selected: {
        ...selectedClaims,
        [id]: selected
      }
    });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <div className={styles.container}>
        {availableClaims.map((row, i) => (
          <div className={styles.row} key={i}>
            {row.map((claim, j) => (
              <Claim
                key={claim.id}
                claim={claim}
                position={[j, i]}
                selected={selectedClaims[claim.id]}
                onSelect={onClaimSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </ModuleWrapper>
  );
}
