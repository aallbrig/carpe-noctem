const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BowerResolvePlugin = require('bower-resolve-webpack-plugin');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
// Phaser plugins
const bowerComponents = path.join(__dirname, '/bower_components');
const slickUi = path.join(bowerComponents, 'slick-ui/src/Plugin.js');
console.log('slick ui path', slickUi);
const ezGui = path.join(bowerComponents, 'ezgui');
const kenneyTheme = path.join(ezGui, 'assets/kenney-theme');

const EXCLUDE = /(node_modules|bower_components)/;
// alias, for easier to read JSON blocks
const exclude = EXCLUDE;

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
        { test: /\.exec\.js$/, use: [ 'script-loader' ] },
        { test: /\.js$/, use: 'source-map-loader' },
        { test: /\.js$/, exclude, loader: 'babel-loader' },
        {
          enforce: 'pre',
          test: /\.ts(x)?$/,
          loader: 'tslint-loader',
          exclude,
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
          exclude
        },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        { test: /bootstrap\/dist\/js\/umd\//, use: 'imports?jQuery=jquery' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: require.resolve(pixi), use: 'expose-loader?PIXI' },
        { test: require.resolve(phaser), use: 'expose-loader?Phaser' },
        // { test: require.resolve(slickUi), use: 'expose-loader?SlickUI,Phaser.Plugin.SlickUI=SlickUIii' },
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
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?name=fonts/[name].[ext]"
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
      plugins: [new BowerResolvePlugin()],
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
      descriptionFiles: ['package.json', 'bower.json'],
      mainFields: ['browser', 'main'],
      modules: [
        path.join(__dirname, 'src'),
        'node_modules',
        'bower_components'
      ],
      alias: {
        'phaser': phaser,
        'pixi': pixi,
        'p2': p2,
        'slick-ui': (() => {
          console.log(
            'slick-ui will resolve to',
            slickUi
          );
          return slickUi
        })(),
        'kenney-theme': kenneyTheme
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
