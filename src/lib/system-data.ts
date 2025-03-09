import { readFileSync } from 'fs';

export const getJson = function (system: string, playbook: string) {
  const data = readFileSync(
    `${process.cwd()}/src/data/${system}/${playbook}.json`,
    { encoding: 'utf8' }
  );

  return JSON.parse(data);
};
