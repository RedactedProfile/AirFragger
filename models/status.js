var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
  content: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'Account'}
});

module.exports = mongoose.model('Status', StatusSchema);
