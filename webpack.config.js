switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')();
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')();
    break;
  case 'electron':
    module.exports = require('./config/webpack.electron')();
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')();
}