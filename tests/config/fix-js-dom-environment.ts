import JSDOMEnvironment from 'jest-environment-jsdom';

// fixes no structuredClone in jsdom
// https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args);

    this.global.structuredClone = structuredClone;
  }
}
