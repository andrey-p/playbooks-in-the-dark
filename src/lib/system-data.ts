import { readFileSync } from 'fs';
import { NotFoundError } from './errors';

export const getJson = function (system: string, playbook: string): object {
  let data: string;

  const path = `${system}/${playbook}.json`;

  try {
    data = readFileSync(`${process.cwd()}/src/systems/${path}`, {
      encoding: 'utf8'
    });
  } catch {
    throw new NotFoundError(`Couldn't find system JSON file: ${path}`);
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    throw new Error(`Error parsing ${system}/${playbook}.json`, { cause: e });
  }
};
