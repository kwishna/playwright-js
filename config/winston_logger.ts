import {format, addColors, createLogger, transports} from 'winston';
import moment from 'moment';

addColors({
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
})

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
        format.prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File(
            {
                filename: `error_${moment().format("MMMM_Do_YYYY_h_mm_ss_a")}.log`,
                level: 'error',
                dirname: './logs/',
                maxsize: 1000,
                maxFiles: 5
            }
        ),
        new transports.File(
            {
                filename: `combined_${moment().format("MMMM_Do_YYYY_h_mm_ss_a")}.log`,
                dirname: './logs',
                maxsize: 1000,
                maxFiles: 5
            }
        ),
        new transports.Console(),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}