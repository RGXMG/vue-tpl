const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = {
  devServer: {
    // show any error to view
    overlay: {
      warnings: false,
      errors: true,
    },
    // open mock server
    before: require('./mock/mock-server.js'),
  },
  configureWebpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@api': resolve('./src/api'),
      '@core': resolve('./src/core'),
      '@components': resolve('./src/components'),
      '@UIComponents': resolve('./src/components/UI'),
      '@layout': resolve('./src/layout'),
      '@constants': resolve('./src/constants'),
      '@enums': resolve('./src/enums'),
      '@icons': resolve('./src/icons'),
      '@router': resolve('./src/router'),
      '@store': resolve('./src/store'),
      '@utils': resolve('./src/utils'),
      '@config': resolve('./src/config'),
      '@styles': resolve('./src/styles'),
      '@views': resolve('./src/views'),
    };
  },
  chainWebpack(config) {
    // set svg-sprite-loader and add svgo-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(() => ({
        externalConfig: resolve('icons/svgo-config.yml'),
      }))
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
  },
};
