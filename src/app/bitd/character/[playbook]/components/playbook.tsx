'use client';

import { useReducer } from 'react';
import type { CharacterPlaybook, System } from '@/types';
import Ratings from '@/components/playbooks/ratings/ratings';
import ItemList from '@/components/playbooks/items/item-list';
import SpecialAbilityList from '@/components/playbooks/special-abilities/special-ability-list';
import styles from './playbook.module.css';
import { characterPlaybookReducer } from '@/reducers';

type Props = {
  playbookData: CharacterPlaybook,
  systemData: System
};

export default function Playbook(props: Props) {
  const { playbookData, systemData } = props;
  const [localPlaybookData, dispatch] = useReducer(characterPlaybookReducer, playbookData);

  return (
    <div>
      {localPlaybookData.name}

      <div>
        <h2>Attributes</h2>

        <div className={styles.attributes}>
          {systemData.attributesWithActions.map(attribute => (
            <Ratings
              key={attribute.name}
              attributeWithActions={attribute}
              currentActionRatings={localPlaybookData.actionRatings}
              onRatingUpdate={(action, value) => dispatch({
                type: 'set_action_rating',
                action,
                value
              })}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Items</h2>

        <ItemList
          items={localPlaybookData.items}
        />
        <ItemList
          items={systemData.commonItems}
        />
      </div>

      <div>
        <h2>Special abilities</h2>

        <SpecialAbilityList
          specialAbilities={localPlaybookData.specialAbilities}
        />
      </div>
    </div>
  );
}
