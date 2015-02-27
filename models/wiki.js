var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WikiSchema = new Schema({
  revision: Number,
  content: String,
  previousRevision: {type: Schema.Types.ObjectId, ref: 'Wiki'}
  createdBy: {type: Schema.Types.ObjectId, ref: 'Account'}
});

module.exports = mongoose.model('Wiki', WikiSchema);
