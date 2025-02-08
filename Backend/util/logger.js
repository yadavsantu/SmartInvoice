const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize, printf } = format;


const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" })), // Ensuring timestamp for all logs
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleLogFormat),
    }),
    new transports.File({
      filename: "app.log",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()), 
    }),
  ],
});

module.exports = logger;
