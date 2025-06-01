import { z } from 'zod';
import styles from './radio-control-wrapper.module.css';
import { useTranslations } from 'next-intl';
import { LabelOrLabelledBy as LabelOrLabelledBySchema } from './radio-control-wrapper.schema';

type Props = {
  name: string;
  children: React.ReactNode;
  zeroSelected: boolean;
  zeroLabel?: string;
  onZeroSelect: () => void;
} & z.infer<typeof LabelOrLabelledBySchema>;

// A generic container for HTML radio controls
// that adds an accessible label and way to zero out values
export default function RadioControlWrapper(props: Props) {
  const { name, children, onZeroSelect, zeroSelected, zeroLabel, ...rest } =
    props;
  const t = useTranslations();

  return (
    <fieldset
      className={styles.container}
      aria-labelledby={'labelledBy' in rest ? rest.labelledBy : undefined}
    >
      {'label' in rest && (
        <legend className={styles.legend}>{t(rest.label)}</legend>
      )}

      <div className={styles.toggleZeroContainer}>
        {/*
          secret zeroth toggle
          rendered outside of the visible radio group space,
          but within the accessibility tree
          so keyboard users can zero out the radio group
        */}
        <input
          type='radio'
          name={name}
          checked={zeroSelected}
          className={styles.toggleZero}
          aria-label={zeroLabel || t('UI.ModulesShared.NotSet')}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              onZeroSelect();
            }
          }}
        />
      </div>

      {children}
    </fieldset>
  );
}
