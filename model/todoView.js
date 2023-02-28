const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  username: { 
    type: String
  },
  token: { 
    type: String 
  }
}, { versionKey: false });


const Data = mongoose.model('todoView', dataSchema);
module.exports = Data;