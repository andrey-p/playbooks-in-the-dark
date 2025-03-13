import { z } from 'zod';

const UserData = z
  .object({
    id: z.string().or(z.undefined()),
    systemId: z.string(),
    playbookType: z.string(),
    playbookId: z.string()
  })
  .and(z.record(z.string(), z.unknown()));

export default UserData;
