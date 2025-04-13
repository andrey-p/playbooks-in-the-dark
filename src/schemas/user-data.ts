import { z } from 'zod';

const UserData = z.object({
  id: z.string().or(z.undefined()),
  shareId: z.string().or(z.undefined()),
  systemId: z.string(),
  playbookType: z.string(),
  playbookId: z.string(),
  modules: z.record(z.string(), z.any())
});

export default UserData;
