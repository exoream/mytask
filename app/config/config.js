require('dotenv').config();
const winston = require('winston');

// Konfigurasi transport untuk winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});

class AppConfig {
    constructor() {
        this.SERVERPORT = process.env.SERVERPORT ? parseInt(process.env.SERVERPORT) : null;
        this.DBPORT = process.env.DBPORT ? parseInt(process.env.DBPORT) : null;
        this.DBHOST = process.env.DBHOST || null;
        this.DBUSER = process.env.DBUSER || null;
        this.DBPASS = process.env.DBPASS || null;
        this.DBNAME = process.env.DBNAME || null;
    }
}

function loadConfig() {
    const config = new AppConfig();

    console.log('SERVERPORT:', config.SERVERPORT);
    console.log('DBPORT:', config.DBPORT);
    console.log('DBHOST:', config.DBHOST);
    console.log('DBUSER:', config.DBUSER);
    console.log('DBPASS:', config.DBPASS);
    console.log('DBNAME:', config.DBNAME);

    if (!config.SERVERPORT || !config.DBPORT || !config.DBHOST || !config.DBUSER || !config.DBNAME) {
        logger.error('Config: Missing or invalid configuration values');
        return null;
    }

    return config;
}

function initConfig() {
    const config = loadConfig();

    if (!config) {
        logger.error('Config: Cannot start program, failed to load configuration');
        process.exit(1);
    }

    return config;
}


const config = {
  SERVERPORT: process.env.SERVERPORT ? parseInt(process.env.SERVERPORT) : 8080,
  DBPORT: process.env.DBPORT ? parseInt(process.env.DBPORT) : 3306,
  DBHOST: process.env.DBHOST || 'localhost',
  DBUSER: process.env.DBUSER || 'root',
  DBPASS: process.env.DBPASS || '',
  DBNAME: process.env.DBNAME || 'task',
};



module.exports = config;
