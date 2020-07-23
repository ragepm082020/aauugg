const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let issueActivity = new Schema({
   issueId: { type: String },
   issueProjectCode: { type: String },
   userUpdated: { type: String },
   subject: { type: String },
   fromactivity: { type: String },
   toactivity: { type: String },
   activityUpdated: { type: String}

}, {   collection: 'issueActivity' })

module.exports = mongoose.model('issueActivity', issueActivity)