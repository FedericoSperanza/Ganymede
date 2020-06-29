const mongoDB = require('mongoose');
const SchemaOrders = mongoDB.Schema;

let modelOrder = new SchemaOrders({
    searchString:{
        type: String
    },
    OrderStatus:{
        type: String
    },
    ProductList:[
        {sku:{
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
}],
    
})
module.exports = mongoDB.model('Orders',modelOrder);