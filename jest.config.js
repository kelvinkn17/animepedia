/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
  transformIgnorePatterns: [
    "node_modules/"
  ],
  moduleNameMapper:{
    "\\.(css|sass)$": "identity-obj-proxy",
  }
};

