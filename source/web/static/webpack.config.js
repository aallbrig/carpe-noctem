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

const IS_PROD = (((process || {}).env || {}).NODE_ENV || '').toLowerCase() === 'production';

module.exports = {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
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
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
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
        { test: /p2\.js/, use: 'expose-loader?p2' },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        },
        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        },
        {
          test: /\.json$/,
          include: path.join(__dirname, 'src'),
          use: 'json-loader'
        }
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
        new webpack.EnvironmentPlugin({
          NODE_ENV: process.env.NODE_ENV || 'dev'
        }),
        new HtmlWebpackPlugin({
          title: 'Carpe Noctem | Static',
          template: 'src/index.template.ejs'
        })
      ],
      ...(IS_PROD ?
        [
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
            sourceMap: true
          }),
          new webpack.optimize.OccurrenceOrderPlugin()
        ]
        : [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.SourceMapDevToolPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
        ]
      )
  ]
};
