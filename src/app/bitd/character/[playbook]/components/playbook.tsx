import type { CharacterPlaybook, System } from '@/types';
import Ratings from '@/components/playbooks/ratings/ratings';
import ItemList from '@/components/playbooks/items/item-list';
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
          {systemData.attributesWithActions.map(attribute => (
            <Ratings
              key={attribute.name}
              attributeWithActions={attribute}
              currentActionRatings={playbookData.actionRatings}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Items</h2>

        <ItemList
          items={playbookData.items}
        />
        <ItemList
          items={systemData.commonItems}
        />
      </div>
    </div>
  );
}
