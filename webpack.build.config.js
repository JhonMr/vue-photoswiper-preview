const path = require('path');
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry:{
    'vue-photoswipe-preview':'./src/index.js',
    index: './src/install.js',
  },//打包入口文件名
  output:{
    path: path.resolve(__dirname, 'lib'),
    filename:'[name].js',
    library: 'vue-photoswipe-preview',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module:{
    rules:[
      {
        test:/\.js?$/i,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
        ]

      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          filename: '[name].[ext]'
        }
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
  devtool:'none'
}
