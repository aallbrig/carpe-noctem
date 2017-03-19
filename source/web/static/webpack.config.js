const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    context: `${__dirname}/src`,
    entry: `${__dirname}/src/index.tsx`,
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
      outputPath: `${__dirname}/dist`,
      compress: true,
      hot: true,
      overlay: true
    },
    module: {
      preLoaders: [
        { test: /\.js$/, loader: 'source-map-loader' }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { 
            presets: [ 
              'es2015' 
            ] 
          }
        },
        { test: /pixi.js/, loader: 'script' },
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { test: /\.less$/, loader: 'style!css!less' },
        {
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file?name=fonts/[name].[ext]"
        },
        { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
        { test: /\.css$/, loader: 'style!css' }
      ]
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      modulesDirectories: ['node_modules'],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: `${__dirname}/src/assets/*`, to: `${__dirname}/dist` },
        { from: `${__dirname}/src/index.html`, to: `${__dirname}/dist` }
      ]),
      new LiveReloadPlugin({port: 35729, hostname: 'localhost'}),
      // new webpack.optimize.OccurrenceOrderPlugin,
      // new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new CheckerPlugin()
    ]
};
