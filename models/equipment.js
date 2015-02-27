var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
  account: {type: Schema.Types.ObjectId, ref: 'Account'},
  make: {type: Schema.Types.ObjectId, ref: 'Make'},
  model: {type: Schema.Types.ObjectId, ref: 'Model'},
  dateAcquired: String,
  purchasedAmount: String,
  description: String,
  nickname: String,
  photos: Array,
  condition: String,
  modifications: String,
  status: String,
  dateRetired: String
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
