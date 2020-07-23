const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let projectIssues = new Schema({
   issueHeading: { type: String },
   issueDesc: { type: String },
   issueStatus: { type: String },
   issueType: { type: String },
   issueInOrder: {type: Number},
   issueProjectCode: { type: String },
   issuePriority: { type: String },
   issueCreatedBy: { type: String },
   issueAssignedTo: { type: String },
   issueCreatedDate: { type: Date },
   comments: { type: Array}
}, { collection: 'projectIssues' })

module.exports = mongoose.model('projectIssues', projectIssues)