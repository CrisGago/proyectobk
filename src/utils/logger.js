import winston from "winston";
import config from "../config/config.js";

// Niveles de error estándar
const levels = {
  error: 0, // más importante
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6   // menos importante
};

const developmentLogger = winston.createLogger({
  levels,
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ level: 'error', filename: 'logs/errors.log' })
  ]
});

const productionLogger = winston.createLogger({
  levels,
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ level: 'error', filename: 'logs/errors.log' })
  ]
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;
export default logger;
