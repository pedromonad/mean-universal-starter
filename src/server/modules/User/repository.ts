const mongoose = require('mongoose');
const userSchema = require('./schema');
export = mongoose.model('User', userSchema);