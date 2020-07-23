const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let projIss = new Schema({
   issueHeading: { type: String },
   issueDesc: { type: String },
   issueStatus: { type: String },
   issueType: { type: String },
   issueInOrder: {type: Number},
   issueProjectCode: { type: String },
   issuePriority: { type: String },
   issueCreatedBy: { type: String },
   issueAssignedTo: { type: String },
   comments: { type: Array}
}, { collection: 'projIss' })

module.exports = mongoose.model('projIss', projIss)