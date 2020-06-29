import { error } from "console";
import { resolve } from "path";
import { ServerResponse } from "http";
const express = require('express');
const modelOrder = require('../models/Orders');
const modelProducts = require('../models/Product');
let pServices = require('../pService');
export class Router{
    
    app = express();
    constructor(){
        this.app.get('/',this.hello)
        this.app.post('/newOrder',this.createOrder)
        this.app.get('/getOrders',this.listOrders)
        this.app.get('/getProductsByCategory',this.productsByCategory)
    }
    hello(req:any,res:any){
    res.json("Hola")
    }
    async createOrder(req:any,res:any){
        var resID;
        var data = [];
        let Order = new modelOrder({
            searchString:req.body.searchString,
            OrderStatus:"Received"
        });

        Order.save().then(async (resOrder:any) => {
            console.log("resOrder.id", resOrder.id , "searchstring",Order.searchString);
            resID = resOrder.id;
        }, (err: any) => {
            res.status(500).json({
                error:'Error creating Order'
            })
        })
        try {
   
    data =  await pServices.startScrapper(Order.searchString);
    console.log("##data", data);
    let stringed = JSON.stringify(data)
    var count = Object.keys(data).length;
    console.log("##Length ", count)
    if (count>0){
        modelOrder.updateOne(
            {_id: resID},
            {OrderStatus: 'FullFilled'}, 
            {ProductList: stringed})
            .then(() =>{
            // res.json({
            //     ok:true
            // })
        }, (err: string) => {
            res.status(500).json({
                error:'Error when trying to fullfill the status' + err
            })
        })
    }else{
      console.log("# Products are 0")
    }
    console.log("dataa", data.length);
    data.forEach((product: { sku: string; title: string; price: string; antprice: string; category: string; searchQuery: string; }) => {
        let prod = new modelProducts({
        sku: product.sku,
        name: product.title,
        price: product.price,
        prevPrice: product.antprice,
        category: product.category,
        imageUrl: "",
        relatedSearch: product.searchQuery
        })
        prod.save().then(async (resOrder:any) => {
            res.json({
                ok: true
            })
            console.log("##SavedProducts")
           
           
        }, (err: any) => {
            res.status(500).json({
                error:'Error creating Order'
            })
        })
    });
    } catch(err){
        console.log(" ERROR ##", err)
    }
    }

    listOrders(req:any,res:any){
        
        modelOrder.find().then((docs:any) => {
            res.json({
                item: docs
            })
        }, (err: any) => {
            res.status(500).json({
                error:'Error en Get Orders'
            })
        })
    }
    productsByCategory(req:any,res:any){
        modelProducts.find({'category':req.body.category}).then((products:any) => {
            res.json({
                products
            })
        }, (err:any) => {
            res.status(500).json({
                error:'Error on get Products by Category'
            })
        })
    }
   
    }


module.exports = new Router().app



