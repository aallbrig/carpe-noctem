const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

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
      overlay: true
    },
    module: {
      rules: [
        { test: /\.js$/, use: 'source-map-loader' },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'env'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
        },
        { test: /\.ts(x)?$/, use: 'ts-loader' },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        {
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?name=fonts/[name].[ext]"
        },
        { test: /bootstrap\/dist\/js\/umd\//, use: 'imports?jQuery=jquery' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ]
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: path.join(__dirname, 'src/assets/*'), to: path.join(__dirname, 'dist') },
        { from: path.join(__dirname, 'src/*.html'), to: path.join(__dirname, 'dist') }
      ]),
      new webpack.HotModuleReplacementPlugin()
      // TODO: selectively do this if process.env.ENV != 'dev'
      // new webpack.optimize.OccurrenceOrderPlugin,
      // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ]
};
