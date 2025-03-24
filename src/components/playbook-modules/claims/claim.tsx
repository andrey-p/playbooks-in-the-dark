import { z } from 'zod';
import { Claim as ClaimSchema } from './claims.schema';
import clsx from 'clsx';
import styles from './claim.module.css';
import Description from '@/components/description/description';

type Props = {
  claim: z.infer<typeof ClaimSchema>;
  selected?: boolean;
  onSelect: (id: string, selected: boolean) => void;
};

export default function Claim(props: Props) {
  const { claim, selected, onSelect } = props;

  return (
    <div
      className={clsx(
        styles.container,
        claim.selectable ? styles.selectable : styles.notSelectable,
        selected && styles.selected
      )}
      onClick={() => {
        if (claim.selectable) {
          onSelect(claim.id, !selected);
        }
      }}
    >
      <div className={styles.name}>{claim.name}</div>
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
