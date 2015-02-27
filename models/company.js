var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
  slug: String,
  location: {type: Schema.Types.ObjectId, ref: 'Location'},
  logo: String,
  wiki: {type: Schema.Types.ObjectId, ref: 'Wiki'},
  dateAdded: String,
  dateUpdated: String,
  contributors: Array,
  createdBy: {type: Schema.Types.ObjectId, ref: 'Account'},
  lastEditedBy: {type: Schema.Types.ObjectId, ref: 'Account'}
});

module.exports = mongoose.model('Company', CompanySchema);
