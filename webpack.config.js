const path = require('path')
const nodeExternals = require('webpack-node-externals')
const json = require('./package.json')
const getPath = path => path.substring(0, path.lastIndexOf('/'))
const getFile = path => path.substring(path.lastIndexOf('/') + 1)
const mode = process.env.NODE_ENV
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

module.exports = {
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
  entry: `./${json.src}`,
  output: {
    filename: `${json.name}.js`,
    path: path.resolve(__dirname, 'lib'),
    library: json.name,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader",
        options: {
          failOnWarning: true,
          failOnError: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
