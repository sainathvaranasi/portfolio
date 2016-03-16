require('es6-shim');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/main.ts',
    vendor: './app/vendor.ts'
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
    new webpack.DefinePlugin({
      'NODE_ENV': '"production"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['RouterLink', 'NgFor', 'NgIf']
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]
};