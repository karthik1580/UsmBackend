let env = process.env.NODE_ENN || 'development';
let config = require('./config.json');
let envConfig = config[env];
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);