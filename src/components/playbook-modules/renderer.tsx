import type { PlaybookModule, UserCharacterData } from '@/types';
import type Action from '@/reducers/user-character-action';

import TextField from './text-field/text-field';
// import Tracker from './tracker/tracker';

type Props = {
  layout: string[][],
  modules: {
    [key: string]: PlaybookModule
  },
  userCharacterData: UserCharacterData,
  dispatch: React.ActionDispatch<[Action]>
};

export default function Renderer(props: Props) {
  const { layout, modules, userCharacterData, dispatch } = props;

  return layout.map(column => {
    return column.map(moduleId => {
      if (!modules[moduleId]) {
        throw new Error('Got layout entry for missing module: ' + moduleId);
      }

      const moduleData = modules[moduleId];

      switch(moduleData.type) {
        case 'textField': 
          return (
            <TextField
              key={moduleId}
              systemModuleData={moduleData}
              value={userCharacterData[moduleId]}
              onUpdate={(value) => {
                dispatch({
                  type: 'set_' + moduleId,
                  value
                });
              }}
            />
          );
        default:
          throw new Error('Got unknown module type: ' + moduleData.type);
      }
    });
  });
}
