import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",  // Default log level
  format: format.combine(
    format.timestamp(),  // Adds a timestamp to logs
    format.errors({ stack: true }),  // Include stack trace
    format.splat(),  // Supports string interpolation
    format.json()  // Output logs in JSON format
  ),
  transports: [
    // Log to console
    new transports.Console({
      format: format.combine(
        format.colorize(),  // Makes the console output colorful
        format.simple()  // Simpler log format for console
      ),
    }),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});


if (process.env.NODE_ENV === 'production') {
  logger.level = 'warn';
}

export default logger;
