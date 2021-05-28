import log4js from 'log4js';
import moment from 'moment';
// import log4js from "log4js"/;
// export const log4j = log4js.configure({
// });
export const logger = log4js.configure({
    appenders: {
        // frame: {
        //     type: 'file',
        //     filename: './logs/framework.log'
        // },

        access: {
            'type': 'dateFile',
            'filename': 'log/access.log',
            'pattern': '-yyyy-MM-dd',
            'category': 'http'
        },

        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%d] (%f{1}:%l:%o) [%p] - %m%n'
            }
        },

        all: {
            type: 'file',
            filename: `./logs/all_${moment().format("MMMM_Do_YYYY_h_mm_ss_a")}.log`,
            layout: {
                type: 'pattern',
                pattern: '[%d] [%f{1}:%l:%o] [%z] [%p] %c - %m%n'
            }
        },

        errors: {
            type: 'file',
            filename: `./logs/errors_${moment().format("MMMM_Do_YYYY_h_mm_ss_a")}.log`,
            layout: {
                type: 'pattern',
                pattern: '[%d] [%f{1}:%l:%o] [%z] [%p] %c - %m%n%s'
            }
        },

        'onlyErrors': {
            type: 'logLevelFilter',
            appender: 'errors',
            level: 'error'
        }

    },
    categories: {
        default: {
            appenders: ['console', 'onlyErrors', 'all', 'access'],
            level: 'debug',
            enableCallStack: true
        },
        test: {
            appenders: ['onlyErrors', 'all'],
            level: 'debug',
            enableCallStack: true
        }
    }
});
