const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: '[name]-[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'https://nivlaoh.github.io/kushi-dashboard/'
  },
});
