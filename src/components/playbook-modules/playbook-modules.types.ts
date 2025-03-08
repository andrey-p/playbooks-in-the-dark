import type { PlaybookModule } from '@/types';

export type SharedModuleProps<T> = {
  systemModuleData: PlaybookModule;
  value: T;
  onUpdate: (value: T) => void
};
