'use strict';

let mongoose = require('mongoose');
let localConfig: any = require('../config/localConfig');
let conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.info('Connected to Mongodb.');
});

console.log(`Connecting to ${localConfig.uri} ...`);

mongoose.connect(localConfig.uri, localConfig.options);

export { conn };
