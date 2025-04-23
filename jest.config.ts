import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', './tests/config', __dirname],
  // fixes no structuredClone in jsdom
  // https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
  testEnvironment: './tests/config/fix-js-dom-environment.ts',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

export default async function getConfig() {
  return {
    ...(await createJestConfig(config)()),
    // https://next-intl.dev/docs/environments/testing#jest
    transformIgnorePatterns: ['node_modules/(?!next-intl)/']
  };
}
