const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'src')]
    }]
  }
};
