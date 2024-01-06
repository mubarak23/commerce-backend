const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const config = {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 100000,
    maxAssetSize: 100000
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'public', 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
};

module.exports = config;
