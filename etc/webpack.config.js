'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssConf = require('./cmrh.conf.js');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [path.join(__dirname, '../shared/main.js')],
    vendor: ['moment', 'classnames', 'react-redux', 'react', 'lodash',
            'redux', 'react-addons-shallow-compare', 'react-router-redux', 'react-router']
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: './'
  },
  externals: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../shared/index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-3"]
      }
    }, { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff" },
       { test: /\.(jpe?g|gif|png|svg|ttf|eot|ico|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: "file-loader" },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?localIdentName=' + cssConf.generateScopedName, 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader',
                                        'css-loader!postcss-loader?modules&localIdentName=' + cssConf.generateScopedName)
    }
    ]
  },

  postcss: function() {
      return [require('autoprefixer')];
  },

  resolve: {
      alias: {
          moment: 'moment/moment.js'
      }
  }
};
