import { getJson } from './system-data';
import { NotFoundError } from './errors';
import fs from 'fs/promises';

describe('system-data', () => {
  describe('getJson', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('gets existing JSON file OK', async () => {
      expect(await getJson('bitd', 'system')).toMatchObject({
        id: 'bitd'
      });

      expect(await getJson('bitd', 'scoundrel')).toMatchObject({
        id: 'scoundrel'
      });

      expect(await getJson('bitd', 'scoundrel', 'cutter')).toMatchObject({
        id: 'cutter'
      });
    });

    test("throws meaningful error if JSON file doesn't exist", () => {
      expect(() => getJson('bitd', 'sostem')).rejects.toThrow(NotFoundError);
      expect(() => getJson('bitd', 'scoundrel', 'cotter')).rejects.toThrow(
        NotFoundError
      );
    });

    test("throws meaningful error if JSON file doesn't parse correctly", () => {
      jest.spyOn(fs, 'readFile').mockImplementation(async () => {
        return '{ "foo": bar }';
      });

      expect(() => getJson('bitd', 'system')).rejects.toThrow(/Error parsing/);
    });

    test('throws if user attempts shenanigans', () => {
      expect(() => getJson('../../..', 'package')).rejects.toThrow();
      expect(() => getJson('bitd', '../../../package')).rejects.toThrow();
      expect(() =>
        getJson('bitd', 'scoundrel', '../../../../package')
      ).rejects.toThrow();
    });
  });
});
