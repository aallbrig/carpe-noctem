const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    // devtool: 'source-map',
    devServer: {
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || '3000',
      contentBase: 'dist',
      compress: true,
      hot: true,
      inline: true,
      overlay: true
    },
    module: {
      rules: [
        { test: /\.js$/, use: 'source-map-loader' },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          enforce: 'pre',
          test: /\.ts(x)?$/,
          loader: 'tslint-loader',
          exclude: /(node_modules)/,
          options: {
            tsConfigFile: 'tsconfig.json',
            tslint: {
              emitErrors: true,
              failOnHint: true
            }
          }
        },
        {
          test: /\.ts(x)?$/,
          use: 'ts-loader',
          exclude: /(node_modules)/
        },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        {
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?name=fonts/[name].[ext]"
        },
        { test: /bootstrap\/dist\/js\/umd\//, use: 'imports?jQuery=jquery' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /pixi\.js/, use: 'expose-loader?PIXI' },
        { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
        { test: /p2\.js/, use: 'expose-loader?p2' }
      ]
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ],
      alias: {
        'phaser': phaser,
        'pixi': pixi,
        'p2': p2,
      }
    },
    plugins: [
      ...[
        new CopyWebpackPlugin([
          {
            from: path.join(__dirname, 'src/assets/*'),
            to: path.join(__dirname, 'dist/assets'),
            flatten: true
          }
        ]),
        new HtmlWebpackPlugin({
          title: 'Carpe Noctem | Static'
        }),
        new webpack.HotModuleReplacementPlugin()
        // TODO: selectively do this if process.env.ENV != 'dev'
        // new webpack.optimize.OccurrenceOrderPlugin,
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
      ],
      ...(
        (((process || {}).env || {}).NODE_ENV || '').toLowerCase() === 'production' ?
          (() => {
            console.log('production!');
            return [
              new webpack.DefinePlugin({
                'process.env': {
                  NODE_ENV: JSON.stringify('production')
                }
              }),
              new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                comments: false,
                sourceMap: false
              }),
              new webpack.optimize.OccurrenceOrderPlugin
            ];
          })()
          : []
      )
  ]
};
