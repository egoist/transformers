var path = require('path')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()

module.exports = {
  entry: ['./client/index'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.[hash].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue'],
        exclude: [/node_modules/]
      }
    ]
  },
  vue: {
    postcss: [
      require('precss')
    ]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  plugins: [
    assetsPluginInstance
  ]
}
