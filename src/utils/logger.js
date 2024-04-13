import { createLogger, format, transports } from 'winston';

const { combine, printf } = format;

const customFormat = printf(({ level, message }) => {
  return `${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(customFormat),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
