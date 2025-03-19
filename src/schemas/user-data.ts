import { z } from 'zod';

const UserData = z
  .object({
    id: z.string().or(z.undefined()),
    systemId: z.string(),
    playbookType: z.string(),
    playbookId: z.string()
  })
  .catchall(z.any());

export default UserData;
