module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/router/*.js',
    '!babel.config.js',
    '!jest.config.js',
    '!postcss.config.js',
    '!coverage/block-navigation.js',
    '!coverage/prettify.js',
    '!coverage/sorter.js',
    '!src/registerServiceWorker.js'
  ],
  coverageReporters: ['html', 'text']
}
