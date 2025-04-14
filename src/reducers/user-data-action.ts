import { z } from 'zod';
import { getUnifiedUserValueSchema } from '@/components/playbook-modules/all-schemas';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unifiedUserValueSchema = getUnifiedUserValueSchema();

type Action =
  | {
      type: 'set_value';
      key: string;
      value: z.infer<typeof unifiedUserValueSchema>;
    }
  | {
      type: 'set_id';
      value: string;
    }
  | {
      type: 'set_share_id';
      value: string;
    };

export default Action;
