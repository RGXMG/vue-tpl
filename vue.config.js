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
      '@utils': resolve('./src/utils'),
      '@config': resolve('./src/config'),
      '@styles': resolve('./src/styles'),
    };
  },
  chainWebpack(config) {
    // set svg-sprite-loader and add svgo-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .test(/\.svg$/)
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap({
        externalConfig: resolve('icons/svgo-config.yml'),
      })
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // set svgo-loader
  },
};
