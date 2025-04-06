import { getJson } from './system-data';
import { NotFoundError } from './errors';
import { readFileSync } from 'fs';

// set up fs.readFileSync so it can be mocked for the one test
jest.mock('fs', () => {
  const fs = jest.requireActual('fs');

  return {
    readFileSync: jest.fn((...args) => fs.readFileSync(...args))
  };
});

describe('system-data', () => {
  describe('getJson', () => {
    test('gets existing JSON file OK', () => {
      expect(getJson('bitd', 'system')).toMatchObject({
        name: 'Blades in the Dark'
      });
    });

    test("throws meaningful error if JSON file doesn't exist", () => {
      expect(() => getJson('bitd', 'sostem')).toThrow(NotFoundError);
    });

    test("throws meaningful error if JSON file doesn't parse correctly", () => {
      jest.mocked(readFileSync).mockImplementation(() => {
        return '{ "foo": bar }';
      });

      expect(() => getJson('bitd', 'system')).toThrow(/Error parsing/);
    });
  });
});
