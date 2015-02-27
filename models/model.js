var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: String,
  slug: String,
  type: String,
  company: {type: Schema.Types.ObjectId, ref: 'Company'},
  picture: String,
  wiki: {type: Schema.Types.ObjectId, ref: 'Wiki'},
  dateAdded: String,
  dateUpdated: String,
  contributors: Array,
  createdBy: {type: Schema.Types.ObjectId, ref: 'Account'},
  lastEditedBy: {type: Schema.Types.ObjectId, ref: 'Account'}
});

module.exports = mongoose.model('Model', ModelSchema);
