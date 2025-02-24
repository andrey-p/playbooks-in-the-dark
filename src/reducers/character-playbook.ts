import type { CharacterPlaybook } from '@/types';

type Action = {
  type: 'set_action_rating',
  action: string,
  value: number
};

export default function characterPlaybook(state: CharacterPlaybook, action: Action) {
  switch (action.type) {
    case 'set_action_rating':
      state = structuredClone(state);
      state.actionRatings[action.action] = action.value;

      return state;
  }
}
