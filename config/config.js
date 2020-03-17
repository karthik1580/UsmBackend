let config = require('./config.json');
let env = 'development';
let envConfig = config[env];
console.log('envConfig-----', envConfig.tokenLife);

module.exports = envConfig