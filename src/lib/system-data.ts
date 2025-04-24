import fs from 'fs/promises';
import { NotFoundError } from './errors';
import systemsJson from '@/systems/systems.json';

// only allow alphanumeric and - filenames
const validFileRe = /^[a-zA-Z0-9-]+$/;

export const getJson = async (
  system: string,
  fileType: string,
  entity: string | undefined = undefined
): Promise<object> => {
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
    data = await fs.readFile(`${process.cwd()}/src/systems/${path}`, {
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

export const getSystemText = async (
  system: string,
  locale: string
): Promise<object> => {
  let data;
  const path = `${process.cwd()}/src/systems/${system}/lang/${locale}.json`;

  if (!system.match(validFileRe) || !locale.match(validFileRe)) {
    throw new NotFoundError(`Couldn't find system JSON file: ${path}`);
  }

  try {
    data = await fs.readFile(path, { encoding: 'utf8' });
  } catch {
    throw new NotFoundError(
      `Couldn't find system translations JSON file: ${path}`
    );
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    throw new Error(`Error parsing ${path}`, { cause: e });
  }
};

export const getAllSystemsText = async (locale: string): Promise<object> => {
  const systemPromises = systemsJson.systems.map(async ({ id }) => {
    return getSystemText(id, locale);
  });

  const text = (await Promise.all(systemPromises)).reduce((acc, data) => {
    return {
      ...acc,
      ...data
    };
  }, {});

  return text;
};
