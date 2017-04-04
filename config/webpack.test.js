var webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const API_URL = process.env.API_URL = 'localhost';
const HMR = process.argv.join('').indexOf('hot') > -1;
const metadata = {
  host: 'localhost',
  API_URL: API_URL,
  port: 8080,
  ENV: ENV,
  HMR: HMR
};

var path = require('path');
var _root = path.resolve(__dirname + '/..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function() {
	return {
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
		target: 'node',
		devtool: 'inline-source-map',
		resolve: {
			extensions: ['','.js', '.ts']
		},
		module: {
			loaders: [
	        {
	          test: /\.ts$/,
            exclude: ['./web/src/helpers/test/**/*.ts'],
	          loaders: ['awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}', 'angular2-template-loader']
	        },
	        {
	          test: /\.(ico|icns)$/,
	          loaders: ['file-loader?name=[name].[ext]?'],
	          include: ['./web/assets']
	        },
	        {
	          test: /\.svg$/,
	          loaders: ['svg-url-loader']
	        },
	        // Support for *.json files.
	        {
	          test: /\.json$/,
	          loader: 'json-loader'
	        },
	        {
	          test: /\.css$/,
	          exclude: root('web', 'src'),
	          loaders: ['style-loader', 'css-loader']
	        },
	        {
	          test: /\.css$/,
	          include: root('web', 'src'),
	          loaders: ['raw']
	        },
	        /*
	         * sass loader support for *.scss files (styles directory only)
	         * Loads external sass styles into the DOM, supports HMR
	         *
	         */
	        {
	          test: /\.scss$/,
	          loaders: ['raw', 'sass-loader'],
	          include: root('web', 'src')
	        },

	        {
	          test: /\.scss$/,
	          loaders: ['style-loader', 'css-loader', 'sass-loader'],
	          exclude: root('web', 'src')
	        },
	        //component html files
	        {
	          test: /\.html$/,
	          loader: 'raw-loader',
	          include: [root('web', 'src')]
	        },

	        {
	          enforce: 'post',
	          test: /\.(js|ts)$/,
	          loader: 'istanbul-instrumenter-loader',
	          include: root('src'),
	          exclude: [
	            /\.(e2e|spec)\.ts$/,
	            /node_modules/
	          ]
	        }
	      ]
	  },
		node: {
	      global: true,
	      process: false,
	      crypto: 'empty',
	      module: false,
	      clearImmediate: false,
	      setImmediate: false
	    }
	};
}
