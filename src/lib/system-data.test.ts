import { getJson } from './system-data';
import { NotFoundError } from './errors';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('system-data', () => {
  // set up fs.readFileSync so it can be mocked for the one test
  beforeEach(() => {
    const fs = jest.requireActual('fs');

    jest
      .mocked(readFileSync)
      .mockImplementation((...args) => fs.readFileSync(...args));
  });

  describe('getJson', () => {
    test('gets existing JSON file OK', () => {
      expect(getJson('bitd', 'system')).toMatchObject({
        id: 'bitd'
      });

      expect(getJson('bitd', 'scoundrel')).toMatchObject({
        id: 'scoundrel'
      });

      expect(getJson('bitd', 'scoundrel', 'cutter')).toMatchObject({
        id: 'cutter'
      });
    });

    test("throws meaningful error if JSON file doesn't exist", () => {
      expect(() => getJson('bitd', 'sostem')).toThrow(NotFoundError);
      expect(() => getJson('bitd', 'scoundrel', 'cotter')).toThrow(
        NotFoundError
      );
    });

    test("throws meaningful error if JSON file doesn't parse correctly", () => {
      jest.mocked(readFileSync).mockImplementation(() => {
        return '{ "foo": bar }';
      });

      expect(() => getJson('bitd', 'system')).toThrow(/Error parsing/);
    });

    test('throws if user attempts shenanigans', () => {
      expect(() => getJson('../../..', 'package')).toThrow();
      expect(() => getJson('bitd', '../../../package')).toThrow();
      expect(() =>
        getJson('bitd', 'scoundrel', '../../../../package')
      ).toThrow();
    });
  });
});
