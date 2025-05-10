const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 1
        },
      },
    ],
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: false
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/css', to: 'css' },
        { from: 'public/fonts', to: 'fonts' },
        { from: 'public/img', to: 'img' }
      ],
    }),
  ],
}
