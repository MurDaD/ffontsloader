/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/index.ts',
    '!**/*.d.ts',
    '!**/*.spec.ts',
    ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    }
  }
};
