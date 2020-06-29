const mongo = require('mongoose');
const Schema = mongo.Schema;

let modelSchema = new Schema({
    sku:{
        type: String,
        required:true
    },
    name:{
        type:String
    },
    price:{
        type:Number,
    },
    prevPrice:{
        type:Number
    },
    category:{
        type:String
    },
    imageUrl:{
        type:String
    },
    relatedSearch:{
        type:String
    }
})
module.exports = mongo.model('Products',modelSchema);