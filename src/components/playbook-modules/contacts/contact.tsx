import { z } from 'zod';
import { useState } from 'react';
import { Contact as ContactSchema } from './contacts.schema';
import TriangleToggle from '@/components/toggles/triangle';

type ContactType = z.infer<typeof ContactSchema>;

type Props = {
  contact: ContactType;
  relationship?: number;
  onRelationshipUpdate: (id: string, value: number) => void;
};

export default function Contact(props: Props) {
  const { contact, relationship, onRelationshipUpdate } = props;
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <div>
      <TriangleToggle
        variant='up'
        filled={relationship === 1}
        highlighted={highlighted === 1}
        onMouseEnter={() => setHighlighted(1)}
        onMouseLeave={() => setHighlighted(null)}
        onClick={() => {
          onRelationshipUpdate(contact.id, relationship === 1 ? 0 : 1);
        }}
      />
      <TriangleToggle
        variant='down'
        filled={relationship === -1}
        highlighted={highlighted === -1}
        onMouseEnter={() => setHighlighted(-1)}
        onMouseLeave={() => setHighlighted(null)}
        onClick={() => {
          onRelationshipUpdate(contact.id, relationship === -1 ? 0 : -1);
        }}
      />
      {contact.name}
    </div>
  );
}
