let env = 'development'; // 3000
let config = require('./config.json');
let envConfig = config[env];

module.exports = envConfig