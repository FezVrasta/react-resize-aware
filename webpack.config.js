var webpack = require('webpack')
var Path = require('path')

module.exports = {
  entry: './src/index.js',

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2',
    path: Path.resolve(__dirname, 'dist'),
    filename: 'ResizeAware.js'
  },

  externals: {
    react: 'react'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        stage: 2,
        loose: 'all'
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
