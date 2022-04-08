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
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    }
  }
};
