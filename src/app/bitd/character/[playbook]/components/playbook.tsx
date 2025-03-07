'use client';

import { useReducer } from 'react';
import type { UserCharacterData, CharacterPlaybook, System } from '@/types';
import Ratings from '@/components/playbooks/ratings/ratings';
import ItemList from '@/components/playbooks/items/item-list';
import TextField from '@/components/playbooks/text-field/text-field';
import SpecialAbilityList from '@/components/playbooks/special-abilities/special-ability-list';
import SimpleTracker from '@/components/trackers/simple-tracker';
import ExampleList from '@/components/example-list/example-list';
import styles from './playbook.module.css';
import { userCharacterReducer } from '@/reducers';
import SaveAction from '@/components/playbook-actions/save';

import { getEnvVar } from '@/lib/env';
import { saveCharacter } from '@/lib/store';

type Props = {
  playbookData: CharacterPlaybook,
  systemData: System,
  userCharacterData: UserCharacterData
};

export default function Playbook(props: Props) {
  const { userCharacterData: initialCharacterData, playbookData, systemData } = props;
  const [userCharacterData, dispatch] = useReducer(userCharacterReducer, initialCharacterData);

  const savePlaybook = async () => {
    const data = await saveCharacter(userCharacterData);
    const baseUrl = await getEnvVar('APP_URL');

    return {
      shareableUrl: `${baseUrl}/share/${data.id}`
    };
  };

  return (
    <div>
      {playbookData.id}

      <div>
        <h2>Details</h2>

        <TextField
          text={userCharacterData.name}
          label='name'
          onTextUpdated={(value) => dispatch({
            type: 'set_name',
            value
          })}
        />

        <TextField
          text={userCharacterData.heritage}
          label='heritage'
          onTextUpdated={(value) => dispatch({
            type: 'set_heritage',
            value
          })}
          examples={[
            'Akoros',
            'The Dagger Isles',
            'Iruvia',
            'Severos',
            'Skovlan',
            'Tycheros'
          ]}
        />
      </div>

      <div>
        <h2>Stress and Trauma</h2>

        <SimpleTracker
          value={userCharacterData.stress}
          type='dagger'
          max={9}
          onValueSelect={(value) => dispatch({
            type: 'set_stress',
            value
          })}
        />

        <div>
          <SimpleTracker
            value={userCharacterData.traumas.length}
            type='dagger'
            max={4}
          />
          <ExampleList
            items={[
              'Cold',
              'Haunted',
              'Obsessed',
              'Paranoid',
              'Reckless',
              'Soft',
              'Unstable',
              'Vicious'
            ]}
            selectable
            selectedItems={userCharacterData.traumas}
            onItemSelected={(trauma, selected) => dispatch({
              type: 'set_trauma_selected',
              trauma,
              selected
            })}
          />
        </div>
      </div>

      <div>
        <h2>Attributes</h2>

        <div className={styles.attributes}>
          {systemData.attributesWithActions.map(attribute => (
            <Ratings
              key={attribute.id}
              attributeWithActions={attribute}
              currentActionRatings={userCharacterData.actionRatings}
              xp={userCharacterData.attributeXp[attribute.id] || 0}
              onXpUpdate={(attribute, value) => dispatch({
                type: 'set_attribute_xp',
                attribute,
                value
              })}
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
          items={playbookData.items}
          selectedItems={userCharacterData.selectedItems}
          onItemSelect={(itemId, selected) => dispatch({
            type: 'set_item_selected',
            itemId,
            selected
          })}
        />
        <ItemList
          items={systemData.commonItems}
          selectedItems={userCharacterData.selectedItems}
          onItemSelect={(itemId, selected) => dispatch({
            type: 'set_item_selected',
            itemId,
            selected
          })}
        />
      </div>

      <div>
        <h2>Special abilities</h2>

        <SpecialAbilityList
          specialAbilities={playbookData.specialAbilities}
          selectedAbilities={userCharacterData.selectedSpecialAbilities}
          onSpecialAbilitySelect={(specialAbilityId, selected) => dispatch({
            type: 'set_special_ability_selected',
            specialAbilityId,
            selected
          })}
        />
      </div>

      <SaveAction
        savePlaybook={savePlaybook}
      />
    </div>
  );
}
