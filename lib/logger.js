var winston = require('winston'),
    Logger = new winston.Logger(),
    defaultLogLevel = 'error';

function setLoggerLevel(params, callback) {
    var logLevel = params.level;
    if (logLevel !== 'silly' && logLevel !== 'info' && logLevel !== 'warn' && logLevel !== 'error') {
        return callback({
            status: 'not ok',
            msg: logLevel + ' is not a valid logging level'
        }, null);
    }
    Logger.remove(winston.transports.Console);

    Logger.add(winston.transports.Console, {
        timestamp: true,
        colorize: true,
        level: logLevel
    });

    Logger.info('Log level now set to ::', logLevel);
    if (callback) {
        return callback(null, {
            status: 'ok',
            msg: 'Updated Log Level :: ' + logLevel
        });
    }
}

function killLoggingForTests() {
    Logger.remove(winston.transports.Console);
}

if (!process.env.FH_ENV) {
    defaultLogLevel = 'silly';
}
if (process.env.DEBUG_LEVEL) {
    defaultLogLevel = process.env.DEBUG_LEVEL;
}

//add console logger support
Logger.add(winston.transports.Console, {
    timestamp: true,
    colorize: true,
    level: defaultLogLevel
});
Logger.info('Log level ::', defaultLogLevel);

//bridge error interface
Logger.err = Logger.error;

module.exports = {
    getLogger: function() {
        return Logger;
    },
    setLoggerLevel: setLoggerLevel,
    killLoggingForTests: killLoggingForTests
};
