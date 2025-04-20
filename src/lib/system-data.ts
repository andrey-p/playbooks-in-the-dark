import { readFileSync } from 'fs';
import { NotFoundError } from './errors';

// only allow alphanumeric and - filenames
const validFileRe = /^[a-zA-Z0-9-]+$/;

export const getJson = function (
  system: string,
  fileType: string,
  entity: string | undefined = undefined
): object {
  let data: string;

  let path;

  if (typeof entity === 'string') {
    path = `${system}/${fileType}/${entity}.json`;

    if (!entity.match(validFileRe)) {
      throw new NotFoundError(`Couldn't find system JSON file: ${path}`);
    }
  } else {
    path = `${system}/${fileType}.json`;
  }

  if (!system.match(validFileRe) || !fileType.match(validFileRe)) {
    throw new NotFoundError(`Couldn't find system JSON file: ${path}`);
  }

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
    throw new Error(`Error parsing ${path}`, { cause: e });
  }
};
