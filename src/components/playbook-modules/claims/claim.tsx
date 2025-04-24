import { z } from 'zod';
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

  return (
    <div
      className={clsx(
        styles.container,
        claim.selectable ? styles.selectable : styles.notSelectable,
        selected && styles.selected,
        // x/y based coordinates for position-specific styling
        `claim-${position[0]}-${position[1]}`
      )}
      onClick={() => {
        if (claim.selectable) {
          onSelect(claim.id, !selected);
        }
      }}
    >
      <div className={styles.name}>{t(claim.name)}</div>
      {claim.description && <Description text={claim.description} />}
      {claim.connections &&
        claim.connections.map((direction) => (
          <div
            key={direction}
            className={clsx(styles.connection, styles[direction])}
          />
        ))}
    </div>
  );
}
