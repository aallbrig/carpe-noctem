const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    context: `${__dirname}/src`,
    entry: `${__dirname}/src/index.tsx`,
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
      outputPath: `${__dirname}/dist`
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        { test: /pixi.js/, loader: 'script' },
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
      ],
      preLoaders: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    resolve: {
      root: [
        path.resolve('./src/components'),
        path.resolve('./src/actions'),
        path.resolve('./src/reducers'),
        path.resolve('./src/stores')
      ],
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        'phaser': phaser,
        'pixi.js': pixi,
        'p2': p2,
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: `${__dirname}/src/**/*.html`, to: `${__dirname}/dist` },
        { from: `${__dirname}/src/assets/**/*`, to: `${__dirname}/dist` }
      ]),
      new LiveReloadPlugin({port: 35729, hostname: 'localhost'})
    ]
};
