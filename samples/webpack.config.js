const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    spreadsheet: './spreadsheet.js'
  },
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].bundle.js',
    publicPath: '/spreadsheet/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    publicPath: '/dist/'
  }
}
