const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let users = new Schema({
   userId: { type: String },
   userName: { type: String },
   userPwd: { type: String },
   userEmail: { type: String },
   userImg: { type: String },
   userDept: { type: String },
   userRole: { type: String },
   userActive: {type:String},
   userProjects: {type:Array},
   userRecentLogged: { type: Date },
   createdDate: { type: Date }
}, { collection: 'users' })

module.exports = mongoose.model('users', users)