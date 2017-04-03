var webpack = require('webpack');
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
	
	return webpackMerge(commonConfig(), {
		plugins: [
	      new webpack.DefinePlugin({
		        'process.env': {
		          'ENV': JSON.stringify(metadata.ENV),
		          'NODE_ENV': JSON.stringify(metadata.ENV),
		          'HMR': HMR,
		          'API_URL': JSON.stringify(process.env.API_URL)
		        }
      		})
		]
	});
}