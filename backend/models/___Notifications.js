const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let notifications = new Schema({
   fromGroup: { type: String },
   ccEmailIds: { type: String },
   subject: { type: String },
	mainContent: { type: String },
   draftedDate: { type: Date }
}, { collection: 'notifications' })

module.exports = mongoose.model('notifications', notifications)