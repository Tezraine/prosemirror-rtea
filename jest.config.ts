import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'projects/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/*.spec.ts',
    '!**/node_modules/**',
  ],
};

export default config;
