module.exports = {
  // Specify the paths to the directories containing your test files
  roots: ["<rootDir>/src"],

  // Jest will look for files with these extensions when running tests
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],

  // Jest will ignore these directories when searching for test files
  testPathIgnorePatterns: ["/node_modules/"],

  // Define transformations that Jest should apply to your code before running tests
  transform: {
    "^.+\\.js$": "babel-jest", // Transform JavaScript files using babel-jest
    "^.+\\.css$": "<rootDir>/fileTransformer.js", // Ignore CSS files
  },

  // Define modules that should be mocked during testing
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg|mp4)$": "<rootDir>/__mocks__/fileMock.js", // Mock image and mp4 files
  },

  // Ignore specific modules or files from transformation
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Ignore all node_modules except axios
  ],

  // Specify the test environment
  testEnvironment: "jsdom",

  // Specify the file extensions Jest should consider when running tests
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
};
