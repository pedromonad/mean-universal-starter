const mongoose = require('mongoose');
const clientSchema = require('./schema');
export = mongoose.model('Client', clientSchema);