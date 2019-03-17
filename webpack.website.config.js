'use strict';

// pull in the 'path' module from node
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// export the configuration as an object
module.exports = {
  // development mode will set some useful defaults in webpack
  mode: 'development',
  // the entry point is the top of the tree of modules.
  // webpack will bundle this file and everything it references.
  entry: './src/website/index.tsx',
  // we specify we want to put the bundled result in the matching out/ folder
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out/website')
  },
  target: 'electron-renderer',
  module: {
    // rules tell webpack how to handle certain types of files
    rules: [
      // at the moment the only custom handling we have is for typescript files
      // .ts and .tsx files get passed to ts-loader
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      { test: /\.jpe?g$|\.svg$|\.gif$|\.png$/i, loader: 'url-loader' },
      { test: /\.otf$|\.woff$|\.woff2$|\.eot$|\.ttf$/, loader: 'url-loader' },
      { test: /\.ico$|_icon\.png$/i, loader: 'url-loader' }
    ]
  },
  resolve: {
    // specify certain file extensions to get automatically appended to imports
    // ie we can write `import 'index'` instead of `import 'index.ts'`
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // This reads index.html from src, injects a <script> tag for index.js, and then copies it to the output dir
    new HtmlWebpackPlugin({
      template: 'src/website/index.html'
    })
  ]
};
