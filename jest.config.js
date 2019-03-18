// here we configure jest, our javascript test runner

module.exports = {
  // point at settings in the ts-jest npm module
  preset: 'ts-jest',
  // map certain file types to mocks
  // we don't want to actually import images/styles/electron/etc into the tests
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/tests/mocks/styleMock.js',
    '^electron$': '<rootDir>/node_modules_stub/electron'
  },
  // setupFiles runs once per test file
  // here we use it to polyfill Object.values()
  setupFiles: ['<rootDir>/tests/mocks/objectValuesPolyFill.js'],
  // pattern to match for files containing tests
  testMatch: ['**/*.tests.(ts|tsx)'],
  // output the results in teamcity format
  testResultsProcessor: 'jest-teamcity-reporter'
  // we can collect code coverage from source files
  // collectCoverageFrom: ['src/*.(ts|tsx)', 'src/**/*.(ts|tsx)']
};
