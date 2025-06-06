module.exports = {
  // The environment JSDOM simulates a browser environment for testing React components
  testEnvironment: 'jest-environment-jsdom',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest.setup.js'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    //     // This handles module imports for CSS files. You can extend it for other file types like images.
    //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/app/$1',
  },

  // Tells Jest to use babel-jest for transforming .js, .jsx, .ts, and .tsx files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
