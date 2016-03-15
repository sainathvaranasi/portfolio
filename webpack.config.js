require('es6-shim');
var webpack = require('webpack');

module.exports = {
  devtool: "cheap-source-map",
  entry: {
    app: './app/main.ts',
    vendor: [
      'zone.js/dist/zone-microtask',
      'zone.js/dist/long-stack-trace-zone',
      'reflect-metadata',
      'angular2/platform/browser',
      'rxjs',
      'angular2/core',
      'angular2/router',
      'angular2/http']
  },
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new webpack.optimize.DedupePlugin()
  ]
};