import { z } from 'zod';
import BaseModuleDefinition from './base-module-definition';

const PlaybookDefinition = z.object({
  id: z.string(),
  name: z.string(),
  playbooks: z.array(z.string()),
  layout: z.array(z.array(z.string().or(z.array(z.string())))),
  modules: z.record(z.string(), BaseModuleDefinition)
});

export default PlaybookDefinition;
