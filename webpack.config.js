const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  return {
    target: 'web',
    entry: {
      content_scripts: './src/content-scripts/content_scripts.tsx',
      popup: './src/popup/popup.tsx',
      options: './src/options/options.tsx',
      background: './src/background.tsx'
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
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader']
        },
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }
      ],
    },
    resolve: {
      extensions: ['*', '.tsx', '.ts', '.js', '.css', '.json']
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
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            },
          },
          extractComments: false
        })
      ]
    }
  };
};