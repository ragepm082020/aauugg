const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let projects = new Schema({
   projectCode: { type: String },
   name: { type: String },
   shortDesc: { type: String },
   usersInvolved: { type: Object },
   iconImgLocation: { type: String },
   createdDate: { type: Date }
}, { collection: 'projects' })

module.exports = mongoose.model('projects', projects)