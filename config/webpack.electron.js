var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const API_URL = process.env.API_URL = 'localhost';
const HMR = process.argv.join('').indexOf('hot') > -1;
const metadata = {
  host: 'localhost',
  API_URL: API_URL,
  port: 8080,
  ENV: ENV,
  HMR: HMR
};

module.exports = function() {
	var baseConfig = commonConfig();
	baseConfig.output = {
      path: __dirname + "/../dist/electron",
      filename: "[name].js"
    };
	baseConfig.plugins = [
    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect'
    }),
    new CopyWebpackPlugin([
        { from: './src/client/assets', to: 'assets' },
        { from: './src/client/bootstrap/css/bootstrap.min.css', to : 'bootstrap.min.css'},
        { from: './src/client/app/package.json', to: 'package.json' }
      ]),
    new HtmlWebpackPlugin({
      template: './src/client/index.desktop.html',
      minify: {
        removeComments: true,
        minifyJS: true
      }
    })
  ];
	var options = webpackMerge( baseConfig, {
	  entry: {
	    "main.desktop":"./src/client/app/main.desktop.ts"
    },
		plugins: [
	      new webpack.DefinePlugin({
		        'process.env': {
		          'ENV': JSON.stringify(metadata.ENV),
		          'NODE_ENV': JSON.stringify(metadata.ENV),
		          'HMR': HMR,
		          'API_URL': JSON.stringify(process.env.API_URL)
		        }
      		})
		],
    /*module: {
	    noParse:['ws', 'devtron']
    },
    externals: [
	    'ws','devtron'
    ],*/
		target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false
    }
	});
	return options;
};
