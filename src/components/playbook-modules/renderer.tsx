import type { PlaybookModule } from '@/types';

import TextField from './text-field/text-field';
// import Tracker from './tracker/tracker';

type Props = {
  layout: string[][],
  modules: {
    [key: string]: PlaybookModule
  }
};

export default function Renderer(props: Props) {
  const { layout, modules } = props;

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
              text='foo'
              //onTextUpdated: () => {}
            />
          );
        default:
          throw new Error('Got unknown module type: ' + moduleData.type);
      }
    });
  });
}
