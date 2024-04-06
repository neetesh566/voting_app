const mongoose = require("mongoose");
// const bycrypt = require('bcrypt');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  votes:[]
  
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
