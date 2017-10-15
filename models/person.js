var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Person', new Schema({
    username:'String',
    firstName: 'String',
    lastName: 'String'
}));