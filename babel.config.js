module.exports = {
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          // 目前只打算支持chrome
          browsers: ['chrome > 49'],
        },
      },
    ],
  ],
  plugins: [
    // 'module:@vue/babel-sugar-inject-h',
    'lodash',
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    // Adds syntax support for optional chaining (?.)
    '@babel/plugin-proposal-optional-chaining',
    // Adds syntax support for default value using ?? operator
    '@babel/plugin-proposal-nullish-coalescing-operator',
    // Adds syntax support for ESModule namespace export
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
