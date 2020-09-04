const mongoose=require("mongoose");
let AutoIncrement=require("mongoose-sequence")(mongoose);
let Schema=mongoose.Schema;

let ProductSchema=new Schema({
    id:{type:Number},
    title:{type:String},
    caption:{type:String},
    price:{type:Number},
    images:[{
        type:String
    }],
    seller:{type:mongoose.Schema.Types.ObjectId,ref:"user"},

});


ProductSchema.plugin(AutoIncrement,{id:"id_Product",inc_field:"id"});
module.exports = mongoose.model('products', ProductSchema);