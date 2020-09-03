const mongoose = require('mongoose');
var AutoIncrement=require("mongoose-sequence")(mongoose);


const userSchema = new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  name: {type: String, required: true},
  email: {type: String, required: true,unique:true},
  password: {type: String, required: true},
  type:{type:String},
  id:{type:Number,unique:true,required:false},
  cart:[{type:mongoose.Schema.Types.ObjectId}],
  Date:{type:Date,default:Date.now()},

});

userSchema.plugin(AutoIncrement,{id:"id_user",inc_field:"id"});

module.exports = mongoose.model('users', userSchema);