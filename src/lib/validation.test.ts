import { validateUserData } from './validation';

describe('validation', () => {
  describe('validateUserData', () => {
    it('passes with no data filled out yet', () => {
      const data = {
        id: 'asdf',
        systemId: 'asdf',
        playbookId: 'asdf'
      };

      validateUserData(data);
    });
    it('passes with valid data filled out', () => {
      const data = {
        id: 'asdf',
        systemId: 'asdf',
        playbookId: 'asdf',
        someTextField: 'asdfasdfsadf',
        someTracker: 123,
        ratings: {
          actionRatings: {
            finesse: 2,
            skirmish: 3,
            attune: 1
          },
          attributeXp: {
            insight: 5
          }
        }
      };

      validateUserData(data);
    });
    it('fails with basic fields missing', () => {
      const data = {
        id: 'asdf',
        playbookId: 'asdf',
        someTextField: 'asdfasdfsadf',
        someTracker: 123,
        ratings: {
          actionRatings: {
            finesse: 2,
            skirmish: 3,
            attune: 1
          },
          attributeXp: {
            insight: 5
          }
        }
      };

      expect(() => {
        // @ts-expect-error - I know, TS
        validateUserData(data);
      }).toThrow();
    });
    it('fails with basic fields missing', () => {
      const data = {
        id: 'asdf',
        systemId: 'asdf',
        playbookId: 'asdf',
        someTextField: 'asdfasdfsadf',
        someTracker: 123,
        ratings: {
          actionRatings: {
            finesse: 2,
            skirmish: 3,
            attune: 1
          },
          attributeXp: {
            insight: 5
          }
        },
        noModule: {
          willHave: {
            thisStructure: 'i hope'
          }
        }
      };

      expect(() => {
        validateUserData(data);
      }).toThrow();
    });
    it('fails with really really large bits of data', () => {
      const data = {
        id: 'asdf',
        systemId: 'asdf',
        playbookId: 'asdf',
        foo: 'all work and no play makes jack a dull boy'.repeat(500)
      };

      expect(() => {
        validateUserData(data);
      }).toThrow();
    });
  });
});
