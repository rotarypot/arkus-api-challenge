const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] : ${info.level} , ${info.message}`)),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.File({
      maxsize: 2000000,
      maxFiles: 3,
      filename: `${__dirname}/api-log.log`
    })
  ]
})