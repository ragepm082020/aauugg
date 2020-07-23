const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let pia = new Schema({
   issueId: { type: String },
   issueProjectCode: {type: String }
}, {
   collection: 'pia'
})
/*,
   userUpdated: { type: String },   
   subject: { type: String },  
   fromactivity: { type: String }, 
   toactivity: { type: String }, 
   activityUpdated: { type: String }   */

module.exports = mongoose.model('pia', pia)