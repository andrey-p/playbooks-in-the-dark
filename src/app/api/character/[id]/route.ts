import { getCharacter, saveCharacter } from '@/lib/store';

type Params = {
  params: Promise<{ id: string }>
};

export async function GET(_: Request, params: Params) {
  const { id } = await params.params;

  const character = await getCharacter(id);

  return new Response(JSON.stringify(character));
}

export async function PUT(request: Request, params: Params) {
  // TODO validate
  const data = await request.json();
  const { id } = await params.params;

  data.id = id;

  const character = await saveCharacter(data);

  return new Response(JSON.stringify(character));
}
