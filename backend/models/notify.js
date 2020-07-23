const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let notify = new Schema({
   fromGroup: { type: String },
   ccEmailIds: { type: String },
   subject: { type: String },
	mainContent: { type: String },
   draftedDate: { type: Date }
}, { collection: 'notify' })

module.exports = mongoose.model('notify', notify)