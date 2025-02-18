import type { CharacterPlaybook, System } from '@/types';
import Attribute from './attribute';

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
        {systemData.attributes.map(attribute => (
          <Attribute
            key={attribute.name}
            attribute={attribute}
            ratings={playbookData.ratings}
          />
        ))}
      </div>
    </div>
  );
}
