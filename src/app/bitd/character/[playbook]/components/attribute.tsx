import type { Attribute, Ratings } from '@/types';

type Props = {
  attribute: Attribute,
  ratings: Ratings
};

export default function Attribute(props: Props) {
  const { attribute, ratings } = props;
  return (
    <div>
      {attribute.name}
      <ul>
        {attribute.actions.map(action => (
          <li key={action}>{action}: {ratings[action] || 0}</li>
        ))}
      </ul>
    </div>
  );
}
