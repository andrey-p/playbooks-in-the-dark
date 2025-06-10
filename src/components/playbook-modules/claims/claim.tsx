import { z } from 'zod';
import { useId } from 'react';
import { Claim as ClaimSchema } from './claims.schema';
import clsx from 'clsx';
import styles from './claim.module.css';
import Description from '@/components/playbook-elements/description/description';
import { useTranslations } from 'next-intl';

type Props = {
  claim: z.infer<typeof ClaimSchema>;
  position: [number, number];
  selected?: boolean;
  onSelect: (id: string, selected: boolean) => void;
};

export default function Claim(props: Props) {
  const { claim, selected, position, onSelect } = props;
  const t = useTranslations();
  const consistentId = useId();

  return (
    <div
      className={clsx(
        styles.container,
        claim.selectable ? styles.selectable : styles.notSelectable,
        selected && styles.selected,
        // x/y based coordinates for position-specific styling
        `claim-${position[0]}-${position[1]}`
      )}
    >
      {/* hidden checkbox to back accessibility */}
      <input
        className={styles.control}
        type='checkbox'
        disabled={!claim.selectable}
        checked={!!selected}
        aria-labelledby={`${consistentId}-name`}
        aria-describedby={
          claim.description ? `${consistentId}-description` : undefined
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (claim.selectable) {
            onSelect(claim.id, e.target.checked);
          }
        }}
      />

      <div className={styles.name} id={`${consistentId}-name`}>
        {t(claim.name)}
      </div>

      {claim.description && (
        <div id={`${consistentId}-description`}>
          <Description text={claim.description} />
        </div>
      )}
      {claim.connections &&
        claim.connections.map((direction) => (
          <div
            key={direction}
            role='none'
            className={clsx(styles.connection, styles[direction])}
          />
        ))}
    </div>
  );
}
