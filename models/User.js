const mongoose = require('mongoose');
var AutoIncrement=require("mongoose-sequence")(mongoose);


const userSchema = new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  name: {type: String, required: true},
  email: {type: String, required: true,unique:true},
  password: {type: String, required: true},
  type:{type:String},
  id:{type:Number,unique:true,required:false},
  Date:{type:Date,default:Date.now()},
  phone:{type:String},
  address:{type:String},
 
});

userSchema.plugin(AutoIncrement,{id:"id_user",inc_field:"id"});

module.exports = mongoose.model('users', userSchema);