import { z } from 'zod';

const LocalStorageUserData = z.object({
  id: z.string().or(z.undefined()),
  systemId: z.string(),
  playbookType: z.string(),
  playbookId: z.string(),
  name: z.string(),
  description: z.string()
});

export default LocalStorageUserData;
