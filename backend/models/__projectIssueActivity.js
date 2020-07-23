const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let projectIssueActivity = new Schema({
   issueId: { type: String },
   issueProjectCode: { type: String },
   userUpdated: { type: String },
   subject: { type: String },
   fromactivity: {type: String},
   toactivity: { type: String },
   activityUpdated: { type: Date },   
}, { collection: 'projectIssueActivity' })

module.exports = mongoose.model('projectIssueActivity', projectIssueActivity)