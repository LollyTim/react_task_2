const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const fs = require('fs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.normalize(paths.build),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.normalize(paths.build),
    index: '/',
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    host: 'test.manaknightdev.com',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../localhost+2.pem')),
    },
    noInfo: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name][local]_[hash:base64:5]',
              },
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        include: /\.module\.css$/i,
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        exclude: /\.module\.css$/i,
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
