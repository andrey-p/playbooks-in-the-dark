import type { CharacterPlaybook, System } from '@/types';
import Attribute from './attribute';
import styles from './playbook.module.css';

type Props = {
  playbookData: CharacterPlaybook,
  systemData: System
};

export default function Playbook(props: Props) {
  const { playbookData, systemData } = props;

  return (
    <div>
      {playbookData.name}

      <div>
        <h2>Attributes</h2>

        <div className={styles.attributes}>
          {systemData.attributes.map(attribute => (
            <Attribute
              key={attribute.name}
              attribute={attribute}
              ratings={playbookData.ratings}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
