import { z } from 'zod';
import PropsSchema, { Contact as ContactSchema } from './contacts.schema';
import Contact from './contact';

type Props = z.infer<typeof PropsSchema>;
type ContactType = z.infer<typeof ContactSchema>;

export default function Contacts(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { customLabel, contacts } = playbookProps;

  const onRelationshipUpdate = (id: string, value: number) => {
    onUpdate({
      ...userValue,
      [id]: value
    });
  };

  return (
    <div>
      <h3>{customLabel || moduleDefinition.label}</h3>
      <ul>
        {contacts.map((contact: ContactType) => (
          <li key={contact.id}>
            <Contact
              contact={contact}
              relationship={userValue[contact.id]}
              onRelationshipUpdate={onRelationshipUpdate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
