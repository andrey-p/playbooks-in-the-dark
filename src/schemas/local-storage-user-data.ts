import { z } from 'zod';

const LocalStorageUserData = z.object({
  id: z.string().or(z.undefined()),
  systemId: z.string(),
  playbookType: z.string(),
  playbookId: z.string(),
  name: z.string().optional(),
  modules: z
    .object({
      name: z
        .object({
          text: z.string()
        })
        .optional()
    })
    .optional(),
  description: z.string().optional()
});

export default LocalStorageUserData;
