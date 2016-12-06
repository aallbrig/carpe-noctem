const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    context: `${__dirname}/src`,
    entry: `${__dirname}/src/index.js`,
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    devServer: {
      outputPath: `${__dirname}/dist`
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: `${__dirname}/src/**/*.html`, to: `${__dirname}/dist` },
        { from: `${__dirname}/src/assets/**/*`, to: `${__dirname}/dist` }
      ]),
      new LiveReloadPlugin({port: 35729, hostname: 'localhost'})
    ]
};
