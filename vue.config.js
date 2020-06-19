const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = {
  configureWebpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@api': resolve('./src/api'),
      '@components': resolve('./src/components'),
      '@UIComponents': resolve('./src/components/UI'),
      '@layout': resolve('./src/layout'),
      '@constants': resolve('./src/constants'),
      '@enums': resolve('./src/enums'),
      '@router': resolve('./src/router'),
      '@store': resolve('./src/store'),
    };
  },
};
