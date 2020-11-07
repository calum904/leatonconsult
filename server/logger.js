/**
 * @file logger.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Logging capability
 */
const winston = require("winston");

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = winston.createLogger({
    "level": "info",
    "format": winston.format.combine(
            winston.format.colorize(),
            winston.format.label({"label": "JTRally" }),
            winston.format.timestamp(),
            logFormat
        ),
    "default-meta": { "user-service": "JTRally" },
    "transports": [new winston.transports.Console()]
});

module.exports = logger;
