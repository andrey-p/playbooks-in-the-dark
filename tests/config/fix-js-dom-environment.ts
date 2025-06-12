import JSDOMEnvironment from 'jest-environment-jsdom';

export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args);

    // fixes no structuredClone in jsdom
    // https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
    this.global.structuredClone = structuredClone;

    // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(this.global, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {}
      })
    });
  }
}
