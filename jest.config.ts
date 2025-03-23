import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  // fixes no structuredClone in jsdom
  // https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
  testEnvironment: './tests/config/fix-js-dom-environment.ts',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
