/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  presets: ['ts-jest', "@babel/preset-react"],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/"
  ],
  plugins: [
    "'@babel/preset-plugin-transform-modules-commonjs"
  ],
  moduleNameMapper:{
    "\\.(css|sass)$": "identity-obj-proxy",
    "uuid": require.resolve('uuid'),
  },
};

