var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'trapvote'
        },
        port: 3434,
        db: 'mongodb://localhost/trapsubmit-development',
        amountPerGroup: 4,
        tillGroup: 3,
        fromGroup: 1,
        round: '20-22 July - First',
        winnersMode: true
    },

    production: {
        root: rootPath,
        app: {
            name: 'trapvote'
        },
        port: 3434,
        db: 'mongodb://localhost/trapsubmit-production',
        amountPerGroup: 4,
        tillGroup: 3,
        fromGroup: 1,
        round: '20-22 July - First'
    }
};

module.exports = config[env];
