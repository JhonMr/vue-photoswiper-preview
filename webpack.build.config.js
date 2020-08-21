const path = require('path');
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
module.exports = {
  entry:'./src/install.js',
  output:{
    path: path.resolve(__dirname, './lib'),
    filename:'index.js',
    library: 'vue-photoswiper-preview',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader'
        ]

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: '/',
          publicPath: './'
        }
      }
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  externals: {
    Vue: 'vue'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
          //  warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  devtool: '#source-map'
}
