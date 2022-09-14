const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    content_scripts: './src/content-scripts/ContentScripts.js',
    popup: './src/popup/Popup.js',
    options: './src/options/Options.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.json']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: path.resolve(__dirname, 'build'),
          force: true
        },
        {
          from: './src/styles.css',
          to: path.resolve(__dirname, 'build'),
          force: true
        },
        {
          from: './src/popup/popup.html',
          to: path.resolve(__dirname, 'build'),
          force: true
        },
        {
          from: './src/options/options.html',
          to: path.resolve(__dirname, 'build'),
          force: true
        },
        {
          from: './public/',
          to: path.resolve(__dirname, 'build'),
          force: true
        }
      ]
    })
  ]
};