var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var _root = path.resolve(__dirname + '/..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function () {
  var config = { };
    config.entry= {
      "app":"./src/client/app/main.ts"
    };
    config.output= {
      path: __dirname + "/../dist/webpack",
      filename: "[name].bundle.js"
    };
    config.module= {
      loaders: [
        {
          test: /\.ts$/,
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
          exclude: root('src/client', 'app'),
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.css$/,
          include: root('src/client', 'app'),
          loaders: ['raw-loader']
        },
        /*
         * sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          loaders: ['raw-loader', 'sass-loader'],
          include: root('src/client', 'app')
        },

        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: root('src/client', 'app')
        },
        //component html files
        {
          test: /\.html$/,
          loader: 'raw-loader',
          include: [root('src/client', 'app')]
        }
      ]
    };
    config.resolve= {
      extensions: ['.ts', '.js']
    };
    config.devServer= {
      contentBase: './src/client',
      historyApiFallback: true,
      quiet: false,
      stats: 'normal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };
  config.plugins = [
      new webpack.ProvidePlugin({
        Reflect: 'core-js/es7/reflect'
      }),
      new CopyWebpackPlugin([
        { from: './src/client/assets', to: 'assets' },
        { from: './src/client/bootstrap/css/bootstrap.min.css', to : 'bootstrap.min.css'}
      ]),
      new HtmlWebpackPlugin({
        template: './src/client/index.html',
        minify: {
          removeComments: true,
          minifyJS: true
        }
      })
    ];

  return config;
};
