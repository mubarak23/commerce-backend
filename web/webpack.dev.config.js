const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '..', 'public', 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   inject: true,
    //   template: path.resolve(__dirname, 'index.html'),
    // }),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   port: 3000,
  //   writeToDisk: true,
  //   proxy: {
  //     '/': 'http://localhost:8080'
  //   }
  // },
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
