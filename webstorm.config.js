'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('./src'),
      '@api': resolve('./src/api'),
      '@components': resolve('./src/components'),
      '@UIComponents': resolve('./src/components/UI'),
      '@layout': resolve('./src/layout'),
      '@constants': resolve('./src/constants'),
      '@enums': resolve('./src/enums'),
      '@router': resolve('./src/router'),
      '@store': resolve('./src/store'),
      '@icons': resolve('./src/store'),
      '@utils': resolve('./src/utils'),
      '@config': resolve('./src/config'),
      '@styles': resolve('./src/styles'),
    },
  },
};
