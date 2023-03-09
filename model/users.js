const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  username: { 
    type: String
  },
  password: { 
    type: String 
  }
}, { versionKey: false });


const Data = mongoose.model('users', dataSchema);
module.exports = Data;