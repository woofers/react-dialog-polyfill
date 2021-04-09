const path = require('path')
const nodeExternals = require('webpack-node-externals')
const json = require('./package.json')
const getPath = path => path.substring(0, path.lastIndexOf('/'))
const getFile = path => path.substring(path.lastIndexOf('/') + 1)
const mode = process.env.NODE_ENV
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    new ESLintPlugin({
      failOnWarning: true,
      failOnError: true
    })
  ],
  entry: `./${json.src}`,
  output: {
    filename: `${json.name}.js`,
    path: path.resolve(__dirname, 'lib'),
    library: json.name,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: [nodeExternals(), 'react'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
