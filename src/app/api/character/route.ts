import { saveCharacter } from '@/lib/store';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  // TODO validate
  const data = await request.json();
  const id = nanoid();

  data.id = id;

  const character = await saveCharacter(data);
  return new Response(JSON.stringify(character));
}
