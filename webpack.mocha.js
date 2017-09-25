/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      'mocha-loader!./test/index.js',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'testDist'),
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      include: [
        path.resolve(__dirname, './test/'),
        path.resolve(__dirname, './src/'),
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'TEST: Dijix Attestation' }),
  ],
  devServer: {
    contentBase: './testDist',
  },
  node: {
    fs: 'empty',
  },
};
