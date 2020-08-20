const path = require('path');
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
module.exports = {
  entry:'./src/install.js',
  output:{
    path: path.resolve(__dirname, './lib'),
    filename:'index.js',
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
      /*{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          filename: '[name].[ext]'
        }
      }*/
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash].[ext]'
        }
      }
    ],
  },
  externals: {
    Vue: 'vue'
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
