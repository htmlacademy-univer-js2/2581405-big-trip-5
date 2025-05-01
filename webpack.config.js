const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
      template: './src/index.html',
      minify: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src',
          to: '',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
}
